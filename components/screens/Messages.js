import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from '../../constants/constantStyles';

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Messages</Text>
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

export default MessagesScreen;
