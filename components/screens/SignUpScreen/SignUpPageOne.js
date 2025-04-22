import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import InputField from './InputField';
import UserTypeSelector from './UserTypeSelector';
import { AuthService } from '../../../services';
import { usernameSchema } from '../../commonComponents/ValidationSchema';
import styles from '../../../styles/SignUpStyles';
import { images } from '../../../constants/constantStyles';

const SignUpPageOne = ({ navigation }) => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    user_type: 'Individual' // Default type
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [userTypeSelection, setUserTypeSelection] = useState([
    { type: 'Individual', label: 'Individual', selected: true },
    { type: 'Company', label: 'Company', selected: false },
  ]);

  // Form validation
  const [errors, setErrors] = useState({
    username: '',
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  // Handle user type selection
  const handleUserTypeSelect = (selectedType) => {
    const updated = userTypeSelection.map(item => ({
      ...item,
      selected: item.type === selectedType
    }));
    
    setUserTypeSelection(updated);
    setFormData({
      ...formData,
      user_type: selectedType
    });
  };

  // Validate username using Yup schema
  const validateUsername = async () => {
    try {
      setErrors({...errors, username: ''});
      
      // Validate with Yup schema
      await usernameSchema.validate(formData.username);
      return true;
    } catch (error) {
      // Set error message from Yup
      setErrors({...errors, username: error.message});
      return false;
    }
  };

  // Check if username is available
  const checkUsernameAvailability = async () => {
    const isValid = await validateUsername();
    if (!isValid) return;
    console.log("check attribute called")

    setChecking(true);
    
    try {
      const checkData = {
        attribute_name: "username",
        attribute_value: formData.username
      };
      
      const response = await AuthService.checkAttributeAvailability(checkData);
      
      if (response.ok) {
        // If available is true, username is available
       
        if (response.data.data.available) {
          // Username is available, proceed to next page
          navigation.navigate('SignUpPageTwo', { 
            username: formData.username,
            user_type: formData.user_type
          });
        } else {
          // Username already exists
          Alert.alert(
            'Username Already Exists',
            'This username is already taken. Would you like to sign in instead?',
            [
              {
                text: 'Try Another',
                style: 'cancel',
              },
              {
                text: 'Sign In',
                onPress: () => navigation.navigate('SignIn'),
              },
            ]
          );
        }
      } else {
        // API error
        Alert.alert('Error', response.data.error || 'Failed to check username availability');
      }
    } catch (error) {
      console.error('Username check error:', error);
      Alert.alert('Error', 'Network error. Please try again later.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo and Title */}
        <View style={styles.headerContainer}>
          {/* <Text style={styles.logoText}>Clapin</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join the community of film professionals and artists
          </Text> */}
          {/* <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.profileImage} 
          /> */}
          <Image source={images['logo']} style={styles.logoImage} />
        </View>

        {/* Step Indicator */}
        {/* <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View style={styles.stepCircleActive}>
              <Text style={styles.stepNumberActive}>1</Text>
            </View>
            <Text style={styles.stepTextActive}>Account Type</Text>
          </View>
          <View style={styles.stepDivider} />
          <View style={styles.stepIndicator}>
            <View style={styles.stepCircleInactive}>
              <Text style={styles.stepNumberInactive}>2</Text>
            </View>
            <Text style={styles.stepTextInactive}>Personal Details</Text>
          </View>
        </View> */}

        {/* User Type Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Account Type</Text>
          <UserTypeSelector 
            options={userTypeSelection}
            onSelect={handleUserTypeSelect}
          />
        </View>

        {/* Username Field */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choose a Username</Text>
          <View style={styles.formContainer}>
            <InputField
              iconName="person-outline"
              placeholder="Username"
              value={formData.username}
              onChangeText={(text) => handleInputChange('username', text)}
              error={errors.username}
            />
          </View>
          <Text style={styles.helperText}>
            Username must be at least 3 characters long
          </Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={checkUsernameAvailability}
          disabled={checking}
        >
          {checking ? (
            <ActivityIndicator size="small" color={styles.buttonText.color} />
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>

        {/* Navigate to Login */}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.switchText}>
            Already have an account? <Text style={styles.linkText}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpPageOne;