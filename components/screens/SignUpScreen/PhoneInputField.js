import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';
import CountryCodePicker from './CountryCodePicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PhoneInputField = ({
  value,
  onChangeText,
  error,
  countryCode,
  onSelectCountryCode
}) => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer, 
        error ? styles.inputError : null
      ]}>
        <MaterialIcons 
          name="call" 
          size={20} 
          color={Colors.placeholderTextColorSecondary} 
          style={styles.inputIcon} 
        />
        
        {/* Country Code Picker */}
        <CountryCodePicker 
          selectedCode={countryCode} 
          onSelectCode={onSelectCountryCode} 
        />
        
        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={Colors.placeholderTextColorSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
        />
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    backgroundColor: Colors.input,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.textGray,
    marginBottom: 15,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.text,
    paddingLeft: 10,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  }
});

export default PhoneInputField;