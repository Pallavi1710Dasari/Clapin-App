/**
 * Authentication Service
 * Handles all API calls related to authentication
 */

const API_BASE_URL = 'https://cd6d0vje32.execute-api.ap-south-1.amazonaws.com/prod';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.phone_number - Phone number
 * @param {string} userData.password - Password
 * @param {string} userData.user_type - User type (CREATOR, PRODUCTION, TALENT_SCOUT)
 * @returns {Promise} - API response
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return {
      data: await response.json(),
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
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
    const response = await fetch(`${API_BASE_URL}/auth/signup/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(confirmData),
    });

    return {
      data: await response.json(),
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    console.error('Confirmation error:', error);
    throw error;
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
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetData),
    });

    return {
      data: await response.json(),
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error;
  }
};

// Export all auth services
export default {
  registerUser,
  confirmRegistration,
  requestPasswordReset
};