import React, { createContext, useState, useEffect, useContext } from 'react';
import SecureStorageService from '../services/SecureStorageService';
import { AuthService } from '../services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Check if the user is logged in when the app starts
  useEffect(() => {
    // Load token and user data from storage
    const bootstrapAsync = async () => {
      try {
        const token = await SecureStorageService.getAccessToken();
        const userDataFromStorage = await SecureStorageService.getUserData();
        
        if (token) {
          setUserToken(token);
          setUserData(userDataFromStorage);
        }
      } catch (e) {
        console.log('Failed to load user token or data', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Auth functions
  const authContext = {
    isLoading,
    userToken,
    userData,
    
    signIn: async (loginData) => {
      setIsLoading(true);
      try {
        const response = await AuthService.signIn(loginData);
        
        if (response.ok) {
          console.log("Sign-in successful, response:", response.data.data);
          // Extract tokens from the response
          const authResult = response.data.data;
          console.log("AccessToken", authResult.access_token)
          const access_token = authResult.access_token;
          const id_token = authResult.id_token;
          const refresh_token = authResult.refresh_token;
          
          // Store tokens securely
          await SecureStorageService.saveTokens({
            access_token,
            id_token,
            refresh_token
          });
          
          // Update state
          console.log("Tokens stored, setting userToken state");
          setUserToken(access_token);
          
          return { success: true };
        } else {
          console.log("error signIn", response.data);
      
          // Extract specific error types from the response
          let errorMessage = response.data?.error || 'Authentication failed';
          
          if (response.data && response.data.error) {
            errorType = response.data.error;
          } else if (response.status === 401) {
            errorType = 'NotAuthorizedException';
          }
          
          return { 
            success: false, 
            error: errorMessage
          };
        }
      } catch (error) {
        console.error('Sign in network error:', error);
        if (error.response) {
          // The API responded with an error code
          const status = error.response.status;
          const errorData = error.response.data || {};
          
          // Extract the error message based on known error patterns
          let errorMessage = errorData.error || 'Authentication failed';
          
          if (status === 401) {
            errorMessage = 'NotAuthorizedException';
          } else if (errorData.message && errorData.message.includes('not exist')) {
            errorMessage = 'UserNotFoundException';
          }
          
          return {
            success: false,
            error: errorMessage
          };
        }
          // If there's no response, it's likely a network error
          return { 
            success: false, 
            error: 'Network error' 
          }; 
      } finally {
        setIsLoading(false);
      }
    },
    
    signOut: async () => {
      setIsLoading(true);
      try {

        const signOutResponse = await AuthService.signOut();
        
        console.log("Sign out API response:", signOutResponse);
        
        // Whether the API call succeeds or fails, we should clear local storage
        await SecureStorageService.clearAuthData();
        console.log("Auth data cleared from secure storage");
       // Update state after storage is cleared
       setUserToken(null);
       setUserData(null);
       
       return { success: true };
      } catch (e) {
        console.error('Sign out error:', e);
        return { success: false, error: e.message };
      } finally {
        // This is the key fix: set isLoading back to false when done
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};