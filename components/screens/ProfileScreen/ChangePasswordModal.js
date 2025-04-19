// ChangePasswordModal.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { Colors } from '../../../constants/constantStyles';
import SecureStorageService from '../../../services/SecureStorageService';
import { AuthService } from '../../../services';
import styles from '../../../styles/ProfileStyles';

const ChangePasswordModal = ({ visible, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    
    setLoading(true);
    try {
      // Get access token from secure storage
      const accessToken = await SecureStorageService.getAccessToken();
      if (!accessToken) {
        Alert.alert('Error', 'You are not logged in. Please log in again.');
        onClose();
        return;
      }
      
      console.log("Attempting to change password with token:", accessToken);
      
      
      // Call the change password API
      const response = await AuthService.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        access_token: accessToken
      });
      console.log("change password response", response);
      
      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
        // Reset fields and close modal
        setOldPassword('');
        setNewPassword('');
        onClose();
      } else {
        const errorMsg = response.data?.error || response.data?.message || 'Failed to change password';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* Old Password */}
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Current Password"
              placeholderTextColor="#888"
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowOldPassword(!showOldPassword)}
            >
              <Ionicons
                name={showOldPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          
          {/* New Password */}
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons
                name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.updatePasswordButton, loading && styles.disabledButton]} 
            onPress={handleChangePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={styles.updatePasswordText}>Update Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;