// EditJobScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  StatusBar,
  Modal
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';
import JobsService from '../../../services/JobsService';

// Employment type options
const EMPLOYMENT_TYPES = [
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Part-Time', value: 'Part-Time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Internship', value: 'Internship' }
];

// Job type options
const JOB_TYPES = [
  { label: 'On-site', value: 'onsite' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' }
];

const EditJobScreen = ({ route, navigation }) => {
  const { job } = route.params;
  
  // Form state with initial values from the job
  const [formData, setFormData] = useState({
    title: job.title || '',
    description: job.description || '',
    location: job.location || '',
    skills: Array.isArray(job.skills) ? job.skills.join(', ') : '',
    employment_type: job.employment_type || 'Full-Time',
    job_type: job.job_type || 'onsite',
    expires_at: job.expires_at || '2025-06-01',
    salary_min: job.salary_min ? job.salary_min.toString() : '',
    salary_max: job.salary_max ? job.salary_max.toString() : '',
    openings_count: job.openings_count ? job.openings_count.toString() : '1'
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showEmploymentTypeModal, setShowEmploymentTypeModal] = useState(false);
  const [showJobTypeModal, setShowJobTypeModal] = useState(false);
  
  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error if user is typing in a field with error
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Format skills as array
      const skillsArray = formData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '');
      
      // Format salary as numbers
      const salaryMin = parseInt(formData.salary_min) || 0;
      const salaryMax = parseInt(formData.salary_max) || 0;
      
      // Format openings count as number
      const openingsCount = parseInt(formData.openings_count) || 1;
      
      // Prepare job data for API
      const jobData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        skills: skillsArray,
        employment_type: formData.employment_type,
        job_type: formData.job_type,
        salary_min: salaryMin,
        salary_max: salaryMax,
        openings_count: openingsCount,
        expires_at: formData.expires_at
      };
      
      console.log('Submitting job update data:', jobData);
      
      // Call API to update job
      const response = await JobsService.updateJob(job.job_id || job.id, jobData);
      
      if (response.ok) {
        Alert.alert(
          'Success',
          'Job posting updated successfully',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        // Handle error response
        Alert.alert(
          'Error',
          response.data?.error || 'Failed to update job',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error updating job:', error);
      Alert.alert(
        'Error', 
        'An error occurred while updating the job. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };
  
  // Render custom dropdown option
  const renderOptionItem = (option, onSelect, selectedValue) => (
    <TouchableOpacity
      key={option.value}
      style={[
        styles.optionItem,
        selectedValue === option.value && styles.selectedOptionItem
      ]}
      onPress={() => onSelect(option.value)}
    >
      <Text style={[
        styles.optionText,
        selectedValue === option.value && styles.selectedOptionText
      ]}>
        {option.label}
      </Text>
      {selectedValue === option.value && (
        <AntDesign name="check" size={16} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Job</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Form Sections */}
        <View style={styles.formContainer}>
          {/* Job Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Job Title*</Text>
            <View style={[styles.inputContainer, errors.title && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="e.g. React Native Developer"
                placeholderTextColor="#666"
                value={formData.title}
                onChangeText={(text) => handleInputChange('title', text)}
              />
            </View>
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>
          
          {/* Company Section - Auto-populated
          <View style={styles.infoCard}>
            <View style={styles.companyHeader}>
              <View style={styles.companyLogoPlaceholder}>
                <Text style={styles.companyInitial}>{job.company ? job.company.charAt(0) : 'M'}</Text>
              </View>
              <View>
                <Text style={styles.companyName}>{job.company || 'My Company'}</Text>
                <Text style={styles.companyLocation}>{job.location || 'Mumbai, India'}</Text>
              </View>
            </View>
            <Text style={styles.infoText}>
              This job will be updated on behalf of your company
            </Text>
          </View> */}
          
          {/* Job Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Job Description*</Text>
            <View style={[styles.textAreaContainer, errors.description && styles.inputError]}>
              <TextInput
                style={styles.textArea}
                placeholder="Describe the responsibilities, requirements, and qualifications for this role..."
                placeholderTextColor="#666"
                multiline
                textAlignVertical="top"
                numberOfLines={8}
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
              />
            </View>
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>
          
          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location*</Text>
            <View style={[styles.inputContainer, errors.location && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="e.g. Bangalore, India"
                placeholderTextColor="#666"
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
            </View>
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
          </View>
          
          {/* Employment Type - Custom Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Employment Type</Text>
            <TouchableOpacity 
              style={styles.dropdownButton}
              onPress={() => setShowEmploymentTypeModal(true)}
            >
              <Text style={styles.dropdownButtonText}>{formData.employment_type}</Text>
              <AntDesign name="down" size={16} color="#999" />
            </TouchableOpacity>
          </View>
          
          {/* Job Type - Custom Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Job Type</Text>
            <TouchableOpacity 
              style={styles.dropdownButton}
              onPress={() => setShowJobTypeModal(true)}
            >
              <Text style={styles.dropdownButtonText}>
                {formData.job_type === 'onsite' ? 'On-site' : 
                 formData.job_type === 'remote' ? 'Remote' : 'Hybrid'}
              </Text>
              <AntDesign name="down" size={16} color="#999" />
            </TouchableOpacity>
          </View>
          
          {/* Skills */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Skills (comma-separated)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g. React Native, JavaScript, Redux"
                placeholderTextColor="#666"
                value={formData.skills}
                onChangeText={(text) => handleInputChange('skills', text)}
              />
            </View>
          </View>
          
          {/* Salary Range */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Salary Range (Optional)</Text>
            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Min (₹)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={formData.salary_min}
                  onChangeText={(text) => handleInputChange('salary_min', text)}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Max (₹)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={formData.salary_max}
                  onChangeText={(text) => handleInputChange('salary_max', text)}
                />
              </View>
            </View>
          </View>
          
          {/* Number of Openings */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Number of Openings</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.openings_count}
                onChangeText={(text) => handleInputChange('openings_count', text)}
              />
            </View>
          </View>
          
          {/* Expires At */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Application Deadline</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#666"
                value={formData.expires_at}
                onChangeText={(text) => handleInputChange('expires_at', text)}
              />
            </View>
            <Text style={styles.helperText}>Format: YYYY-MM-DD (e.g. 2025-06-01)</Text>
          </View>
          
          {/* Submit Button */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Update Job</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Employment Type Modal */}
      <Modal
        visible={showEmploymentTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEmploymentTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Employment Type</Text>
              <TouchableOpacity onPress={() => setShowEmploymentTypeModal(false)}>
                <AntDesign name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.optionsList}>
              {EMPLOYMENT_TYPES.map(option => 
                renderOptionItem(
                  option, 
                  (value) => {
                    handleInputChange('employment_type', value);
                    setShowEmploymentTypeModal(false);
                  },
                  formData.employment_type
                )
              )}
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Job Type Modal */}
      <Modal
        visible={showJobTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowJobTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Job Type</Text>
              <TouchableOpacity onPress={() => setShowJobTypeModal(false)}>
                <AntDesign name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.optionsList}>
              {JOB_TYPES.map(option => 
                renderOptionItem(
                  option, 
                  (value) => {
                    handleInputChange('job_type', value);
                    setShowJobTypeModal(false);
                  },
                  formData.job_type
                )
              )}
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#000',
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
  formContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  companyLocation: {
    fontSize: 14,
    color: '#999',
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.placeholderTextColorPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    justifyContent: 'center',
  },
  input: {
    color: Colors.placeholderTextColorPrimary,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: '#FF4D4F',
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  textAreaContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 150,
    padding: 12,
  },
  textArea: {
    color: Colors.placeholderTextColorPrimary,
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    color: Colors.placeholderTextColorPrimary,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsList: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedOptionItem: {
    backgroundColor: 'rgba(245, 216, 54, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
};

export default EditJobScreen;