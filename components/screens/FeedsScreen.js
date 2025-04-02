import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📢 Latest Feeds</Text>
      <Text style={styles.feedText}>
        Welcome to Clapin Feeds! 🎬 Stay updated with the latest posts, news, and updates from your favorite creators. 🚀
      </Text>
      <Text style={styles.feedText}>⬇ Scroll down to explore more exciting content! 🎥</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', 
    marginBottom: 20,
  },
  feedText: {
    fontSize: 16,
    color: '#fff', 
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default FeedsScreen;
