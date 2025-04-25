// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
// import { Colors } from '../../../constants/constantStyles';
// import AuthService from '../../../services/AuthService';

// const ConfirmationModal = ({ 
//   visible, 
//   confirmationCode, 
//   setConfirmationCode, 
//   onConfirm, 
//   onCancel, 
//   loading,
//   setLoading, 
//   username 
// }) => {
//   const [countdown, setCountdown] = useState(30);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [resendMessage, setResendMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [verificationLoading, setVerificationLoading] = useState(false);

//   // Reset countdown and messages when modal becomes visible
//   useEffect(() => {
//     if (visible) {
//       setCountdown(30);
//       setResendMessage('');
//       setErrorMessage('');
//       setVerificationLoading(false);
//     }
//   }, [visible]);

//   // Countdown timer
//   useEffect(() => {
//     let timer;
//     if (visible && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     }
    
//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [countdown, visible]);

//   // Handle resend OTP
//   const handleResendOTP = async () => {
//     if (countdown > 0 || resendLoading) return;
    
//     setResendLoading(true);
//     setResendMessage('');
//     setErrorMessage('');

//     try {
//       // Prepare data for API
//       const resendData = {
//         attribute_name: "username",
//         attribute_value: username
//       };

//       // Call API to resend OTP
//       const response = await AuthService.resendOTP(resendData);
      
//       if (response.ok) {
//         setResendMessage('Verification code has been resent to your email.');
//         // Reset countdown
//         setCountdown(30);
//       } else {
//         setResendMessage(response.data.message || 'Failed to resend verification code. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error resending OTP:', error);
//       setResendMessage('Error sending verification code. Please try again.');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   // Handle verify button press with error checking
//   const handleVerify = async () => {
//     // Clear previous error message
//     setErrorMessage('');
    
//     // Validate code input
//     if (!confirmationCode.trim()) {
//       setErrorMessage('Please enter the verification code');
//       return;
//     }

//     // Validate code length
//     if (confirmationCode.trim().length !== 6) {
//       setErrorMessage('Verification code must be 6 digits');
//       return;
//     }
    
//     // Set local loading state to control UI
//     setVerificationLoading(true);
    
//     try {
//       // We need to wrap this in a try-catch to prevent infinite loading if there's an error
//       await onConfirm();
//     } catch (error) {
//       console.error('Verification error:', error);
      
//       // Set specific error message
//       setErrorMessage(
//         error.response?.data?.message || 
//         'Error confirming the user. Please check the code and try again.'
//       );
      
//       // Ensure loading states are reset
//       setVerificationLoading(false);
//       if (setLoading) {
//         setLoading(false);
//       }
//     }
//   };

//   if (!visible) return null;
  
//   return (
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         <Text style={styles.modalTitle}>Verify Your Account</Text>
//         <Text style={styles.modalText}>
//           We've sent a confirmation code to your email. Please enter it below to verify your account.
//         </Text>
        
//         <TextInput
//           style={[
//             styles.modalInput, 
//             errorMessage && styles.inputError
//           ]}
//           placeholder="Confirmation Code"
//           placeholderTextColor={Colors.placeholderTextColorSecondary}
//           value={confirmationCode}
//           onChangeText={(text) => {
//             // Limit to 6 digits
//             const numericText = text.replace(/[^0-9]/g, '');
//             setConfirmationCode(numericText.slice(0, 6));
            
//             // Clear error when typing
//             if (errorMessage) {
//               setErrorMessage('');
//             }
//           }}
//           keyboardType="number-pad"
//           maxLength={6}
//           editable={!verificationLoading}
//         />
        
//         {/* Error message */}
//         {errorMessage ? (
//           <Text style={styles.errorMessage}>{errorMessage}</Text>
//         ) : null}
        
//         {/* Resend message */}
//         {resendMessage ? (
//           <Text style={styles.resendMessage}>{resendMessage}</Text>
//         ) : null}
        
//         {verificationLoading ? (
//           <ActivityIndicator size="large" color={Colors.primary} />
//         ) : (
//           <>
//             {/* Verify Button */}
//             <TouchableOpacity 
//               style={[styles.verifyButton, confirmationCode.length === 6 ? styles.verifyButtonActive : styles.verifyButtonDisabled]}
//               onPress={handleVerify}
//               disabled={confirmationCode.length !== 6 || loading}
//             >
//               <Text style={styles.verifyButtonText}>Verify</Text>
//             </TouchableOpacity>
//           </>
//         )}
        
//         {/* Resend OTP Button */}
//         <View style={styles.resendContainer}>
//           {resendLoading ? (
//             <ActivityIndicator size="small" color={Colors.primary} />
//           ) : (
//             <TouchableOpacity 
//               onPress={handleResendOTP}
//               disabled={countdown > 0 || loading || verificationLoading} 
//               style={styles.resendButton}
//             >
//               <Text style={[
//                 styles.resendText,
//                 (countdown > 0 || loading || verificationLoading) && styles.resendTextDisabled
//               ]}>
//                 {countdown > 0 
//                   ? `Resend code (${countdown}s)` 
//                   : 'Resend verification code'}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 999,
//   },
//   modalContent: {
//     width: '85%',
//     backgroundColor: '#111',
//     borderRadius: 12,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   modalText: {
//     fontSize: 14,
//     color: Colors.text,
//     marginBottom: 20,
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   modalInput: {
//     width: '100%',
//     height: 50,
//     backgroundColor: Colors.input,
//     borderRadius: 8,
//     marginVertical: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     color: Colors.text,
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     letterSpacing: 2,
//     textAlign: 'center',
//   },
//   inputError: {
//     borderColor: '#FF6B6B',
//   },
//   verifyButton: {
//     width: '100%',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   verifyButtonActive: {
//     backgroundColor: Colors.primary,
//   },
//   verifyButtonDisabled: {
//     backgroundColor: '#333',
//   },
//   verifyButtonText: {
//     color: Colors.textBlack,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   resendContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   resendButton: {
//     padding: 8,
//   },
//   resendText: {
//     color: Colors.primary,
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   resendTextDisabled: {
//     color: '#666',
//   },
//   resendMessage: {
//     color: Colors.primary,
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 5,
//     marginBottom: 10,
//   },
//   errorMessage: {
//     color: '#FF6B6B',
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 5,
//     marginBottom: 10,
//   }
// });

// export default ConfirmationModal;


import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, images } from '../../../constants/constantStyles';
import AuthService from '../../../services/AuthService';
import { useAuth } from '../../../context/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ConfirmationScreen = () => {
  // Get navigation and route for accessing params
  const navigation = useNavigation();
  const route = useRoute();
  const { signIn } = useAuth();
  
  // Get username and email from route params
  const { username, password, email } = route.params || {};
  
  // State variables
  const [confirmationCode, setConfirmationCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset countdown when component mounts
  useEffect(() => {
    setCountdown(30);
    setResendMessage('');
    setErrorMessage('');
  }, []);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0 || resendLoading) return;
    
    setResendLoading(true);
    setResendMessage('');
    setErrorMessage('');

    try {
      // Prepare data for API
      const resendData = {
        attribute_name: "username",
        attribute_value: username
      };

      // Call API to resend OTP
      const response = await AuthService.resendOTP(resendData);
      
      if (response.ok) {
        setResendMessage('Verification code has been resent to your email.');
        // Reset countdown
        setCountdown(30);
      } else {
        setResendMessage(response.data.message || 'Failed to resend verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setResendMessage('Error sending verification code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Handle verify button press
  const handleVerify = async () => {
    // Clear previous error message
    setErrorMessage('');
    
    // Validate code input
    if (!confirmationCode.trim()) {
      setErrorMessage('Please enter the verification code');
      return;
    }

    // Validate code length
    if (confirmationCode.trim().length !== 6) {
      setErrorMessage('Verification code must be 6 digits');
      return;
    }
    
    // Set loading state
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
        // Try to sign in automatically
        await autoSignIn();
      } else {
        throw new Error(response.data.message || response.data.error || 'Invalid confirmation code');
      }
    } catch (error) {
      console.error('Confirmation error:', error);
      setErrorMessage(
        error.message ||
        'Error confirming your account. Please check the code and try again.'
      );
      setLoading(false);
    }
  };

  // Auto sign in after successful confirmation
  const autoSignIn = async () => {
    try {
      // Try to sign in with username
      const signInData = {
        attribute_name: 'username',
        attribute_value: username,
        password: password
      };
      
      console.log("Auto sign in with:", signInData);
      
      const result = await signIn(signInData);
      
      if (result.success) {
        console.log("Auto sign-in successful");
      } else {
        // If auto sign-in fails, just navigate to the sign in screen
        Alert.alert(
          'Registration Successful',
          'Your account has been created. Please sign in.',
          [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
        );
      }
    } catch (error) {
      console.error('Auto sign in error:', error);
      navigation.navigate('SignIn');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button press
  const handleBack = () => {
    Alert.alert(
      'Cancel Verification',
      'Are you sure you want to cancel? Your account will not be verified.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={Colors.placeholderTextColorPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Account</Text>
        <View style={styles.placeholderView} />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image source={images['logo']} style={styles.logoImage} />
            </View>
            
            {/* Title and instructions */}
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.description}>
              We've sent a verification code to {email}. Please enter the 6-digit code below to verify your account.
            </Text>
            
            {/* Code input */}
            <TextInput
              style={[
                styles.codeInput, 
                errorMessage ? styles.inputError : null
              ]}
              placeholder="Enter 6-digit code"
              placeholderTextColor={Colors.placeholderTextColorSecondary}
              value={confirmationCode}
              onChangeText={(text) => {
                // Limit to 6 digits
                const numericText = text.replace(/[^0-9]/g, '');
                setConfirmationCode(numericText.slice(0, 6));
                
                // Clear error when typing
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              keyboardType="number-pad"
              maxLength={6}
              editable={!loading}
            />
            
            {/* Error message */}
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            
            {/* Resend message */}
            {resendMessage ? (
              <Text style={styles.resendMessage}>{resendMessage}</Text>
            ) : null}
            
            {/* Verify button */}
            <TouchableOpacity 
              style={[
                styles.verifyButton, 
                confirmationCode.length === 6 ? styles.verifyButtonActive : styles.verifyButtonDisabled
              ]}
              onPress={handleVerify}
              disabled={confirmationCode.length !== 6 || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify</Text>
              )}
            </TouchableOpacity>
            
            {/* Resend link */}
            <View style={styles.resendContainer}>
              {resendLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <TouchableOpacity 
                  onPress={handleResendOTP}
                  disabled={countdown > 0 || loading} 
                >
                  <Text style={[
                    styles.resendText,
                    (countdown > 0 || loading) && styles.resendTextDisabled
                  ]}>
                    {countdown > 0 
                      ? `Resend code (${countdown}s)` 
                      : 'Resend verification code'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* Additional help text */}
            <Text style={styles.helpText}>
              Didn't receive the code? Check your spam folder or contact support.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholderView: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  logoImage: {
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  codeInput: {
    width: '100%',
    height: 60,
    backgroundColor: Colors.input,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 24,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    letterSpacing: 8,
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorMessage: {
    color: '#FF6B6B',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  resendMessage: {
    color: Colors.primary,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  verifyButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  verifyButtonActive: {
    backgroundColor: Colors.primary,
  },
  verifyButtonDisabled: {
    backgroundColor: '#333',
  },
  verifyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  resendText: {
    color: Colors.primary,
    fontSize: 16,
  },
  resendTextDisabled: {
    color: '#666',
  },
  helpText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    lineHeight: 20,
  }
});

export default ConfirmationScreen;