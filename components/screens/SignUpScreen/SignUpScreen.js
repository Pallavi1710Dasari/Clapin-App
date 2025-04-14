import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { styles } from '../../../styles/SignUpStyles';
import InputField from './InputField';
import UserTypeSelector from './UserTypeSelector';
import ConfirmationModal from './ConfirmationModal';
import SocialSignUp from './SocialSignUp';
import { AuthService } from '../../../services';

const SignUpScreen = ({ navigation }) => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    user_type: 'Individual' // Default type
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [userTypeSelection, setUserTypeSelection] = useState([
    { type: 'Individual', label: 'Individual', selected: true },
    { type: 'Company', label: 'Company', selected: false },
  ]);

  // Form validation
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
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

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {...errors};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = 'Enter in format +91XXXXXXXXXX (include country code)';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
    
  };

  // Handle sign up submission
  const handleSignUp = async () => {
    console.log("signUp button clicked")

    if (!validateForm()) return ;
    console.log("signUp")
    
    setLoading(true);
    
    try {
      // Create payload for registration
      const userData = {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        user_type: formData.user_type
      };

      // Call the service method
      const response = await AuthService.registerUser(userData);
      console.log("signUp", response)
      
      if (response.ok) {
        // Show confirmation code modal
        setShowConfirmationModal(true);
      } else {
        // Show error message
        Alert.alert('Sign Up Failed', response.data.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again later.');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle confirmation submission
  const handleConfirmSignUp = async () => {
    if (!confirmationCode.trim()) {
      Alert.alert('Error', 'Please enter the confirmation code');
      return;
    }
    
    setLoading(true);
    
    try {
      // Create payload for confirmation
      const confirmData = {
        username: formData.username,
        confirmation_code: confirmationCode
      };

      // Call the service method
      const response = await AuthService.confirmRegistration(confirmData);
      
      if (response.ok) {
        Alert.alert(
          'Success',
          'Your account has been verified successfully!',
          [
            {
              text: 'Sign In',
              onPress: () => {
                setShowConfirmationModal(false);
                navigation.navigate('SignIn');
              },
            },
          ]
        );
      } else {
        Alert.alert('Verification Failed', response.data.message || 'Invalid confirmation code');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again later.');
      console.error('Confirmation error:', error);
    } finally {
      setLoading(false);
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
          <Text style={styles.logoText}>Clapin</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join the community of film professionals and artists
          </Text>
        </View>

        {/* User Type Selection */}
        <UserTypeSelector 
          options={userTypeSelection}
          onSelect={handleUserTypeSelect}
        />

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <InputField
            iconName="person-outline"
            placeholder="Username"
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
            error={errors.username}
          />

          <InputField
            iconName="mail-outline"
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <InputField
            iconName="call-outline"
            placeholder="+91XXXXXXXXXX"
            value={formData.phone_number}
            onChangeText={(text) => handleInputChange('phone_number', text)}
            keyboardType="phone-pad"
            error={errors.phone_number}
          />

          <InputField
            iconName="lock-closed-outline"
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry={!showPassword}
            showEye={true}
            eyeValue={showPassword}
            onEyePress={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

        </View>

        {/* Terms and Privacy Policy */}
        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={styles.buttonText.color} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Navigate to Login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText}>
            Already have an account? <Text style={styles.linkText}>Login</Text>
          </Text>
        </TouchableOpacity>
        
        {/* Social Sign Up Options */}
        <SocialSignUp />
      </ScrollView>

      {/* Confirmation Code Modal */}
      <ConfirmationModal
        visible={showConfirmationModal}
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        onConfirm={handleConfirmSignUp}
        onCancel={() => setShowConfirmationModal(false)}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;