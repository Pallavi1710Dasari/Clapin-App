import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
<<<<<<< HEAD
import Colors from '../../constants/colors';
=======
>>>>>>> c03d9ac (initial commit)

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Already have an account? Login</Text>
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
    color: Colors.primary, // Yellow text
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.primary, // Yellow button
=======
    color: '#FFD700', // Yellow text
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFD700', // Yellow button
>>>>>>> c03d9ac (initial commit)
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
<<<<<<< HEAD
    color: Colors.textBlack, // Black text on yellow button
    fontSize: 16,
    //fontWeight: 'bold',
=======
    color: '#000', // Black text on yellow button
    fontSize: 16,
    fontWeight: 'bold',
>>>>>>> c03d9ac (initial commit)
  },
});

export default SignInScreen;
