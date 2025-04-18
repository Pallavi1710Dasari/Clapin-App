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
          console.log("Sign-in successful, response:", response.data.data.AuthenticationResult);
          // Extract tokens from the response
          const authResult = response.data.data.AuthenticationResult;
          const access_token = authResult.AccessToken;
          const id_token = authResult.IdToken;
          const refresh_token = authResult.RefreshToken;
          
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
          console.log("error signIn wrong pw", response.data.error)
          return { 
            success: false, 
            error: response.data.error || 'Authentication failed'
          };
        }
      } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: 'Network error' };
      } finally {
        setIsLoading(false);
      }
    },
    
    signOut: async () => {
      setIsLoading(true);
      try {
       // Clear storage first before updating state
       await SecureStorageService.clearAuthData();
        
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