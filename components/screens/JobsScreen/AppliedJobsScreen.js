// AppliedJobsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';
import { appliedJobs } from '../../../data/dummyJobsData';
import JobsService from '../../../services/JobsService';

const AppliedJobsScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch applied jobs from the API
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first (in a real app)
        // const response = await JobsService.getAppliedJobs();
        
        // For now, use dummy data with a slight delay to simulate API call
        setTimeout(() => {
          setJobs(appliedJobs);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setJobs(appliedJobs); // Fallback to dummy data
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  // Get color for status label
  const getStatusColor = (status) => {
    if (!status) return '#999';
    
    // Return color based on status
    switch(status.toLowerCase()) {
      case 'selected':
      case 'accepted':
        return '#4CAF50'; // Green
      case 'shortlisted':
      case 'interviewing':
        return '#FF9800'; // Orange
      case 'rejected':
        return '#F44336'; // Red
      case 'applied':
      default:
        return '#2196F3'; // Blue
    }
  };

  // Render an applied job item
  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={() => navigation.navigate('JobDetails', { job: item, isApplied: true })}
    >
      <View style={styles.jobHeader}>
        <Image 
          source={{ uri: item.companyLogo || 'https://via.placeholder.com/60' }} 
          style={styles.companyLogo} 
        />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
          <Text style={styles.jobLocation}>{item.location}</Text>
        </View>
      </View>
      
      <View style={styles.jobFooter}>
        <Text style={styles.appliedDate}>Applied {item.appliedDate}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status || 'Applied'}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Applied Jobs</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      {/* Job List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AntDesign name="filetext1" size={64} color="#666" />
          <Text style={styles.emptyTitle}>No applications yet</Text>
          <Text style={styles.emptyText}>
            When you apply for jobs, they will appear here
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Jobs')}
          >
            <Text style={styles.browseButtonText}>Browse Jobs</Text>
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#333',
  },
  jobInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 12,
    color: '#999',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  appliedDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Empty state styles
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
  browseButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  browseButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
};

export default AppliedJobsScreen;