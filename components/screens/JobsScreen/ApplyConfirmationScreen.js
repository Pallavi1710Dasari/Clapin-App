// ApplyConfirmationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';
import JobsService from '../../../services/JobsService';

const ApplyConfirmationScreen = ({ route }) => {
  const { job } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  // Handle job application
  const handleApply = async () => {
    setLoading(true);
    try {
      // Try to call the API to apply
      const response = await JobsService.applyToJob(job.id || job.job_id);
      
      if (response.ok) {
        Alert.alert(
          'Success',
          'Your application has been submitted successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('Jobs') }]
        );
      } else {
        throw new Error('Failed to apply');
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      // Using dummy success message since we're using dummy data
      Alert.alert(
        'Success',
        'Your application has been submitted successfully! (Dummy data)',
        [{ text: 'OK', onPress: () => navigation.navigate('BottomTabs', { screen: 'Jobs' }) }]
      );
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>Apply to Job</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      <ScrollView style={styles.content}>
        {/* Job Card */}
        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Image 
              source={{ uri: job.companyLogo || 'https://via.placeholder.com/60' }} 
              style={styles.companyLogo} 
            />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.jobLocation}>{job.location}</Text>
            </View>
          </View>
        </View>
        
        {/* Confirmation Message */}
        <View style={styles.confirmationCard}>
          <AntDesign name="checkcircleo" size={50} color={Colors.primary} style={styles.confirmIcon} />
          <Text style={styles.confirmTitle}>Ready to Apply</Text>
          <Text style={styles.confirmText}>
            You're about to apply for this position. Your profile will be shared with the employer.
          </Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <AntDesign name="user" size={20} color="#999" />
              <Text style={styles.infoText}>Your profile is complete</Text>
            </View>
            <View style={styles.infoItem}>
              <AntDesign name="clockcircleo" size={20} color="#999" />
              <Text style={styles.infoText}>Easy apply - takes less than a minute</Text>
            </View>
          </View>
        </View>
        
        {/* Resume Preview */}
        <View style={styles.resumeCard}>
          <Text style={styles.resumeTitle}>Your Application Resume</Text>
          <View style={styles.resumePreview}>
            <AntDesign name="pdffile1" size={40} color={Colors.primary} />
            <View style={styles.resumeInfo}>
              <Text style={styles.resumeName}>MyResume.pdf</Text>
              <Text style={styles.resumeDate}>Updated 2 weeks ago</Text>
            </View>
            <TouchableOpacity style={styles.resumeChangeButton}>
              <Text style={styles.resumeChangeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Apply Button */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.applyButtonText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#000',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  jobHeader: {
    flexDirection: 'row',
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#333',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 14,
    color: '#999',
  },
  confirmationCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  confirmIcon: {
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  infoContainer: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 10,
  },
  resumeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 80,
    borderWidth: 1,
    borderColor: '#333',
  },
  resumeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  resumePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
  },
  resumeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resumeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  resumeDate: {
    fontSize: 12,
    color: '#999',
  },
  resumeChangeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  resumeChangeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomActions: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 2,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApplyConfirmationScreen;