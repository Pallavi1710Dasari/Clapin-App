import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../constants/constantStyles';

const PasswordInput = ({ value, onChangeText, showPassword, toggleShowPassword, error }) => {
  return (
    <>
      <View style={styles.inputWrapper}>
        <Entypo 
          name="lock" 
          size={20} 
          color={Colors.placeholderTextColorSecondary} 
          style={styles.inputIcon} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor={Colors.placeholderTextColorSecondary}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={toggleShowPassword}
        >
          <Entypo
            name={showPassword ? 'eye-with-line' : 'eye'}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
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
    borderColor: Colors.borderColor,
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
  eyeIcon: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default PasswordInput;