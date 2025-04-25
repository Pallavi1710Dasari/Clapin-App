import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/constantStyles';

const ProfileActionButton = ({ title, primary, onPress, icon }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        primary ? styles.primaryButton : styles.secondaryButton
      ]}
      onPress={onPress}
    >
      <MaterialIcons 
        name={icon} 
        size={16} 
        color={primary ? '#000' : '#fff'} 
        style={styles.buttonIcon}
      />
      <Text 
        style={[
          styles.buttonText,
          primary ? styles.primaryButtonText : styles.secondaryButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: Colors.input,
    borderWidth: 1,
    // borderColor: Colors.borderColor,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#000',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  buttonIcon: {
    marginRight: 6,
  }
});

export default ProfileActionButton;