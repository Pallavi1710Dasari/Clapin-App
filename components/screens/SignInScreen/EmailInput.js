import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/constantStyles';

const EmailInput = ({ value, onChangeText, error }) => {
  return (
    <>
      <View style={styles.inputWrapper}>
        <MaterialIcons 
          name="mail-outline" 
          size={20} 
          color={Colors.placeholderTextColorSecondary} 
          style={styles.inputIcon} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email or Username" 
          placeholderTextColor={Colors.placeholderTextColorSecondary}
          keyboardType="email-address"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.input,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.textGray,
    marginBottom: 15,
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: Colors.text,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default EmailInput;