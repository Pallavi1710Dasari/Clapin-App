// CreatedJobsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../constants/constantStyles';
import { myJobs } from '../../../data/dummyJobsData';
import JobsService from '../../../services/JobsService';

const CreatedJobsScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch created jobs
  const fetchCreatedJobs = async () => {
    try {
      setLoading(true);
      // In a real app, this would be:
      // const response = await JobsService.getMyJobs();
      
      // For demo purposes, simulate API call with a delay
      setTimeout(() => {
        setJobs(myJobs);
        setLoading(false);
        setRefreshing(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching created jobs:', error);
      setJobs(myJobs); // Fallback to dummy data
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCreatedJobs();
  }, []);

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchCreatedJobs();
  };

  // Handle job creation
  const handleCreateJob = () => {
    navigation.navigate('CreateJobStep1');
  };

  // Handle opening job details
  const handleJobPress = (job) => {
    navigation.navigate('JobDetails', { job, isOwnJob: true });
  };

  // Handle editing a job
  const handleEditJob = (job) => {
    navigation.navigate('EditJob', { job });
  };

  // Handle viewing applicants
  const handleViewApplicants = (job) => {
    navigation.navigate('JobApplications', { 
      jobId: job.job_id, 
      job
    });
  };

  // Handle closing a job
  const handleCloseJob = (job) => {
    Alert.alert(
      'Close Job',
      'Are you sure you want to close this job posting? It will no longer accept applications.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Close Job',
          style: 'destructive',
          onPress: async () => {
            // In a real app, this would call an API
            // await JobsService.closeJob(job.job_id);
            
            // Update local state
            setJobs(prevJobs => 
              prevJobs.map(j => 
                j.job_id === job.job_id ? { ...j, job_status: 'closed' } : j
              )
            );
            
            Alert.alert('Success', 'Job has been closed');
          }
        }
      ]
    );
  };

  // Render action menu for job item
  const renderJobActions = (job) => (
    <View style={styles.actionMenu}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => handleEditJob(job)}
      >
        <AntDesign name="edit" size={16} color="#fff" />
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => handleViewApplicants(job)}
      >
        <AntDesign name="team" size={16} color="#fff" />
        <Text style={styles.actionText}>Applicants ({job.applicants_count || 0})</Text>
      </TouchableOpacity>
      
      {job.job_status === 'active' && (
        <TouchableOpacity 
          style={[styles.actionButton, styles.closeButton]}
          onPress={() => handleCloseJob(job)}
        >
          <AntDesign name="closecircleo" size={16} color="#F44336" />
          <Text style={[styles.actionText, styles.closeText]}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Render individual job item
  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <TouchableOpacity 
        style={styles.jobCardHeader}
        onPress={() => handleJobPress(item)}
      >
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobLocation}>{item.location}</Text>
          
          <View style={styles.jobMetaRow}>
            <View style={styles.metaItem}>
              <Feather name="clock" size={12} color="#999" />
              <Text style={styles.metaText}>
                Posted: {new Date(item.created_at).toLocaleDateString() || 'Recently'}
              </Text>
            </View>
            
            <View style={[
              styles.statusBadge, 
              { backgroundColor: item.job_status === 'active' ? '#4CAF50' : '#F44336' }
            ]}>
              <Text style={styles.statusText}>
                {item.job_status === 'active' ? 'Active' : 'Closed'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      {renderJobActions(item)}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Posted Jobs</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateJob}
        >
          <AntDesign name="plus" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      
      {/* Stats summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{jobs.length}</Text>
          <Text style={styles.statLabel}>Total Jobs</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {jobs.filter(job => job.job_status === 'active').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {jobs.reduce((sum, job) => sum + (job.applicants_count || 0), 0)}
          </Text>
          <Text style={styles.statLabel}>Applicants</Text>
        </View>
      </View>
      
      {/* Job List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.job_id || String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AntDesign name="filetext1" size={64} color="#666" />
          <Text style={styles.emptyTitle}>No Jobs Posted</Text>
          <Text style={styles.emptyText}>
            You haven't posted any jobs yet. Create a job posting to start receiving applications.
          </Text>
          <TouchableOpacity 
            style={styles.createJobButton}
            onPress={handleCreateJob}
          >
            <Text style={styles.createJobButtonText}>Create Job</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  createButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // Job card styles
  jobCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  jobCardHeader: {
    padding: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  jobMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Action menu
  actionMenu: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#121212',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  actionText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
  },
  closeButton: {
    borderRightWidth: 0,
  },
  closeText: {
    color: '#F44336',
  },
  // Empty container styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  createJobButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  createJobButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatedJobsScreen;