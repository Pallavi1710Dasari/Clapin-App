import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EntryScreen from '../screens/EntryScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SignUpPageOne from '../screens/SignUpScreen/SignUpPageOne';
import SignUpPageTwo from '../screens/SignUpScreen/SignUpPageTwo';
import ForgotPassword from '../screens/ForgotPassword';
import { useAuth } from '../../context/AuthContext';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Entry" component={EntryScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUpPageOne" component={SignUpPageOne} />
    <AuthStack.Screen name="SignUpPageTwo" component={SignUpPageTwo} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </AuthStack.Navigator>

);

// Separate stack for app screens
const AppStackScreen = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={BottomTabNavigator} />
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