import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../constants/constantStyles';

const PasswordInputField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  error 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={[
        styles.inputWrapper,
        error ? styles.inputWrapperError : null
      ]}>
        <Entypo 
          name="lock" 
          size={20} 
          color={Colors.placeholderTextColorSecondary} 
          style={styles.inputIcon} 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder={placeholder}
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Entypo
            name={showPassword ? 'eye-with-line' : 'eye'}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: Colors.placeholderTextColorPrimary,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputWrapperError: {
    borderColor: '#FF6B6B',
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default PasswordInputField;