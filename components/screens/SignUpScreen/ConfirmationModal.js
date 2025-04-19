// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
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
//     // Clear error message first
//     setErrorMessage('');
    
//     // Validate code input
//     if (!confirmationCode.trim()) {
//       setErrorMessage('Please enter the verification code');
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
//         error.message || 
//         'An unexpected error occurred. Please try again.'
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
//           style={styles.modalInput}
//           placeholder="Confirmation Code"
//           placeholderTextColor={Colors.placeholderTextColorSecondary}
//           value={confirmationCode}
//           onChangeText={(text) => {
//             setConfirmationCode(text);
//             setErrorMessage(''); // Clear error when typing
//           }}
//           keyboardType="number-pad"
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
//           <View style={styles.modalButtonsContainer}>
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.cancelButton]}
//               onPress={onCancel}
//               disabled={loading}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.confirmButton]}
//               onPress={handleVerify}
//               disabled={loading}
//             >
//               <Text style={styles.confirmButtonText}>Verify</Text>
//             </TouchableOpacity>
//           </View>
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
//   modalButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#333',
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   cancelButtonText: {
//     color: Colors.text,
//     fontSize: 16,
//   },
//   confirmButton: {
//     backgroundColor: Colors.primary,
//   },
//   confirmButtonText: {
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
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';
import AuthService from '../../../services/AuthService';

const ConfirmationModal = ({ 
  visible, 
  confirmationCode, 
  setConfirmationCode, 
  onConfirm, 
  onCancel, 
  loading,
  setLoading, 
  username 
}) => {
  const [countdown, setCountdown] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);

  // Reset countdown and messages when modal becomes visible
  useEffect(() => {
    if (visible) {
      setCountdown(30);
      setResendMessage('');
      setErrorMessage('');
      setVerificationLoading(false);
    }
  }, [visible]);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (visible && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, visible]);

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

  // Handle verify button press with error checking
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
    
    // Set local loading state to control UI
    setVerificationLoading(true);
    
    try {
      // We need to wrap this in a try-catch to prevent infinite loading if there's an error
      await onConfirm();
    } catch (error) {
      console.error('Verification error:', error);
      
      // Set specific error message
      setErrorMessage(
        error.response?.data?.message || 
        'Error confirming the user. Please check the code and try again.'
      );
      
      // Ensure loading states are reset
      setVerificationLoading(false);
      if (setLoading) {
        setLoading(false);
      }
    }
  };

  if (!visible) return null;
  
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Verify Your Account</Text>
        <Text style={styles.modalText}>
          We've sent a confirmation code to your email. Please enter it below to verify your account.
        </Text>
        
        <TextInput
          style={[
            styles.modalInput, 
            errorMessage && styles.inputError
          ]}
          placeholder="Confirmation Code"
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
          editable={!verificationLoading}
        />
        
        {/* Error message */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        
        {/* Resend message */}
        {resendMessage ? (
          <Text style={styles.resendMessage}>{resendMessage}</Text>
        ) : null}
        
        {verificationLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <>
            {/* Verify Button */}
            <TouchableOpacity 
              style={[styles.verifyButton, confirmationCode.length === 6 ? styles.verifyButtonActive : styles.verifyButtonDisabled]}
              onPress={handleVerify}
              disabled={confirmationCode.length !== 6 || loading}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
        
        {/* Resend OTP Button */}
        <View style={styles.resendContainer}>
          {resendLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <TouchableOpacity 
              onPress={handleResendOTP}
              disabled={countdown > 0 || loading || verificationLoading} 
              style={styles.resendButton}
            >
              <Text style={[
                styles.resendText,
                (countdown > 0 || loading || verificationLoading) && styles.resendTextDisabled
              ]}>
                {countdown > 0 
                  ? `Resend code (${countdown}s)` 
                  : 'Resend verification code'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalInput: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.input,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    letterSpacing: 2,
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  verifyButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  verifyButtonActive: {
    backgroundColor: Colors.primary,
  },
  verifyButtonDisabled: {
    backgroundColor: '#333',
  },
  verifyButtonText: {
    color: Colors.textBlack,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendButton: {
    padding: 8,
  },
  resendText: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  resendTextDisabled: {
    color: '#666',
  },
  resendMessage: {
    color: Colors.primary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  errorMessage: {
    color: '#FF6B6B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  }
});

export default ConfirmationModal;