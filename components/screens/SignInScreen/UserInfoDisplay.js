import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';

const UserInfoDisplay = ({ label, value, onEdit }) => {
  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.userInfoLabel}>{label}</Text>
      <Text style={styles.userInfoValue}>{value}</Text>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  userInfoLabel: {
    color: Colors.text,
    fontSize: 14,
    opacity: 0.7,
    marginRight: 8,
  },
  userInfoValue: {
    flex: 1,
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    color: Colors.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default UserInfoDisplay;