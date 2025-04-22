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
import styles from '../../../styles/SignUpStyles';
import InputField from './InputField';
import PhoneInputField from './PhoneInputField';
import ConfirmationModal from './ConfirmationModal';
import SocialSignUp from './SocialSignUp';
import SecureStorageService from '../../../services/SecureStorageService';
import { emailSchema, phoneSchema, passwordSchema } from '../../commonComponents/ValidationSchema';
import  {AuthService}  from '../../../services';
import { useAuth } from '../../../context/AuthContext';
import { images } from '../../../constants/constantStyles';

const SignUpPageTwo = ({ route, navigation }) => {
  const { signIn } = useAuth();
  // Get the data from previous page
  const { username, user_type } = route.params;

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    password: '',
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India

  // Form validation
  const [errors, setErrors] = useState({
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

  // Format phone with country code
  const getFormattedPhoneNumber = () => {
    // Remove any non-digit characters
    const cleanPhone = formData.phone_number.replace(/\D/g, '');
    return `${countryCode}${cleanPhone}`;
  };


  // Validate form
  const validateForm = async () => {
    try {
      setErrors({
        email: '',
        phone_number: '',
        password: '',
      });
      
      // Validate email
      await emailSchema.validate(formData.email);
      console.log("email", formData.email)
      
      // Format phone with country code
      const formattedPhone = getFormattedPhoneNumber();
      console.log("formated number", formattedPhone)
      // Validate phone
      await phoneSchema.validate(formattedPhone);
      
      // Validate password
      await passwordSchema.validate(formData.password);
      
      return true;
    } catch (error) {
      // Get field name from error path
      const fieldName = error.path;
      
      // Set error for the specific field
      if (fieldName) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: error.message
        }));
      }
      console.log("return flase")
      return false;
    }
  };

  // Handle sign up submission
  const handleSignUp = async () => {
    console.log("signUp button clicked");
    if (loading) return;

    const isValid = await validateForm();
    if (!isValid) return;    
    console.log("signUp validation passed");
    setLoading(true);
    
    try {
      // Format phone number with country code
      const formattedPhone = getFormattedPhoneNumber();
      
      // Create payload for registration
      const userData = {
        username,
        email: formData.email,
        phone_number: formattedPhone,
        password: formData.password,
        user_type
      };

      console.log("Sending registration data:", userData);

      // Call the service method
      const response = await AuthService.registerUser(userData);
      console.log("signUp response pallavi:", response);
      
      if (response.ok) {
        // Show confirmation code modal
        console.log("response", response)
        setShowConfirmationModal(true);
        
      } else {
        console.log("response", response)
        const errorMessage = response.data?.error || 
        response.data?.message || 
        'Registration failed. Please try again.';

          // Check for specific error conditions
          if (errorMessage.toLowerCase().includes('already exists')) {
            Alert.alert(
            'Account Already Exists', 
            'An account with this username or email already exists. Please sign in or use a different email.'
            );
          } else {
              Alert.alert('Sign Up Failed', errorMessage);
            }
          }
      
    } catch (error) {
      console.error('Sign up error:', error.response?.data || error.message || error);
      
      Alert.alert(
        'Error', 
        error.response?.data?.message || 
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto sign in after confirmation
  const autoSignIn = async () => {
    setLoading(true);
    try {
      // Try to sign in with username
      const signInData = {
        attribute_name: 'username',
        attribute_value: username,
        password: formData.password
      };
      
      console.log("Auto sign in with:", signInData);
      
      const result = await signIn(signInData);
      
      if (result.success) {
      console.log("auth signIn conform", result)      
     } else {
        // If auto sign-in fails, just navigate to the sign in screen
        Alert.alert(
          'Registration Successful',
          'Your account has been created. Please sign in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SignIn')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Auto sign in error:', error);
      navigation.navigate('SignIn');
    } finally {
      setLoading(false);
    }
  };

  // Handle confirmation submission
  const handleConfirmSignUp = async () => {
    if (!confirmationCode.trim()) {
      setShowConfirmationModal(true);
      return;
    }
    
    setLoading(true);
    
    try {
      // Create payload for confirmation
      const confirmData = {
        username,
        confirmation_code: confirmationCode
      };

      // Call the service method
      const response = await AuthService.confirmRegistration(confirmData);
      
      if (response.ok) {
        // Close the modal
        setShowConfirmationModal(false);
        
        // Auto sign in
        autoSignIn();
      } else {
        throw new Error(response.data.message || response.data.error || 'Invalid confirmation code');
      }
    } catch (error) {
          // Set loading to false
        setLoading(false);
        
        // Log the error
        console.error('Confirmation error:', error);
        
        // Rethrow the error to be handled by the ConfirmationModal
        throw error;
      
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
          <Text style={styles.title}>Personal Details</Text>
          <Text style={styles.subtitle}>
            Tell us a bit more about yourself
          </Text> */}
          <Image source={images['logo']} style={styles.logoImage} />
        </View>

        {/* Step Indicator */}

        {/* <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View style={styles.stepCircleCompleted}>
              <Text style={styles.stepNumberCompleted}>✓</Text>
            </View>
            <Text style={styles.stepTextCompleted}>Account Type</Text>
          </View>
          <View style={styles.stepDividerActive} />
          <View style={styles.stepIndicator}>
            <View style={styles.stepCircleActive}>
              <Text style={styles.stepNumberActive}>2</Text>
            </View>
            <Text style={styles.stepTextActive}>Personal Details</Text>
          </View>
        </View> */}

        {/* Username Summary */}

        {/* <View style={styles.summarySectionContainer}>
          <Text style={styles.summaryLabel}>Username:</Text>
          <Text style={styles.summaryValue}>{username}</Text>
          
          <Text style={styles.summaryLabel}>Account Type:</Text>
          <Text style={styles.summaryValue}>{user_type}</Text>
        </View> */}

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <InputField
            iconName="mail-outline"
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <PhoneInputField
            value={formData.phone_number}
            onChangeText={(text) => handleInputChange('phone_number', text)}
            error={errors.phone_number}
            countryCode={countryCode}
            onSelectCountryCode={setCountryCode}
          />

          <InputField
            iconName="lock-outline"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry={!showPassword}
            showEye={true}
            eyeValue={showPassword}
            onEyePress={() => setShowPassword(!showPassword)}
            error={errors.password}
          />
          
          {errors.password && (
            <Text style={styles.passwordRequirements}>
              Password must be at least 8 characters with at least one uppercase letter, 
              one lowercase letter, and one number.
            </Text>
          )}
        </View>

        {/* Terms and Privacy Policy */}
        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>

        {/* Button Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={styles.buttonText.color} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Social Sign Up Options */}

        {/* <SocialSignUp /> */}
        
      </ScrollView>

      {/* Confirmation Code Modal */}
      <ConfirmationModal
        visible={showConfirmationModal}
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        onConfirm={async () => {
          try {
            await handleConfirmSignUp();
          } catch (error) {
            // This error will be caught in the ConfirmationModal's handleVerify method
            throw error;
          }
        }}
        onCancel={() => {
          setShowConfirmationModal(false);
          setConfirmationCode("");
        }}
        loading={loading}
        setLoading={setLoading}
        username={username} 
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpPageTwo;