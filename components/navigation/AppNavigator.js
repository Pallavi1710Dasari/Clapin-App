import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EntryScreen from '../screens/EntryScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SignUpPageOne from '../screens/SignUpScreen/SignUpPageOne';
import SignUpPageTwo from '../screens/SignUpScreen/SignUpPageTwo';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Entry" component={EntryScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUpPageOne" component={SignUpPageOne} />
      <Stack.Screen name="SignUpPageTwo" component={SignUpPageTwo} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AppNavigator;