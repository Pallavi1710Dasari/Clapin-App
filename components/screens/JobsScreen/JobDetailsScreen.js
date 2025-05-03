import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  StatusBar,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/constantStyles';
import JobsService from '../../../services/JobsService';

const JobDetailsScreen = ({ route }) => {
  const { job, isOwnJob, isApplied } = route.params;
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);
  
  // Extended job details (would come from API, using dummy data here)
  const jobDetails = {
    ...job,
    description: job.description || "We are looking for a talented React Native developer to join our team and help us build innovative mobile applications. The ideal candidate will have experience with React Native, JavaScript, and mobile app development.",
    requirements: job.requirements || [
      "3+ years of experience with React Native development",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with state management libraries (Redux, MobX, etc.)",
      "Familiarity with native build tools",
      "Experience with API integration",
      "Bachelor's degree in Computer Science or related field"
    ],
    responsibilities: [
      "Design and build advanced applications for the iOS and Android platforms",
      "Collaborate with cross-functional teams",
      "Implement clean, maintainable code",
      "Troubleshoot and debug applications",
      "Ensure performance, quality, and responsiveness of applications"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
      "Professional development opportunities"
    ],
    aboutCompany: "We are a fast-growing tech company focused on building innovative solutions. Our team is distributed across multiple locations and we value creativity, collaboration, and continuous learning."
  };

  // For my posted jobs - applications list
  const applications = [
    {
      id: 'a1',
      name: 'John Doe',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Senior Developer',
      appliedDate: '2 days ago',
      status: 'Shortlisted'
    },
    {
      id: 'a2',
      name: 'Jane Smith',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'Frontend Engineer',
      appliedDate: '3 days ago',
      status: 'New'
    },
    {
      id: 'a3',
      name: 'Michael Johnson',
      profilePic: 'https://randomuser.me/api/portraits/men/67.jpg',
      title: 'Mobile Developer',
      appliedDate: '1 week ago',
      status: 'Rejected'
    }
  ];

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const handleShareJob = async () => {
    try {
      await Share.share({
        message: `Check out this job: ${job.title} at ${job.company}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleApply = () => {
    // Navigate to apply confirmation screen with job data
    try {
      navigation.navigate('ApplyConfirmation', { job });
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert(
        "Navigation Error", 
        "Could not navigate to Apply screen. Please add ApplyConfirmationScreen.js to your project."
      );
    }
  };

  const handleEditJob = () => {
    // Navigate to edit job screen with job data
    try {
      navigation.navigate('EditJob', { job });
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert(
        "Navigation Error", 
        "Could not navigate to Edit screen. Please add EditJobScreen.js to your project."
      );
    }
  };

  const viewApplications = () => {
    // Navigate to applications screen with job ID and applications data
    navigation.navigate('JobApplications', { 
      jobId: job.job_id || job.id, 
      job, 
      applications 
    });
  };

  // Section renderer for requirements, responsibilities, benefits
  const renderSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletPoint}>
          <View style={styles.bullet} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
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
        
        <View style={styles.headerActions}>
          {!isOwnJob && (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleSaveJob}
            >
              <AntDesign 
                name={isSaved ? "heart" : "hearto"} 
                size={24} 
                color={isSaved ? "red" : "#fff"} 
              />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleShareJob}
          >
            <AntDesign name="sharealt" size={24} color="#fff" />
          </TouchableOpacity>
          
          {isOwnJob && (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleEditJob}
            >
              <AntDesign name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Job Header */}
        <View style={styles.jobHeader}>
          <Image 
            source={{ uri: job.companyLogo || 'https://via.placeholder.com/80' }} 
            style={styles.companyLogo} 
          />
          
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
          
          <View style={styles.jobMeta}>
            <View style={styles.metaItem}>
              <Feather name="map-pin" size={16} color="#999" />
              <Text style={styles.metaText}>{job.location}</Text>
            </View>
            
            <View style={styles.metaDivider} />
            
            <View style={styles.metaItem}>
              <MaterialIcons name="work-outline" size={16} color="#999" />
              <Text style={styles.metaText}>{job.employmentType || job.employment_type}</Text>
            </View>
            
            <View style={styles.metaDivider} />
            
            <View style={styles.metaItem}>
              <Feather name="clock" size={16} color="#999" />
              <Text style={styles.metaText}>{job.postedDate || "2 days ago"}</Text>
            </View>
          </View>
          
          {!isOwnJob && (
            <View style={styles.applicantsRow}>
              <Text style={styles.applicantsText}>{job.applicants || job.applicants_count || 0} applicants</Text>
              {job.isEasyApply && (
                <View style={styles.easyApplyBadge}>
                  <Text style={styles.easyApplyText}>Easy Apply</Text>
                </View>
              )}
            </View>
          )}
          
          {isOwnJob && (
            <View style={styles.statusRow}>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.statusText}>{job.job_status || "Active"}</Text>
              </View>
              <Text style={styles.viewsText}>245 views</Text>
            </View>
          )}
        </View>
        
        {/* Job Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the job</Text>
          <Text style={styles.descriptionText}>{jobDetails.description}</Text>
        </View>
        
        {/* Requirements */}
        {renderSection('Requirements', jobDetails.requirements)}
        
        {/* Responsibilities */}
        {renderSection('Responsibilities', jobDetails.responsibilities)}
        
        {/* Benefits */}
        {renderSection('Benefits', jobDetails.benefits)}
        
        {/* About Company */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the company</Text>
          <Text style={styles.descriptionText}>{jobDetails.aboutCompany}</Text>
        </View>
        
        {/* Applications Section - Only for job owner */}
        {isOwnJob && applications.length > 0 && (
          <View style={styles.applicationsSection}>
            <View style={styles.applicationsHeader}>
              <Text style={styles.applicationsTitle}>Recent Applications</Text>
              <TouchableOpacity onPress={viewApplications}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            
            {applications.slice(0, 2).map(applicant => (
              <View key={applicant.id} style={styles.applicantCard}>
                <Image 
                  source={{ uri: applicant.profilePic }} 
                  style={styles.applicantImage} 
                />
                <View style={styles.applicantInfo}>
                  <Text style={styles.applicantName}>{applicant.name}</Text>
                  <Text style={styles.applicantTitle}>{applicant.title}</Text>
                  <Text style={styles.applicantDate}>Applied {applicant.appliedDate}</Text>
                </View>
                <View style={[
                  styles.applicantStatusBadge,
                  {
                    backgroundColor: 
                      applicant.status === 'Shortlisted' ? '#FF9800' : 
                      applicant.status === 'Rejected' ? '#F44336' : '#4CAF50'
                  }
                ]}>
                  <Text style={styles.applicantStatusText}>{applicant.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Extra space at bottom for action button */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Bottom Action Button */}
      {!isOwnJob ? (
        <View style={styles.bottomActions}>
        {isApplied ? (
          // For jobs the user has already applied to
          <View style={styles.appliedStatusContainer}>
            <AntDesign name="checkcircle" size={20} color="#4CAF50" style={styles.appliedIcon} />
            <Text style={styles.appliedText}>Applied</Text>
            <Text style={styles.appliedDate}>{job.appliedDate || 'Recently'}</Text>
          </View>
        ) : (
          // For jobs the user hasn't applied to yet
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        )}
      </View>
      ) : (
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.viewApplicationsButton} 
            onPress={viewApplications}
          >
            <Text style={styles.viewApplicationsText}>
              View All Applications ({applications.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 7,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 16,
  },
  jobHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 16,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#999',
    marginLeft: 4,
    fontSize: 14,
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginHorizontal: 8,
  },
  applicantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicantsText: {
    color: '#999',
    fontSize: 14,
  },
  easyApplyBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  easyApplyText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
  },
  viewsText: {
    color: '#999',
    fontSize: 14,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 22,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 16,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: '#ccc',
    lineHeight: 22,
  },
  applicationsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  applicationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  applicationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: 14,
  },
  applicantCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  appliedStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  appliedIcon: {
    marginRight: 8,
  },
  appliedText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  appliedDate: {
    color: '#999',
    fontSize: 14,
  },
  applicantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    marginRight: 12,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
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
  applicantStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  applicantStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewApplicationsButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewApplicationsText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default JobDetailsScreen;