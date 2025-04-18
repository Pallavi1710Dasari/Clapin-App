/**
 * Jobs Service
 * Handles all API calls related to jobs with auth tokens
 */
import axios from 'axios';
import SecureStorageService from './SecureStorageService';

const API_BASE_URL = 'https://cd6d0vje32.execute-api.ap-south-1.amazonaws.com/prod';

// Helper function to get auth headers
const getAuthHeaders = async () => {
  const token = await SecureStorageService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Get all jobs posted by the current user
 * @param {Object} options - Query options
 * @param {number} options.limit - Max number of items to return
 * @param {string} options.lastEvaluatedKey - Key for pagination
 * @returns {Promise} - API response
 */
export const getMyJobs = async (options = {}) => {
  try {
    // Build query params
    let queryParams = '';
    if (options.limit) {
      queryParams += `limit=${options.limit}`;
    }
    if (options.lastEvaluatedKey) {
      queryParams += `${queryParams ? '&' : ''}last_evaluated_key=${encodeURIComponent(options.lastEvaluatedKey)}`;
    }
    
    const url = `/jobs/my-jobs${queryParams ? `?${queryParams}` : ''}`;
    const headers = await getAuthHeaders();
    
    const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
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
 * Get a specific job by ID
 * @param {string} jobId - ID of the job
 * @returns {Promise} - API response
 */
export const getJob = async (jobId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`, { headers });
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error(`Error fetching job ${jobId}:`, error);
    
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
 * Create a new job
 * @param {Object} jobData - Job data to create
 * @returns {Promise} - API response
 */
export const createJob = async (jobData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post(`${API_BASE_URL}/jobs/`, jobData, { headers });
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error('Error creating job:', error);
    
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
 * Update an existing job
 * @param {string} jobId - ID of the job to update
 * @param {Object} jobData - Updated job data
 * @returns {Promise} - API response
 */
export const updateJob = async (jobId, jobData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.put(`${API_BASE_URL}/jobs/${jobId}`, jobData, { headers });
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    console.error(`Error updating job ${jobId}:`, error);
    
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
  getMyJobs,
  getJob,
  createJob,
  updateJob
};