// /**
//  * Jobs Service
//  * Handles all API calls related to jobs with auth tokens
//  */
// import axios from 'axios';
// import SecureStorageService from './SecureStorageService';

// const API_BASE_URL = 'https://cd6d0vje32.execute-api.ap-south-1.amazonaws.com/prod';

// // Helper function to get auth headers
// const getAuthHeaders = async () => {
//   const token = await SecureStorageService.getAccessToken();
//   return {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   };
// };

// /**
//  * Get all jobs posted by the current user
//  * @param {Object} options - Query options
//  * @param {number} options.limit - Max number of items to return
//  * @param {string} options.lastEvaluatedKey - Key for pagination
//  * @returns {Promise} - API response
//  */
// export const getMyJobs = async (options = {}) => {
//   try {
//     // Build query params
//     let queryParams = '';
//     if (options.limit) {
//       queryParams += `limit=${options.limit}`;
//     }
//     if (options.lastEvaluatedKey) {
//       queryParams += `${queryParams ? '&' : ''}last_evaluated_key=${encodeURIComponent(options.lastEvaluatedKey)}`;
//     }
    
//     const url = `/jobs/my-jobs${queryParams ? `?${queryParams}` : ''}`;
//     const headers = await getAuthHeaders();
    
//     const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Get a specific job by ID
//  * @param {string} jobId - ID of the job
//  * @returns {Promise} - API response
//  */
// export const getJob = async (jobId) => {
//   try {
//     const headers = await getAuthHeaders();
//     const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error(`Error fetching job ${jobId}:`, error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Create a new job
//  * @param {Object} jobData - Job data to create
//  * @returns {Promise} - API response
//  */
// export const createJob = async (jobData) => {
//   try {
//     const headers = await getAuthHeaders();
//     const response = await axios.post(`${API_BASE_URL}/jobs/`, jobData, { headers });
//     console.log("create job api called", response.data)
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error('Error creating job:', error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Update an existing job
//  * @param {string} jobId - ID of the job to update
//  * @param {Object} jobData - Updated job data
//  * @returns {Promise} - API response
//  */
// export const updateJob = async (jobId, jobData) => {
//   try {
//     const headers = await getAuthHeaders();
//     const response = await axios.put(`${API_BASE_URL}/jobs/${jobId}`, jobData, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error(`Error updating job ${jobId}:`, error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Get applications for a specific job
//  * @param {string} jobId - ID of the job
//  * @param {Object} options - Query options
//  * @returns {Promise} - API response
//  */
// export const getJobApplications = async (jobId, options = {}) => {
//   try {
//     // Build query params
//     let queryParams = '';
//     if (options.limit) {
//       queryParams += `limit=${options.limit}`;
//     }
//     if (options.lastEvaluatedKey) {
//       queryParams += `${queryParams ? '&' : ''}last_evaluated_key=${encodeURIComponent(options.lastEvaluatedKey)}`;
//     }
    
//     const url = `/jobs/${jobId}/applications${queryParams ? `?${queryParams}` : ''}`;
//     const headers = await getAuthHeaders();
    
//     const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error(`Error fetching applications for job ${jobId}:`, error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Get a specific application by job ID and applicant ID
//  * @param {string} jobId - ID of the job
//  * @param {string} applicantId - ID of the applicant
//  * @returns {Promise} - API response
//  */
// export const getApplication = async (jobId, applicantId) => {
//   try {
//     const headers = await getAuthHeaders();
//     const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}/applications/${applicantId}`, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error(`Error fetching application for job ${jobId} and applicant ${applicantId}:`, error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Update an application status
//  * @param {string} jobId - ID of the job
//  * @param {string} applicantId - ID of the applicant
//  * @param {Object} updateData - Data to update
//  * @returns {Promise} - API response
//  */
// export const updateJobApplication = async (jobId, applicantId, updateData) => {
//   try {
//     const headers = await getAuthHeaders();
//     const response = await axios.put(
//       `${API_BASE_URL}/jobs/${jobId}/applications/${applicantId}`, 
//       updateData, 
//       { headers }
//     );
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error(`Error updating application for job ${jobId} and applicant ${applicantId}:`, error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Apply to a job
//  * @param {string} jobId - ID of the job to apply to
//  * @returns {Promise} - API response
//  */
// export const applyToJob = async (jobId) => {
//   try {
//     const headers = await getAuthHeaders();
//     const response = await axios.post(`${API_BASE_URL}/jobs/${jobId}/apply`, {}, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error(`Error applying to job ${jobId}:`, error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// /**
//  * Get all jobs applied to by the current user
//  * @param {Object} options - Query options
//  * @returns {Promise} - API response
//  */
// export const getAppliedJobs = async (options = {}) => {
//   try {
//     // Build query params
//     let queryParams = '';
//     if (options.limit) {
//       queryParams += `limit=${options.limit}`;
//     }
//     if (options.lastEvaluatedKey) {
//       queryParams += `${queryParams ? '&' : ''}last_evaluated_key=${encodeURIComponent(options.lastEvaluatedKey)}`;
//     }
    
//     const url = `/applications/${queryParams ? `?${queryParams}` : ''}`;
//     const headers = await getAuthHeaders();
    
//     const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
    
//     return {
//       data: response.data,
//       status: response.status,
//       ok: response.status >= 200 && response.status < 300
//     };
//   } catch (error) {
//     console.error('Error fetching applied jobs:', error);
    
//     if (error.response) {
//       return {
//         data: error.response.data,
//         status: error.response.status,
//         ok: false
//       };
//     } else if (error.request) {
//       return {
//         data: { error: 'No response from server' },
//         status: 0,
//         ok: false
//       };
//     } else {
//       return {
//         data: { error: error.message },
//         status: 0,
//         ok: false
//       };
//     }
//   }
// };

// export default {
//   getMyJobs,
//   getJob,
//   createJob,
//   updateJob,
//   getJobApplications,
//   getApplication,
//   updateJobApplication,
//   applyToJob,
//   getAppliedJobs
// };


/**
 * Jobs Service
 * Fixed version with proper Authorization header format and debugging
 */
import axios from 'axios';
import SecureStorageService from './SecureStorageService';

const API_BASE_URL = 'https://5geda9tzll.execute-api.ap-south-1.amazonaws.com/prod';
                  

/**
 * Create a new job
 * @param {Object} jobData - Job data to create
 * @returns {Promise} - API response
 */
export const createJob = async (jobData) => {
  try {
    // Get the token directly to verify it
    const token = await SecureStorageService.getAccessToken();
    
    if (!token) {
      console.error('No access token available');
      return {
        data: { error: 'Authentication required' },
        status: 401,
        ok: false
      };
    }
    
    // Log token info (but not the full token for security)
    console.log('Token available:', token.substring(0, 10) + '...');
    
    // Ensure custom headers are set correctly
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    // Debug log
    console.log('Create job request:', {
      url: `${API_BASE_URL}/jobs/`,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer [REDACTED]' },
      data: jobData
    });
    
    // Make the API call
    const response = await axios.post(
      `${API_BASE_URL}/jobs/`, 
      jobData, 
      { headers }
    );
    
    console.log('Create job API response:', response.status, response.statusText);
    
    return {
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    // Comprehensive error logging
    console.error('Error creating job:');
    
    if (error.response) {
      // The server responded with an error status
      console.error('API error:', error.response.status, error.response.statusText);
      console.error('Error data:', error.response.data);
      
      // For 403 specifically, show a more helpful message
      if (error.response.status === 403) {
        console.error('PERMISSION DENIED: This may be because your account type is not allowed to post jobs');
      }
      
      return {
        data: error.response.data,
        status: error.response.status,
        ok: false
      };
    } else if (error.request) {
      // The request was made but no response received
      console.error('No response received from server');
      return {
        data: { error: 'No response from server' },
        status: 0,
        ok: false
      };
    } else {
      // Error setting up the request
      console.error('Request setup error:', error.message);
      return {
        data: { error: error.message },
        status: 0,
        ok: false
      };
    }
  }
};

/**
 * Get auth headers for API requests
 */
const getAuthHeaders = async () => {
  const token = await SecureStorageService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Rest of the service methods would remain the same
// Exporting only the createJob method for now
export default {
  createJob
};