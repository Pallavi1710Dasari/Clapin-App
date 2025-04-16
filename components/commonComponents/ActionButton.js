import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../constants/constantStyles';

const ActionButton = ({ title, onPress, disabled, loading }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.textBlack} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: 'rgba(255,215,0,0.5)',
  },
  buttonText: {
    color: Colors.textBlack,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ActionButton;