import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
import { Colors } from '../../constants/constantStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignInScreen = ({ navigation }) => {
  const [activeMethod, setActiveMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const renderAuthMethod = () => {
    switch(activeMethod) {
      case 'email':
        return (
          <View style={styles.authMethodContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={Colors.placeholderTextColorSecondary} 
                style={styles.inputIcon} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Email or Username" 
                placeholderTextColor={Colors.placeholderTextColorSecondary}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <TouchableOpacity 
              style={[
                styles.continueButton, 
                (!email) && styles.disabledButton
              ]}
              disabled={!email}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      case 'phone':
        return (
          <View style={styles.authMethodContainer}>
            <View style={styles.phoneInputContainer}>
              <Ionicons 
                name="call-outline" 
                size={20} 
                color={Colors.placeholderTextColorSecondary} 
                style={styles.inputIcon} 
              />
              <Text style={styles.countryCode}>+1</Text>
              <TextInput 
                style={styles.phoneInput} 
                placeholder="Phone Number" 
                placeholderTextColor={Colors.placeholderTextColorSecondary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <TouchableOpacity 
              style={[
                styles.continueButton, 
                (!phone) && styles.disabledButton
              ]}
              disabled={!phone}
            >
              <Text style={styles.continueButtonText}>Send Code</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
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
          <Text style={styles.logo}>Clapin</Text>
          <Text style={styles.tagline}>Connect. Create. Collaborate.</Text>
        </View>

        {/* Auth Method Selector */}
        <View style={styles.methodSelector}>
          <TouchableOpacity 
            style={[
              styles.methodButton, 
              activeMethod === 'email' && styles.activeMethodButton
            ]}
            onPress={() => setActiveMethod('email')}
          >
            <Text style={[
              styles.methodButtonText, 
              activeMethod === 'email' && styles.activeMethodButtonText
            ]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.methodButton, 
              activeMethod === 'phone' && styles.activeMethodButton
            ]}
            onPress={() => setActiveMethod('phone')}
          >
            <Text style={[
              styles.methodButtonText, 
              activeMethod === 'phone' && styles.activeMethodButtonText
            ]}>Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Auth Method Input */}
        {renderAuthMethod()}

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine}></View>
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine}></View>
        </View>

        {/* Social Login Options */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#DB4437" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={24} color={Colors.text} />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <Text style={styles.navigationText}>
            Don't have an account? 
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,215,0,0.1)', // Soft yellow gradient effect
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.7,
  },
  methodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    padding: 5,
  },
  methodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeMethodButton: {
    backgroundColor: Colors.primary,
  },
  methodButtonText: {
    color: Colors.text,
    fontSize: 16,
    opacity: 0.7,
  },
  activeMethodButtonText: {
    color: Colors.textBlack,
    fontWeight: 'bold',
    opacity: 1,
  },
  authMethodContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
    marginBottom: 15,
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.text,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
    marginBottom: 15,
  },
  countryCode: {
    color: Colors.text,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,215,0,0.3)',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.text,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255,215,0,0.5)',
  },
  continueButtonText: {
    color: Colors.textBlack,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: Colors.text,
    opacity: 0.7,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  socialButtonText: {
    color: Colors.text,
    marginLeft: 10,
    fontSize: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navigationText: {
    color: Colors.text,
    fontSize: 14,
    marginRight: 5,
  },
  signUpText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignInScreen;