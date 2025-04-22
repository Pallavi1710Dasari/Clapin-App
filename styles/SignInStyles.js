import { StyleSheet } from 'react-native';
import { Colors } from '../constants/constantStyles';

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
      backgroundColor: 'rgba(255,215,0,0.1)', 
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
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: 'transparent',
      alignItems: 'center',
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
    eyeIcon: {
      paddingHorizontal: 10,
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
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      paddingHorizontal: 5,
    },
    userInfoLabel: {
      color: Colors.text,
      fontSize: 14,
      opacity: 0.7,
      marginRight: 8,
    },
    userInfoValue: {
      flex: 1,
      color: Colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    editText: {
      color: Colors.primary,
      fontSize: 14,
      textDecorationLine: 'underline',
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
    errorText: {
      color: '#FF6B6B',
      fontSize: 12,
      marginTop: -10,
      marginBottom: 10,
      marginLeft: 5,
    },
  });
  
  export default styles;
  