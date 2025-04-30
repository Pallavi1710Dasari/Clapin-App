// // CreateJobScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Colors } from '../../../constants/constantStyles';
// import JobsService from '../../../services/JobsService';
// import styles from '../../../styles/JobsStyles';

// const CreateJobScreen = ({ navigation }) => {
//   // Job form state
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     skills: '',
//     employment_type: 'Full-Time',
//     job_type: 'onsite',
//     salary_min: '',
//     salary_max: '',
//     openings_count: '1',
//     expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
//   });
  
//   // UI state
//   const [loading, setLoading] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
  
//   // Handle input changes
//   const handleInputChange = (field, value) => {
//     setFormData({
//       ...formData,
//       [field]: value
//     });
//   };
  
//   // Handle date change
//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setFormData({
//         ...formData,
//         expires_at: selectedDate
//       });
//     }
//   };

//   // Format date for display
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };
  
//   // Handle job submission
//   const handleSubmit = async () => {
//     // Basic validation
//     if (!formData.title || !formData.description || !formData.location) {
//       Alert.alert('Missing Fields', 'Please fill in all required fields');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // Format skills as array
//       const skillsArray = formData.skills
//         .split(',')
//         .map(skill => skill.trim())
//         .filter(skill => skill !== '');
      
//       // Format salary as numbers
//       const salaryMin = parseInt(formData.salary_min) || 0;
//       const salaryMax = parseInt(formData.salary_max) || 0;
      
//       // Format openings count as number
//       const openingsCount = parseInt(formData.openings_count) || 1;
      
//       // Format expiry date
//       const expiresAt = formData.expires_at.toISOString().split('T')[0];
      
//       // Prepare job data for API
//       const jobData = {
//         title: formData.title,
//         description: formData.description,
//         location: formData.location,
//         skills: skillsArray,
//         employment_type: formData.employment_type,
//         job_type: formData.job_type,
//         salary_min: salaryMin,
//         salary_max: salaryMax,
//         openings_count: openingsCount,
//         expires_at: expiresAt
//       };
      
//       // Submit to API
//       const response = await JobsService.createJob(jobData);
      
//       if (response.ok) {
//         Alert.alert(
//           'Success',
//           'Job posting created successfully',
//           [{ text: 'OK', onPress: () => navigation.goBack() }]
//         );
//       } else {
//         throw new Error(response.data.error || 'Failed to create job');
//       }
//     } catch (error) {
//       console.error('Error creating job:', error);
//       Alert.alert('Error', error.message || 'Failed to post job. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Cancel and go back
//   const handleCancel = () => {
//     navigation.goBack();
//   };
  
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={100}
//     >
//       <ScrollView style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={handleCancel}
//           >
//             <Ionicons name="arrow-back" size={24} color={Colors.text} />
//             <Text style={styles.backButtonText}>Jobs</Text>
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.formContainer}>
//           <Text style={styles.formTitle}>Create Job Posting</Text>
          
//           {/* Job Title */}
//           <Text style={styles.inputLabel}>Job Title*</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g. Senior Frontend Developer"
//               placeholderTextColor="#666"
//               value={formData.title}
//               onChangeText={(text) => handleInputChange('title', text)}
//             />
//           </View>
          
//           {/* Job Description */}
//           <Text style={styles.inputLabel}>Job Description*</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.textArea}
//               placeholder="Describe the role, responsibilities, requirements..."
//               placeholderTextColor="#666"
//               value={formData.description}
//               onChangeText={(text) => handleInputChange('description', text)}
//               multiline
//               numberOfLines={6}
//             />
//           </View>
          
//           {/* Location */}
//           <Text style={styles.inputLabel}>Location*</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g. Mumbai, India"
//               placeholderTextColor="#666"
//               value={formData.location}
//               onChangeText={(text) => handleInputChange('location', text)}
//             />
//           </View>
          
//           {/* Skills */}
//           <Text style={styles.inputLabel}>Required Skills (comma-separated)</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="e.g. React, JavaScript, Redux"
//               placeholderTextColor="#666"
//               value={formData.skills}
//               onChangeText={(text) => handleInputChange('skills', text)}
//             />
//           </View>
          
//           {/* Employment Type */}
//           <Text style={styles.inputLabel}>Employment Type</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={formData.employment_type}
//               onValueChange={(value) => handleInputChange('employment_type', value)}
//               style={styles.picker}
//               dropdownIconColor={Colors.text}
//             >
//               <Picker.Item label="Full-Time" value="Full-Time" />
//               <Picker.Item label="Part-Time" value="Part-Time" />
//               <Picker.Item label="Contract" value="Contract" />
//               <Picker.Item label="Internship" value="Internship" />
//             </Picker>
//           </View>
          
//           {/* Job Type */}
//           <Text style={styles.inputLabel}>Job Type</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={formData.job_type}
//               onValueChange={(value) => handleInputChange('job_type', value)}
//               style={styles.picker}
//               dropdownIconColor={Colors.text}
//             >
//               <Picker.Item label="On-site" value="onsite" />
//               <Picker.Item label="Remote" value="remote" />
//               <Picker.Item label="Hybrid" value="hybrid" />
//             </Picker>
//           </View>
          
//           {/* Salary Range */}
//           <Text style={styles.inputLabel}>Salary Range (optional)</Text>
//           <View style={{ flexDirection: 'row' }}>
//             <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Min"
//                 placeholderTextColor="#666"
//                 value={formData.salary_min}
//                 onChangeText={(text) => handleInputChange('salary_min', text)}
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Max"
//                 placeholderTextColor="#666"
//                 value={formData.salary_max}
//                 onChangeText={(text) => handleInputChange('salary_max', text)}
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>
          
//           {/* Number of Openings */}
//           <Text style={styles.inputLabel}>Number of Openings</Text>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               value={formData.openings_count}
//               onChangeText={(text) => handleInputChange('openings_count', text)}
//               keyboardType="numeric"
//             />
//           </View>
          
//           {/* Expiry Date */}
//           <Text style={styles.inputLabel}>Application Deadline</Text>
//           <TouchableOpacity 
//             style={styles.inputContainer}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
//               <Text style={{ color: Colors.text }}>
//                 {formatDate(formData.expires_at)}
//               </Text>
//               <Ionicons name="calendar-outline" size={20} color={Colors.iconsColor} />
//             </View>
//           </TouchableOpacity>
          
//           {showDatePicker && (
//             <DateTimePicker
//               value={formData.expires_at}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//               minimumDate={new Date()}
//             />
//           )}
          
//           {/* Submit Buttons */}
//           <View style={styles.buttonRow}>
//             <TouchableOpacity 
//               style={styles.cancelButton}
//               onPress={handleCancel}
//               disabled={loading}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.submitButton}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#000" size="small" />
//               ) : (
//                 <Text style={styles.buttonText}>Post Job</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default CreateJobScreen;

// Fixed CreateJobScreen.js without Text warnings
import React, { useState } from 'react';
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

const CreateJobScreen = ({ navigation }) => {
  // Form state with initial values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skills: '',
    employment_type: 'Full-Time',
    job_type: 'onsite',
    expires_at: '2025-06-01', // Using string date format
    salary_min: '',
    salary_max: '',
    openings_count: '1'
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
      
      // Call the actual API
      const response = await JobsService.createJob(jobData);
      console.log('API Response:', JSON.stringify(response));
      
      if (response.ok) {
        Alert.alert(
          'Success',
          'Job posting created successfully',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        // Check for specific error cases
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
          
          {/* Company Section - In a real app, this would be auto-populated
          <View style={styles.infoCard}>
            <View style={styles.companyHeader}>
              <View style={styles.companyLogoPlaceholder}>
                <Text style={styles.companyInitial}>M</Text>
              </View>
              <View>
                <Text style={styles.companyName}>My Company</Text>
                <Text style={styles.companyLocation}>Mumbai, India</Text>
              </View>
            </View>
            <Text style={styles.infoText}>
              This job will be posted on behalf of your company
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
                <Text style={styles.submitButtonText}>Post Job</Text>
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

export default CreateJobScreen;