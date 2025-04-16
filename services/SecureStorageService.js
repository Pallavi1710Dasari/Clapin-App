/**
 * Secure Storage Service
 * Provides encrypted storage for sensitive auth data
 * using react-native-encrypted-storage
 */
import EncryptedStorage from 'react-native-encrypted-storage';

// Storage keys
const KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  ID_TOKEN: 'auth_id_token',
  USER_DATA: 'auth_user_data',
};

/**
 * Save authentication tokens to secure storage
 * @param {Object} tokens - Authentication tokens from sign-in response
 * @param {string} tokens.access_token - JWT access token
 * @param {string} tokens.refresh_token - JWT refresh token
 * @param {string} tokens.id_token - JWT ID token
 */
export const saveTokens = async (tokens) => {
  try {
    // Store each token separately
    await EncryptedStorage.setItem(
      KEYS.ACCESS_TOKEN, 
      tokens.access_token
    );
    
    await EncryptedStorage.setItem(
      KEYS.REFRESH_TOKEN, 
      tokens.refresh_token
    );
    
    await EncryptedStorage.setItem(
      KEYS.ID_TOKEN, 
      tokens.id_token
    );
    
    console.log('Tokens securely stored', tokens);
  } catch (error) {
    console.error('Error storing tokens securely:', error);
    throw error;
  }
};

/**
 * Save user data to secure storage
 * @param {Object} userData - User data
 */
export const saveUserData = async (userData) => {
  try {
    await EncryptedStorage.setItem(
      KEYS.USER_DATA, 
      JSON.stringify(userData)
    );
    console.log('User data securely stored');
  } catch (error) {
    console.error('Error storing user data securely:', error);
    throw error;
  }
};

/**
 * Get access token from secure storage
 * @returns {Promise<string>} Access token
 */
export const getAccessToken = async () => {
  try {
    return await EncryptedStorage.getItem(KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

/**
 * Get refresh token from secure storage
 * @returns {Promise<string>} Refresh token
 */
export const getRefreshToken = async () => {
  try {
    return await EncryptedStorage.getItem(KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

/**
 * Get ID token from secure storage
 * @returns {Promise<string>} ID token
 */
export const getIdToken = async () => {
  try {
    return await EncryptedStorage.getItem(KEYS.ID_TOKEN);
  } catch (error) {
    console.error('Error retrieving ID token:', error);
    return null;
  }
};

/**
 * Get user data from secure storage
 * @returns {Promise<Object>} User data
 */
export const getUserData = async () => {
  try {
    const userData = await EncryptedStorage.getItem(KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Check if user is logged in
 * @returns {Promise<boolean>} True if user is logged in
 */
export const isLoggedIn = async () => {
  try {
    const accessToken = await getAccessToken();
    return !!accessToken;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

/**
 * Clear all auth data (logout)
 */
export const clearAuthData = async () => {
  try {
    await EncryptedStorage.removeItem(KEYS.ACCESS_TOKEN);
    await EncryptedStorage.removeItem(KEYS.REFRESH_TOKEN);
    await EncryptedStorage.removeItem(KEYS.ID_TOKEN);
    await EncryptedStorage.removeItem(KEYS.USER_DATA);
    console.log('Auth data securely cleared');
  } catch (error) {
    console.error('Error clearing secure auth data:', error);
    throw error;
  }
};

export default {
  saveTokens,
  saveUserData,
  getAccessToken,
  getRefreshToken,
  getIdToken,
  getUserData,
  isLoggedIn,
  clearAuthData
};