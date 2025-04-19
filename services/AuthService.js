/**
 * Authentication Service
 * Handles all API calls related to authentication
 */
import axios from 'axios';
import SecureStorageService from './SecureStorageService';

const API_BASE_URL = 'https://cd6d0vje32.execute-api.ap-south-1.amazonaws.com/prod';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});



/**
 * Check if an attribute (username, email, phone) is available
 * @param {Object} attributeData - Attribute data
 * @param {string} attributeData.attribute_name - Name of attribute (username, email, phone_number)
 * @param {string} attributeData.attribute_value - Value to check
 * @returns {Promise} - API response
 */
export const checkAttributeAvailability = async (attributeData) => {
  try {
    const response = await api.post('/auth/check-attribute', attributeData);
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Attribute check error:', error);
    
    // Handle axios error response
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.phone_number - Phone number
 * @param {string} userData.password - Password
 * @param {string} userData.user_type - User type (Individual, Company)
 * @returns {Promise} - API response
 */
 export const registerUser = async (userData) => {
  console.log("signUp auth called", userData)
  try {
    const response = await api.post('/auth/signup', userData);
    console.log("signUp response", userData)
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle axios error response
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Confirm user registration with code
 * @param {Object} confirmData - Confirmation data
 * @param {string} confirmData.username - Username
 * @param {string} confirmData.confirmation_code - Confirmation code
 * @returns {Promise} - API response
 */
export const confirmRegistration = async (confirmData) => {
  try {
    const response = await api.post('/auth/signup/confirm', confirmData);
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Confirmation error:', error);
    
    // Handle axios error response
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Sign in a user
 * @param {Object} signInData - Sign in data
 * @param {string} signInData.attribute_name - Attribute used for signing in (username, email, phone_number)
 * @param {string} signInData.attribute_value - Value of the attribute
 * @param {string} signInData.password - User's password
 * @returns {Promise} - API response with tokens
 */
export const signIn = async (signInData) => {
  try {

    console.log('Making signin API call with:', signInData);
    const response = await api.post('/auth/signin', signInData);
    console.log('Signin API response:', response);
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
    
  } catch (error) {
    // console.error('Sign in error pallavi:', error.response ? error.response.data.error : 'No response data');
    
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } 
    else {
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Resend OTP for verification
 * @param {Object} resendData - Data for resending OTP
 * @param {string} resendData.attribute_name - Attribute name (username, email, phone_number)
 * @param {string} resendData.attribute_value - Attribute value
 * @returns {Promise} - API response
 */
export const resendOTP = async (resendData) => {
  try {
    const response = await api.post('/auth/signup/send-otp', resendData);
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Resend OTP error:', error);
    
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Sign out a user
 * @returns {Promise} - API response
 */
export const signOut = async () => {
  try {
    // Get the token from secure storage
    const token = await SecureStorageService.getAccessToken();
    
    if (!token) {
      // If no token, just return success (user was already signed out)
      return {
        data: { message: "Already signed out" },
        status: 200,
        ok: true
      };
    }
    
    // Add the token to the headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    const response = await api.post('/auth/sign-out', {}, { headers });
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Sign out error:', error);
    
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      return {
        data: { error: error.message },
        status: 0, 
        ok: false
      };
    }
  }
};


/**
 * Change user password
 * @param {Object} data - Password change data
 * @param {string} data.old_password - Current password
 * @param {string} data.new_password - New password
 * @param {string} data.access_token - Access token
 * @returns {Promise} - API response
 */
export const changePassword = async (data) => {
  try {
    const response = await api.post('/auth/change-password', {
      old_password: data.old_password,
      new_password: data.new_password
    }, {
      headers: {
        'Authorization': `Bearer ${data.access_token}`
      }
    });
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Change password error:', error);
    
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else {
      return {
        data: { error: error.message || 'Network error' },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Request password reset
 * @param {Object} resetData - Password reset data
 * @param {string} resetData.username - Username or email
 * @returns {Promise} - API response
 */
export const requestPasswordReset = async (resetData) => {
  try {
    const response = await api.post('/auth/forgot-password', resetData);
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Password reset request error:', error);
    
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

export default {
  checkAttributeAvailability,
  registerUser,
  confirmRegistration,
  signIn,
  signOut,
  requestPasswordReset,
  changePassword,
  resendOTP
};