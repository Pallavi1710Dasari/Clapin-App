import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

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
    backgroundColor: Colors.background, // Black background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary, // Yellow for cinematic theme
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    color: Colors.text, // White text for readability
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default ProfileScreen;
