import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
<<<<<<< HEAD
import Colors from '../../constants/colors';
=======
>>>>>>> c03d9ac (initial commit)

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎭 Your Profile</Text>
      <Text style={styles.profileText}>
        Manage your profile, update your details, and showcase your talent!  
        Connect with professionals in the film industry. 🌟
      </Text>
      <Text style={styles.profileText}>📌 Keep your profile updated for better opportunities! 🚀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: Colors.background, // Black background
=======
    backgroundColor: '#000', // Black background
>>>>>>> c03d9ac (initial commit)
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: Colors.primary, // Yellow for cinematic theme
=======
    color: '#FFD700', // Yellow for cinematic theme
>>>>>>> c03d9ac (initial commit)
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
<<<<<<< HEAD
    color: Colors.text, // White text for readability
=======
    color: '#fff', // White text for readability
>>>>>>> c03d9ac (initial commit)
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default ProfileScreen;
