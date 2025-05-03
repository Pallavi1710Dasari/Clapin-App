import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EntryScreen from '../screens/EntryScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SignUpPageOne from '../screens/SignUpScreen/SignUpPageOne';
import SignUpPageTwo from '../screens/SignUpScreen/SignUpPageTwo';
import ForgotPassword from '../screens/ForgotPassword';
import ChangePasswordScreen from '../screens/ProfileScreen/ChangePasswordScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import AccountSettingsScreen from '../screens/ProfileScreen/AccountSettingsScreen';
import ConfirmationScreen from '../screens/SignUpScreen/ConfirmationScreen';
import { useAuth } from '../../context/AuthContext';

// Job-related screens
import CreateJobStep1Screen from '../screens/JobsScreen/createJobsScreen/CreateJobStep1Screen';
import CreateJobStep2Screen from '../screens/JobsScreen/createJobsScreen/CreateJobStep2Screen';
import CreateJobStep3Screen from '../screens/JobsScreen/createJobsScreen/CreateJobStep3Screen';
import JobDetailsScreen from '../screens/JobsScreen/JobDetailsScreen';
import JobApplicationsScreen from '../screens/JobsScreen/JobApplicationsScreen';
import ApplicationDetailsScreen from '../screens/JobsScreen/ApplicationDetailsScreen';
import EditJobScreen from '../screens/JobsScreen/EditJobScreen';
import ApplyConfirmationScreen from '../screens/JobsScreen/ApplyConfirmationScreen';
import AppliedJobsScreen from '../screens/JobsScreen/AppliedJobsScreen';
import CreatedJobsScreen from '../screens/JobsScreen/CreatedJobsScreen';
import ReelDetailScreen from '../screens/FeedsScreen/ReelDetailScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import MessagesScreen from '../screens/Messages';
import NotificationsScreen from '../screens/Notifications';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const MainStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Entry" component={EntryScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUpPageOne" component={SignUpPageOne} />
    <AuthStack.Screen name="SignUpPageTwo" component={SignUpPageTwo} />
    <AuthStack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </AuthStack.Navigator>
);

// Main Navigation Stack with Bottom Tab and all modal screens
const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    {/* BottomTabNavigator as the main screen */}
    <MainStack.Screen name="BottomTabs" component={BottomTabNavigator} />
    <MainStack.Screen name="Messages" component={MessagesScreen} />
    <MainStack.Screen name="Notifications" component={NotificationsScreen} />
    
    {/* Profile-related screens */}
    <MainStack.Screen name="Profile" component={ProfileScreen} />
    <MainStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
    <MainStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    
    {/* Job-related screens */}
       {/* Multi-step job creation screens */}
    <MainStack.Screen name="CreateJobStep1" component={CreateJobStep1Screen} />
    <MainStack.Screen name="CreateJobStep2" component={CreateJobStep2Screen} />
    <MainStack.Screen name="CreateJobStep3" component={CreateJobStep3Screen} />

    <MainStack.Screen name="AppliedJobs" component={AppliedJobsScreen} />
    <MainStack.Screen name="CreatedJobs" component={CreatedJobsScreen} />

    <MainStack.Screen name="JobDetails" component={JobDetailsScreen} />
    <MainStack.Screen name="JobApplications" component={JobApplicationsScreen} />
    <MainStack.Screen name="ApplicationDetails" component={ApplicationDetailsScreen} />
    <MainStack.Screen name="EditJob" component={EditJobScreen} />
    <MainStack.Screen name="ApplyConfirmation" component={ApplyConfirmationScreen} />

    <MainStack.Screen name="ReelDetail" component={ReelDetailScreen} />
  </MainStack.Navigator>
);

// App Stack (logged-in state)
const AppStackScreen = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Main" component={MainStackScreen} />
  </AppStack.Navigator>
);

const AppNavigator = () => {
  const { isLoading, userToken } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5D836" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="App" component={AppStackScreen} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default AppNavigator;