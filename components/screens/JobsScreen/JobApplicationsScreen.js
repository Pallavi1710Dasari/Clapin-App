// JobApplicationsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';
import JobsService from '../../../services/JobsService';
import { jobApplications } from '../../../data/dummyJobsData';

const JobApplicationsScreen = ({ route }) => {
  const { jobId, job, applications: initialApplications } = route.params;
  const navigation = useNavigation();
  
  const [applications, setApplications] = useState(initialApplications || []);
  const [loading, setLoading] = useState(!initialApplications);

  // Load applications if not provided
  useEffect(() => {
    if (!initialApplications) {
      fetchApplications();
    }
  }, []);

  // Fetch applications from API/dummy data
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await JobsService.getJobApplications(jobId);
      
      if (response.ok) {
        const fetchedApplications = response.data.data.applications || [];
        setApplications(fetchedApplications);
      } else {
        // If API fails, use dummy data
        console.log('Using dummy applications from hardcoded data');
        setApplications(jobApplications.filter(app => app.job_id === jobId));
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Fallback to dummy data on error
      setApplications(jobApplications);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to application details page
  const handleViewApplication = (application) => {
    navigation.navigate('ApplicationDetails', { 
      application,
      jobId: application.job_id
    });
  };

  // Custom application list item
  const ApplicationItem = ({ application }) => {
    // Get status color
    const getStatusColor = (status) => {
      switch(status) {
        case 'shortlisted': return '#FF9800';
        case 'selected': return '#4CAF50';
        case 'rejected': return '#F44336';
        default: return '#2196F3';
      }
    };

    return (
      <TouchableOpacity 
        style={styles.applicantCard}
        onPress={() => handleViewApplication(application)}
      >
        <Image 
          source={{ uri: application.profilePic || 'https://randomuser.me/api/portraits/men/1.jpg' }} 
          style={styles.applicantImage} 
        />
        <View style={styles.applicantInfo}>
          <Text style={styles.applicantName}>{application.name}</Text>
          <Text style={styles.applicantTitle}>{application.title}</Text>
          <Text style={styles.applicantDate}>Applied {application.appliedDate}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(application.application_status) }
        ]}>
          <Text style={styles.statusText}>
            {application.application_status === 'shortlisted' ? 'Shortlisted' :
             application.application_status === 'selected' ? 'Selected' :
             application.application_status === 'rejected' ? 'Rejected' : 'New'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerTitle}>Applications</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      {/* Stats summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{applications.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {applications.filter(app => app.application_status === 'shortlisted').length}
          </Text>
          <Text style={styles.statLabel}>Shortlisted</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {applications.filter(app => app.application_status === 'selected').length}
          </Text>
          <Text style={styles.statLabel}>Selected</Text>
        </View>
      </View>
      
      {/* Applications list */}
      {applications.length > 0 ? (
        <FlatList
          data={applications}
          renderItem={({ item }) => <ApplicationItem application={item} />}
          keyExtractor={(item, index) => (item.id || item.applicant_id || index.toString())}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AntDesign name="solution1" size={64} color="#666" />
          <Text style={styles.emptyTitle}>No Applications Yet</Text>
          <Text style={styles.emptyText}>
            No one has applied to this job posting yet. Check back later!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
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
    lineHeight: 24,
  },
  applicantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  applicantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  applicantTitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 2,
  },
  applicantDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
};

export default JobApplicationsScreen;