import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {Colors} from '../../constants/constantStyles';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.placeholderTextColorPrimary} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.placeholderTextColorPrimary} secureTextEntry />

      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Feeds */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.linkText}>Go to Feeds</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary, // Yellow color
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.input, // Dark grey for input
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: Colors.text, // White text
    borderWidth: 1,
    borderColor: Colors.borderColor, // Yellow border
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
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    fontSize: 17,
    color: Colors.primary, // Yellow text for navigation
    fontWeight: 'bold',
  },
});

export default LoginScreen;
