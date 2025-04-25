import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

// Components
import AuthMethodSelector from './AuthMethodSelector';
import EmailInput from './EmailInput';
import PhoneInputField from '../SignUpScreen/PhoneInputField';
import PasswordInput from './PasswordInput';
import UserInfoDisplay from './UserInfoDisplay';
import SocialSignUp from '../SignUpScreen/SocialSignUp';
import ActionButton from '../../commonComponents/ActionButton';
import { images } from '../../../constants/constantStyles';

// Services & Validation
import { AuthService } from '../../../services';
import SecureStorageService from '../../../services/SecureStorageService';
import styles from '../../../styles/SignInStyles';
import { emailSchema, phoneSchema, passwordSchema } from '../../commonComponents/ValidationSchema';
import { useAuth } from '../../../context/AuthContext';

const SignInScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  // Auth method state
  const [activeMethod, setActiveMethod] = useState('email');
  const [authMethodSelection, setAuthMethodSelection] = useState([
    { type: 'email', label: 'Email', selected: true },
    { type: 'phone', label: 'Phone', selected: false },
  ]);
  
  // Input state
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = enter email/phone, 2 = enter password
  const [attributeName, setAttributeName] = useState('email');
  const [attributeValue, setAttributeValue] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    phone_number: '',
    password: ''
  });

  
  // Handle method selection
  const handleMethodSelect = (selectedType) => {
    const updated = authMethodSelection.map(item => ({
      ...item,
      selected: item.type === selectedType
    }));
    
    setAuthMethodSelection(updated);
    setActiveMethod(selectedType);
    setStep(1); // Reset to step 1 when changing auth method
    setPassword(''); // Clear password
    clearErrors();
    
    // Set attribute name based on selected method
    setAttributeName(selectedType === 'email' ? 'email' : 'phone_number');
  };

  const clearErrors = () => {
    setErrors({
      email: '',
      phone_number: '',
      password: ''
    });
  };

  // Validate step 1
  const validateStep1 = async () => {
    try {
      setErrors({...errors, email: '', phone_number: ''});
      
      if (activeMethod === 'email') {
        return validateEmailStep();
      } else {
        return validatePhoneStep();
      }
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const validateEmailStep = async () => {
    try {
      await emailSchema.validate(email);
      setAttributeValue(email);
      return true;
    } catch (emailError) {
      // If not valid email, could be username (just check if it's not empty)
      if (!email.trim()) {
        setErrors({...errors, email: 'Please enter your email or username'});
        return false;
      }
      setAttributeName('username'); // Switch to username if not valid email
      setAttributeValue(email);
      return true;
    }
  };

  const validatePhoneStep = async () => {
    if (!phoneNumber.trim()) {
      setErrors({...errors, phone_number: 'Please enter your phone number'});
      return false;
    }
    
    // Format phone with country code
    const formattedPhone = `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
    
    try {
      await phoneSchema.validate(formattedPhone);
      setAttributeValue(formattedPhone);
      return true;
    } catch (phoneError) {
      setErrors({...errors, phone_number: phoneError.message});
      return false;
    }
  };

  // Handle continue button
  const handleContinue = async () => {
    const isValid = await validateStep1();
    if (!isValid) return;
    
    // Move to step 2
    setStep(2);
  };

  // Validate step 2
  const validateStep2 = async () => {
    try {
      setErrors({...errors, password: ''});
      
      await passwordSchema.validate(password);
      return true;
    } catch (error) {
      setErrors({...errors, password: error.message});
      return false;
    }
  };

  // Handle sign in button
  const handleSignIn = async () => {
    const isValid = await validateStep2();
    if (!isValid) return;    
    setLoading(true);
    
    try {
      const signInData = {
        attribute_name: attributeName,
        attribute_value: attributeValue,
        password
      };
      
      console.log('Signing in with:', signInData);
      
      // Use the signIn function from AuthContext
      const result = await signIn(signInData);
      
      if (result.success) {
         // Clear the form fields
          setEmail('');
          setPhoneNumber('');
          setPassword('');        
      } else {
        handleSignInError(result);
        console.log("pallavi error while signIn", result);
      }
    } catch (error) {
      handleSignInError(error);
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInError = (result) => {
    console.log("Sign in error result:", result);
    
    const errorMessage = result.error;
    
    if (errorMessage === 'UserNotConfirmedException' || errorMessage.includes('not confirmed')) {
      showVerificationAlert();
    }else if (errorMessage === 'NotAuthorizedException' || errorMessage.includes('Incorrect username or password')) {
      Alert.alert('Authentication Failed', 'Incorrect username or password. Please try again.');
    }
     else if (errorMessage === 'UserNotFoundException' || errorMessage === 'User does not exist') {
      showUserNotFoundAlert();
    }  else if (errorMessage === 'Network error') {
      Alert.alert('Connection Error', 'Please check your internet connection and try again.');
    } else {
      Alert.alert('Sign In Error', errorMessage || 'An unexpected error occurred. Please try again later.');
      console.log("Unhandled error type:", errorMessage);
    }
  };

  const showVerificationAlert = () => {
    Alert.alert(
      'Account Not Verified',
      'Your account has not been verified. Would you like to verify it now?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Verify Now', onPress: handleVerifyNow }
      ]
    );
  };

  const handleVerifyNow = () => {
    // Implementation for verification flow
    // This would typically navigate to a confirmation screen
  };

  const showUserNotFoundAlert = () => {
    Alert.alert(
      'User Not Found',
      'We couldn\'t find an account with these credentials. Please check your information or create a new account.',
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  // Render step 1 (enter email/phone)
  const renderStep1 = () => {
    return (
      <>
        {activeMethod === 'email' ? (
          <EmailInput
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
        ) : (
          <PhoneInputField
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            countryCode={countryCode}
            onSelectCountryCode={setCountryCode}
            error={errors.phone_number}
          />
        )}

        <ActionButton
          title="Continue"
          onPress={handleContinue}
          disabled={(activeMethod === 'email' && !email) || 
                    (activeMethod === 'phone' && !phoneNumber) || 
                    loading}
          loading={loading}
        />
      </>
    );
  };

  // Render step 2 (enter password)
  const renderStep2 = () => {
    return (
      <>
        {/* <UserInfoDisplay
          label={activeMethod === 'email' ? 'Email/Username:' : 'Phone:'}
          value={attributeValue}
          onEdit={() => setStep(1)}
        /> */}

        <PasswordInput
          value={password}
          onChangeText={setPassword}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          error={errors.password}
        />

        <ActionButton
          title="Sign In"
          onPress={handleSignIn}
          disabled={!password || loading}
          loading={loading}
        />
      </>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Gradient Background Layer */}
        <View style={styles.gradientBackground}></View>

        {/* Logo or App Name */}
        <View style={styles.logoContainer}>
          <Image source={images['logo']} style={styles.logoImage} />
          {/* <Text style={styles.logo}>Clapin</Text> */}
          <Text style={styles.tagline}>Connect. Create. Collaborate.</Text>
        </View>

        {/* Auth Method Selector */}
        <AuthMethodSelector
          options={authMethodSelection}
          onSelect={handleMethodSelect}
          disabled={step === 2 && loading}
        />

        {/* Auth Input Fields */}
        <View style={styles.authMethodContainer}>
          {step === 1 ? renderStep1() : renderStep2()}
        </View>

        {/* Forgot Password */}
        {step === 2 && (
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={()=>navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        {/* Social Login Options */}
        {/* <SocialSignUp/> */}

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <Text style={styles.navigationText}>
            Don't have an account? 
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpPageOne')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;