import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
<<<<<<< HEAD
import Colors from '../../constants/colors';
=======
>>>>>>> c03d9ac (initial commit)

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Your Posts</Text>
      <Text style={styles.postText}>
        Here you can create, view, and manage your posts.  
        Share your latest updates and connect with the film industry! 🎥✨
      </Text>
      <Text style={styles.postText}>📢 Stay active and keep engaging with the community! 🚀</Text>
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
    color: Colors.primary, // Yellow header
=======
    color: '#FFD700', // Yellow header
>>>>>>> c03d9ac (initial commit)
    marginBottom: 20,
  },
  postText: {
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

export default PostsScreen;
