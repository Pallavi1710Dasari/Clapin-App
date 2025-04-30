// ApplicationDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert, 
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../constants/constantStyles';
import JobsService from '../../../services/JobsService';

// Resume details mapping (in a real app, this would come from API)
const resumeDetails = {
  'default': {
    experience: [
      {
        id: 'exp1',
        company: 'Tech Solutions Inc.',
        title: 'Senior Developer',
        duration: 'Jan 2020 - Present',
        description: 'Leading mobile application development team, focusing on React Native applications.'
      },
      {
        id: 'exp2',
        company: 'Mobile Innovations',
        title: 'Frontend Developer',
        duration: 'Mar 2017 - Dec 2019',
        description: 'Developed responsive web applications and hybrid mobile apps.'
      }
    ],
    education: [
      {
        id: 'edu1',
        institution: 'University of Technology',
        degree: 'M.S. in Computer Science',
        year: '2015 - 2017'
      },
      {
        id: 'edu2',
        institution: 'State University',
        degree: 'B.S. in Software Engineering',
        year: '2011 - 2015'
      }
    ],
    skills: ['JavaScript', 'React Native', 'React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL', 'UI/UX']
  }
};

const ApplicationDetailsScreen = ({ route }) => {
  const { application: initialApplication, jobId } = route.params;
  console.log("applicationData", initialApplication )
  const navigation = useNavigation();
  
  // Initialize with provided application or create a fallback
  const fallbackApplication = {
    applicant_id: 'dummy-applicant',
    name: 'John Doe',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Senior React Native Developer',
    experience: '5 years',
    education: 'M.S. Computer Science',
    applied_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    appliedDate: '5 days ago',
    application_status: 'applied',
    job_id: jobId || 'job-001'
  };
  
  // Merge initialApplication with fallbackApplication
const mergedApplication = {
  ...fallbackApplication,
  ...(initialApplication || {})
};

const [applicationData, setApplicationData] = useState(mergedApplication);
  
  // UI state
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get resume details - use default if applicant ID not found
  const applicantResume = resumeDetails[applicationData.applicant_id] || resumeDetails.default;
  
  // Show action modal
  const showActionModal = (action) => {
    setActionType(action);
    setReason('');
    setModalVisible(true);
  };

  const handleShareJob = async () => {
    try {
      await Share.share({
        message: `Check out this profile: ${fallbackApplication.name} at ${fallbackApplication.title}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // Update application status
  const updateApplicationStatus = async () => {
    if (!reason.trim()) {
      Alert.alert('Required', 'Please provide a reason for this action');
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare update data
      let updateData = {
        application_status: actionType
      };
      
      // Add the appropriate reason field based on action type
      if (actionType === 'shortlisted') {
        updateData.shortlist_reason = reason;
      } else if (actionType === 'selected') {
        updateData.selection_reason = reason;
      } else if (actionType === 'rejected') {
        updateData.rejection_reason = reason;
      }
      
      // Call API to update application status
      const response = await JobsService.updateJobApplication(
        applicationData.job_id,
        applicationData.applicant_id,
        updateData
      );
      
      if (response.ok) {
        // Update local state
        const updatedApplication = {
          ...applicationData,
          application_status: actionType,
        };
        
        if (actionType === 'shortlisted') {
          updatedApplication.shortlist_reason = reason;
        } else if (actionType === 'selected') {
          updatedApplication.selection_reason = reason;
        } else if (actionType === 'rejected') {
          updatedApplication.rejection_reason = reason;
        }
        
        setApplicationData(updatedApplication);
        setModalVisible(false);
        
        // Show success message
        Alert.alert('Success', `Applicant has been ${actionType} successfully`);
      } else {
        throw new Error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      Alert.alert('Error', 'Failed to update application status. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Get status style based on application status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'shortlisted':
        return { label: 'Shortlisted', color: '#FF9800', icon: 'star-outline' };
      case 'selected':
        return { label: 'Selected', color: '#4CAF50', icon: 'checkmark-circle-outline' };
      case 'rejected':
        return { label: 'Rejected', color: '#F44336', icon: 'close-circle-outline' };
      default:
        return { label: 'Applied', color: '#2196F3', icon: 'document-text-outline' };
    }
  };
  
  const statusStyle = getStatusStyle(applicationData.application_status);
  
  // Get modal title based on action type
  const getModalTitle = () => {
    switch (actionType) {
      case 'shortlisted':
        return 'Shortlist Candidate';
      case 'selected':
        return 'Select Candidate';
      case 'rejected':
        return 'Reject Candidate';
      default:
        return 'Update Status';
    }
  };
  
  // Get modal button color based on action type
  const getModalButtonColor = () => {
    switch (actionType) {
      case 'shortlisted':
        return '#FF9800';
      case 'selected':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      default:
        return Colors.primary;
    }
  };
  
  // Render action buttons based on current status
  const renderActionButtons = () => {
    if (applicationData.application_status === 'applied' || applicationData.application_status === 'shortlisted') {
      return (
        <View style={styles.actionButtons}>
          {applicationData.application_status === 'applied' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
              onPress={() => showActionModal('shortlisted')}
            >
              <AntDesign name="star" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Shortlist</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => showActionModal('selected')}
          >
            <AntDesign name="checkcircleo" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Select</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F44336' }]}
            onPress={() => showActionModal('rejected')}
          >
            <AntDesign name="closecircleo" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return null;
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
        <Text style={styles.headerTitle}>Application</Text>
        <TouchableOpacity 
          style={styles.headerAction}
          onPress={handleShareJob}
        >
          <AntDesign name="sharealt" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Applicant Profile */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: applicationData.profilePic }}
            style={styles.profileImage}
          />
        </View>
          <View style={styles.applicantDetails}>
              <View>
              <Text style={styles.applicantName}>{applicationData.name}</Text>
              <Text style={styles.applicantTitle}>{applicationData.title}</Text>
              
              <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.color }]}>
                  <AntDesign name="clockcircleo" size={14} color="#fff" style={{ marginRight: 4 }} />
                  <Text style={styles.statusText}>{statusStyle.label}</Text>
                </View>
              </View>
          </View>
          
          <View >
            <View style={styles.infoItem}>
              <AntDesign name="calendar" size={16} color="#999" />
              <Text style={styles.infoText}>Applied {applicationData.appliedDate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Entypo name="briefcase" size={16} color="#999" />
              <Text style={styles.infoText}>experience {applicationData.experience}</Text>
            </View>
            <View style={styles.infoItem}>
              <Entypo name="book" size={16} color="#999" />
              <Text style={styles.infoText}>{applicationData.education}</Text>
            </View>
          </View>
          
          {/* Render status reason if available */}
          {applicationData.shortlist_reason && (
            <View style={styles.reasonCard}>
              <Text style={styles.reasonTitle}>Shortlisting Reason:</Text>
              <Text style={styles.reasonText}>{applicationData.shortlist_reason}</Text>
            </View>
          )}
          
          {applicationData.selection_reason && (
            <View style={styles.reasonCard}>
              <Text style={styles.reasonTitle}>Selection Reason:</Text>
              <Text style={styles.reasonText}>{applicationData.selection_reason}</Text>
            </View>
          )}
          
          {applicationData.rejection_reason && (
            <View style={styles.reasonCard}>
              <Text style={styles.reasonTitle}>Rejection Reason:</Text>
              <Text style={styles.reasonText}>{applicationData.rejection_reason}</Text>
            </View>
          )}
        </View>
        
        {/* Work Experience */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {applicantResume.experience.map(exp => (
            <View key={exp.id} style={styles.expCard}>
              <Text style={styles.expCompany}>{exp.company}</Text>
              <View style={styles.expHeader}>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text style={styles.expDuration}>{exp.duration}</Text>
              </View>
              <Text style={styles.expDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
        
        {/* Education */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Education</Text>
          {applicantResume.education.map(edu => (
            <View key={edu.id} style={styles.eduCard}>
              <Text style={styles.eduInstitution}>{edu.institution}</Text>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduYear}>{edu.year}</Text>
            </View>
          ))}
        </View>
        
        {/* Skills */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {applicantResume.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Contact Options */}
        <View style={styles.contactOptionsContainer}>
          <TouchableOpacity style={styles.contactOption}>
            <AntDesign name="phone" size={22} color={Colors.primary} />
            <Text style={styles.contactOptionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactOption}>
            <AntDesign name="mail" size={22} color={Colors.primary} />
            <Text style={styles.contactOptionText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactOption}>
            <AntDesign name="message1" size={22} color={Colors.primary} />
            <Text style={styles.contactOptionText}>Message</Text>
          </TouchableOpacity>
        </View>
        
        {/* Extra padding at the bottom */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Action Buttons */}
      {renderActionButtons()}
      
      {/* Status Update Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{getModalTitle()}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubTitle}>
              {applicationData.name}
            </Text>
            
            <Text style={styles.modalLabel}>
              {actionType === 'shortlisted' ? 'Shortlisting Reason' :
              actionType === 'selected' ? 'Selection Reason' :
              'Rejection Reason'}
            </Text>
            
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason..."
              placeholderTextColor="#666"
              multiline
              value={reason}
              onChangeText={setReason}
            />
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  { backgroundColor: getModalButtonColor() }
                ]}
                onPress={updateApplicationStatus}
                disabled={loading || !reason.trim()}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerAction: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
  },
  applicantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  applicantTitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 16,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  applicantDetails:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical:10,
  },
  infoRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 5,
    marginTop:2,
  },
  infoText: {
    color: '#999',
    fontSize: 14,
    marginLeft: 4,
  },
  reasonCard: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: '#ccc',
    fontStyle: 'italic',
  },
  sectionContainer: {
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  expCard: {
    marginBottom: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  expCompany: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.placeholderTextColorPrimary,
    marginBottom: 4,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  expTitle: {
    fontSize: 14,
    color: '#ccc',
  },
  expDuration: {
    fontSize: 14,
    color: '#999',
  },
  expDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  eduCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  eduInstitution: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  eduDegree: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  eduYear: {
    fontSize: 14,
    color: '#999',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  skillText: {
    color: '#ccc',
    fontSize: 14,
  },
  contactOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  contactOption: {
    alignItems: 'center',
  },
  contactOptionText: {
    color: Colors.primary,
    marginTop: 8,
    fontSize: 14,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalSubTitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  reasonInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#333',
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
};

export default ApplicationDetailsScreen;