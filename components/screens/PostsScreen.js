import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from '../../constants/constantStyles';

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
    backgroundColor: Colors.background, // Black background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary, // Yellow header
    marginBottom: 20,
  },
  postText: {
    fontSize: 16,
    color: Colors.text, // White text for readability
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default PostsScreen;
