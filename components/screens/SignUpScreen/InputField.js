import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/constantStyles';

const InputField = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  showEye = false,
  eyeValue = false,
  onEyePress,
  error
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <MaterialIcons name={iconName} size={20} color={Colors.placeholderTextColorSecondary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderTextColorSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {showEye && (
          <TouchableOpacity onPress={onEyePress} style={styles.eyeIcon}>
            <Entypo
              name={eyeValue ? 'eye-with-line' : 'eye'}
              size={20}
              color={Colors.placeholderTextColorSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
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
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  }
});

export default InputField;