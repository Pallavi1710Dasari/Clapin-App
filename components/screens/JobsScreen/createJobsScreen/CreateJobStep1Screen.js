// CreateJobStep1Screen.js - Basic Job Information
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../../constants/constantStyles';

const JOB_TYPES = [
  { label: 'On-site', value: 'onsite' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' }
];

const CreateJobStep1Screen = ({ navigation, route }) => {
  // Get formData from previous route or initialize it
  const [formData, setFormData] = useState(
    route.params?.formData || {
      title: '',
      description: '',
      location: '',
      job_type: 'onsite',
    }
  );
  
  // UI state
  const [errors, setErrors] = useState({});
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
  
  // Validate form before proceeding
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
  
  // Handle next button press
  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate('CreateJobStep2', { formData });
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
      style={styles.container}
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
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Job</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '33%' }]} />
        </View>
        <Text style={styles.progressText}>Step 1: Basic Information</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
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
        </View>
      </ScrollView>
      
      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <AntDesign name="arrowright" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10, 
    paddingBottom: 16,
    backgroundColor: '#000',
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
    color: '#fff',
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
  textAreaContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 150,
    padding: 12,
  },
  textArea: {
    color: '#fff',
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
    color: '#fff',
    fontSize: 16,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#000',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
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

export default CreateJobStep1Screen;