import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
<<<<<<< HEAD
import Colors from '../../constants/colors';
=======
>>>>>>> c03d9ac (initial commit)

const EntryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Clapin 🎬</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Get Started</Text>
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
=======
    color: '#FFD700', // Yellow text
>>>>>>> c03d9ac (initial commit)
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
<<<<<<< HEAD
    backgroundColor: Colors.primary, // Yellow button
=======
    backgroundColor: '#FFD700', // Yellow button
>>>>>>> c03d9ac (initial commit)
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
<<<<<<< HEAD
    color: Colors.textBlack, // Black text
    fontSize: 18,
    //fontWeight: 'bold',
=======
    color: '#000', // Black text
    fontSize: 18,
    fontWeight: 'bold',
>>>>>>> c03d9ac (initial commit)
  },
});

export default EntryScreen;
