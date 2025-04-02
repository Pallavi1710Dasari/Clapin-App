import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
<<<<<<< HEAD
import Colors from '../../constants/colors';
=======
>>>>>>> c03d9ac (initial commit)

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Input Fields */}
<<<<<<< HEAD
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.placeholderTextColorPrimary} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.placeholderTextColorPrimary} secureTextEntry />
=======
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ddd" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ddd" secureTextEntry />
>>>>>>> c03d9ac (initial commit)

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
<<<<<<< HEAD
    backgroundColor: Colors.background, // Black background
=======
    backgroundColor: '#000', // Black background
>>>>>>> c03d9ac (initial commit)
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: Colors.primary, // Yellow color
=======
    color: '#FFD700', // Yellow color
>>>>>>> c03d9ac (initial commit)
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
<<<<<<< HEAD
    backgroundColor: Colors.input, // Dark grey for input
=======
    backgroundColor: '#222', // Dark grey for input
>>>>>>> c03d9ac (initial commit)
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
<<<<<<< HEAD
    color: Colors.text, // White text
    borderWidth: 1,
    borderColor: Colors.borderColor, // Yellow border
  },
  button: {
    backgroundColor: Colors.primary, // Yellow button
=======
    color: '#fff', // White text
    borderWidth: 1,
    borderColor: '#FFD700', // Yellow border
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
  },
  linkText: {
    marginTop: 20,
    fontSize: 17,
    color: Colors.primary, // Yellow text for navigation
=======
    color: '#000', // Black text on yellow button
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFD700', // Yellow text for navigation
>>>>>>> c03d9ac (initial commit)
    fontWeight: 'bold',
  },
});

export default LoginScreen;
