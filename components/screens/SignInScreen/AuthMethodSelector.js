import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';

const AuthMethodSelector = ({ options, onSelect, disabled }) => {
  return (
    <View style={styles.methodSelector}>
      {options.map((method) => (
        <TouchableOpacity 
          key={method.type}
          style={[
            styles.methodButton, 
            method.selected && styles.activeMethodButton
          ]}
          onPress={() => onSelect(method.type)}
          disabled={disabled}
        >
          <Text style={[
            styles.methodButtonText, 
            method.selected && styles.activeMethodButtonText
          ]}>
            {method.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  methodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(77, 75, 75, 0.3)',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    padding: 5,
  },
  methodButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  activeMethodButton: {
    backgroundColor: "rgba(245, 216, 54, 0.75)",
  },
  methodButtonText: {
    color: Colors.text,
    fontSize: 16,
    opacity: 0.7,
  },
  activeMethodButtonText: {
    color: Colors.textBlack,
    fontWeight: 'bold',
    opacity: 1,
  },
});

export default AuthMethodSelector;