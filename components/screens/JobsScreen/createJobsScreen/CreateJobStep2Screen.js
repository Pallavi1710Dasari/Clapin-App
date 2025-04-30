// CreateJobStep2Screen.js - Job Requirements
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

const EMPLOYMENT_TYPES = [
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Part-Time', value: 'Part-Time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Internship', value: 'Internship' }
];

const CreateJobStep2Screen = ({ navigation, route }) => {
  // Get formData from previous route
  const [formData, setFormData] = useState({
    ...route.params.formData,
    employment_type: route.params.formData.employment_type || 'Full-Time',
    skills: route.params.formData.skills || '',
    openings_count: route.params.formData.openings_count || '1',
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [showEmploymentTypeModal, setShowEmploymentTypeModal] = useState(false);
  
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
    
    if (!formData.skills.trim()) {
      newErrors.skills = 'At least one skill is required';
    }
    
    if (!formData.openings_count || parseInt(formData.openings_count) < 1) {
      newErrors.openings_count = 'Number of openings must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next button press
  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate('CreateJobStep3', { formData });
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
        <Text style={styles.headerTitle}>Create Job (2/3)</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '66%' }]} />
        </View>
        <Text style={styles.progressText}>Step 2: Job Requirements</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Form Sections */}
        <View style={styles.formContainer}>
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
          
          {/* Skills */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Required Skills (comma-separated)*</Text>
            <View style={[styles.textAreaContainer, errors.skills && styles.inputError]}>
              <TextInput
                style={styles.textArea}
                placeholder="e.g. React Native, JavaScript, Redux"
                placeholderTextColor="#666"
                multiline
                textAlignVertical="top"
                numberOfLines={4}
                value={formData.skills}
                onChangeText={(text) => handleInputChange('skills', text)}
              />
            </View>
            {errors.skills && <Text style={styles.errorText}>{errors.skills}</Text>}
            <Text style={styles.helperText}>Enter skills separated by commas</Text>
          </View>
          
          {/* Number of Openings */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Number of Openings*</Text>
            <View style={[styles.inputContainer, errors.openings_count && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.openings_count}
                onChangeText={(text) => handleInputChange('openings_count', text)}
              />
            </View>
            {errors.openings_count && <Text style={styles.errorText}>{errors.openings_count}</Text>}
          </View>
          
          {/* Responsibilities */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Key Responsibilities (Optional)</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="List the main responsibilities of this role..."
                placeholderTextColor="#666"
                multiline
                textAlignVertical="top"
                numberOfLines={4}
                value={formData.responsibilities}
                onChangeText={(text) => handleInputChange('responsibilities', text)}
              />
            </View>
            <Text style={styles.helperText}>This will appear in the job details</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.backStepButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={20} color="#fff" />
          <Text style={styles.backStepButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <AntDesign name="arrowright" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      
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
    minHeight: 100,
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
  backStepButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backStepButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default CreateJobStep2Screen;