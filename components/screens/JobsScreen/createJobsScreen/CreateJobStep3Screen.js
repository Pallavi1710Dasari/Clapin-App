// CreateJobStep3Screen.js - Final Details & Submission
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
  ActivityIndicator,
  Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../../constants/constantStyles';
import JobsService from '../../../../services/JobsService';

const CreateJobStep3Screen = ({ navigation, route }) => {
  // Get formData from previous route
  const [formData, setFormData] = useState({
    ...route.params.formData,
    salary_min: route.params.formData.salary_min || '',
    salary_max: route.params.formData.salary_max || '',
    expires_at: route.params.formData.expires_at || getDefaultExpiryDate()
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Get default expiry date (30 days from now)
  function getDefaultExpiryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
  
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
    
    // Validate expiry date format (YYYY-MM-DD)
    if (!formData.expires_at.match(/^\d{4}-\d{2}-\d{2}$/)) {
      newErrors.expires_at = 'Please use the format YYYY-MM-DD';
    }
    
    // If salary_min is provided, ensure it's a valid number
    if (formData.salary_min && isNaN(parseInt(formData.salary_min))) {
      newErrors.salary_min = 'Minimum salary must be a number';
    }
    
    // If salary_max is provided, ensure it's a valid number
    if (formData.salary_max && isNaN(parseInt(formData.salary_max))) {
      newErrors.salary_max = 'Maximum salary must be a number';
    }
    
    // If both salary values are provided, ensure min <= max
    if (formData.salary_min && formData.salary_max && 
        parseInt(formData.salary_min) > parseInt(formData.salary_max)) {
      newErrors.salary_max = 'Maximum salary cannot be less than minimum salary';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Format data for submission
  const prepareJobData = () => {
    // Format skills as array from comma-separated string
    const skillsArray = formData.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
    
    // Parse numeric values
    const salaryMin = parseInt(formData.salary_min) || 0;
    const salaryMax = parseInt(formData.salary_max) || 0;
    const openingsCount = parseInt(formData.openings_count) || 1;
    
    return {
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
  };
  
  // Submit job data
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare data for API
      const jobData = prepareJobData();
      console.log('Submitting job data:', jobData);
      
      // Call API to create job
      const response = await JobsService.createJob(jobData);
      
      if (response.ok) {
        Alert.alert(
          'Success',
          'Job posting created successfully',
          [{ text: 'OK', onPress: () => navigation.navigate('BottomTabs', { screen: 'Jobs' }) }]
        );
      } else {
        // Handle specific error cases
        if (response.status === 403) {
          Alert.alert(
            'Permission Error',
            'Only Organization accounts can post jobs. Please use an organization account.',
            [{ text: 'OK' }]
          );
        } else {
          throw new Error(response.data?.error || 'Failed to create job');
        }
      }
    } catch (error) {
      console.error('Error creating job:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to post job. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  // Show job preview
  const renderJobPreview = () => (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>{formData.title}</Text>
      
      <View style={styles.previewRow}>
        <AntDesign name="enviromento" size={16} color="#999" />
        <Text style={styles.previewText}>{formData.location}</Text>
      </View>
      
      <View style={styles.previewRow}>
        <AntDesign name="clockcircleo" size={16} color="#999" />
        <Text style={styles.previewText}>
          {formData.employment_type} · {formData.job_type === 'onsite' ? 'On-site' : 
           formData.job_type === 'remote' ? 'Remote' : 'Hybrid'}
        </Text>
      </View>
      
      {(formData.salary_min || formData.salary_max) && (
        <View style={styles.previewRow}>
          <AntDesign name="wallet" size={16} color="#999" />
          <Text style={styles.previewText}>
            {formData.salary_min && formData.salary_max ? 
              `₹${formData.salary_min} - ₹${formData.salary_max}` : 
              formData.salary_min ? 
                `₹${formData.salary_min}+` : 
                `Up to ₹${formData.salary_max}`}
          </Text>
        </View>
      )}
      
      <View style={styles.skillsPreview}>
        {formData.skills.split(',').map((skill, index) => (
          skill.trim() && (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{skill.trim()}</Text>
            </View>
          )
        ))}
      </View>
    </View>
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
        <Text style={styles.headerTitle}>Create Job (3/3)</Text>
        <View style={{ width: 24 }} /> {/* Empty view for balanced header */}
      </View>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>
        <Text style={styles.progressText}>Step 3: Final Details</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Form Sections */}
        <View style={styles.formContainer}>
          {/* Salary Range */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Salary Range (Optional)</Text>
            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }, errors.salary_min && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Min (₹)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={formData.salary_min}
                  onChangeText={(text) => handleInputChange('salary_min', text)}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }, errors.salary_max && styles.inputError]}>
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
            {errors.salary_min && <Text style={styles.errorText}>{errors.salary_min}</Text>}
            {errors.salary_max && <Text style={styles.errorText}>{errors.salary_max}</Text>}
          </View>
          
          {/* Application Deadline */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Application Deadline</Text>
            <View style={[styles.inputContainer, errors.expires_at && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#666"
                value={formData.expires_at}
                onChangeText={(text) => handleInputChange('expires_at', text)}
              />
            </View>
            {errors.expires_at && <Text style={styles.errorText}>{errors.expires_at}</Text>}
            <Text style={styles.helperText}>Format: YYYY-MM-DD (e.g. 2025-06-01)</Text>
          </View>
          
          {/* Benefits (Optional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Benefits (Optional)</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Enter benefits like health insurance, flexible hours, etc."
                placeholderTextColor="#666"
                multiline
                textAlignVertical="top"
                numberOfLines={4}
                value={formData.benefits}
                onChangeText={(text) => handleInputChange('benefits', text)}
              />
            </View>
          </View>
          
          {/* Job Preview */}
          <View style={styles.previewSection}>
            <Text style={styles.previewSectionTitle}>Job Preview</Text>
            {renderJobPreview()}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.backStepButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <AntDesign name="arrowleft" size={20} color="#fff" />
          <Text style={styles.backStepButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" size="small" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Post Job</Text>
              <AntDesign name="check" size={20} color="#000" />
            </>
          )}
        </TouchableOpacity>
      </View>
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
  rowContainer: {
    flexDirection: 'row',
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
  previewSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  previewSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  previewContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
  },
  skillsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: 'rgba(245, 216, 54, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  skillTagText: {
    color: Colors.primary,
    fontSize: 12,
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
  submitButton: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
};

export default CreateJobStep3Screen;