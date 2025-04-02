import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedsScreen from '../screens/FeedsScreen';
import PostsScreen from '../screens/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feeds') {
            iconName = 'home';
          } else if (route.name === 'Posts') {
            iconName = 'create';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          
          return <Ionicons name={iconName} color={color} size={size} />;

        },
        tabBarActiveTintColor: '#FFD700', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: { backgroundColor: '#000' } 
      })}
    >
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
