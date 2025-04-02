import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={Colors.placeholderTextColorSecondary} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.placeholderTextColorSecondary} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.placeholderTextColorSecondary} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor={Colors.placeholderTextColorSecondary} secureTextEntry />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Already have an account? <Text style={styles.linkText}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, // Black background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary, // Yellow title
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.input, // Darker input fields
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor, // Yellow border
    color: Colors.text, // White text inside input
  },
  button: {
    backgroundColor: Colors.primary, // Yellow button
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: Colors.textBlack, // Black text on yellow button
    fontSize: 18,
    //fontWeight: 'bold',
  },
  switchText: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.text, // White text
  },
  linkText: {
    color: Colors.primary, // Yellow link
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
