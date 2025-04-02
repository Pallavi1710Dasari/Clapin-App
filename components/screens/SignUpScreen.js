import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
<<<<<<< HEAD
import Colors from '../../constants/colors';
=======
>>>>>>> c03d9ac (initial commit)

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Input Fields */}
<<<<<<< HEAD
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={Colors.placeholderTextColorSecondary} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.placeholderTextColorSecondary} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.placeholderTextColorSecondary} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor={Colors.placeholderTextColorSecondary} secureTextEntry />
=======
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#AAA" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#AAA" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#AAA" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#AAA" secureTextEntry />
>>>>>>> c03d9ac (initial commit)

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
<<<<<<< HEAD
    backgroundColor: Colors.background, // Black background
=======
    backgroundColor: '#000', // Black background
>>>>>>> c03d9ac (initial commit)
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: Colors.primary, // Yellow title
=======
    color: '#FFD700', // Yellow title
>>>>>>> c03d9ac (initial commit)
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
<<<<<<< HEAD
    backgroundColor: Colors.input, // Darker input fields
=======
    backgroundColor: '#222', // Darker input fields
>>>>>>> c03d9ac (initial commit)
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: Colors.borderColor, // Yellow border
    color: Colors.text, // White text inside input
  },
  button: {
    backgroundColor: Colors.primary, // Yellow button
=======
    borderColor: '#FFD700', // Yellow border
    color: '#FFF', // White text inside input
  },
  button: {
    backgroundColor: '#FFD700', // Yellow button
>>>>>>> c03d9ac (initial commit)
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
<<<<<<< HEAD
    color: Colors.textBlack, // Black text on yellow button
    fontSize: 18,
    //fontWeight: 'bold',
=======
    color: '#000', // Black text on yellow button
    fontSize: 18,
    fontWeight: 'bold',
>>>>>>> c03d9ac (initial commit)
  },
  switchText: {
    marginTop: 20,
    fontSize: 16,
<<<<<<< HEAD
    color: Colors.text, // White text
  },
  linkText: {
    color: Colors.primary, // Yellow link
=======
    color: '#FFF', // White text
  },
  linkText: {
    color: '#FFD700', // Yellow link
>>>>>>> c03d9ac (initial commit)
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
