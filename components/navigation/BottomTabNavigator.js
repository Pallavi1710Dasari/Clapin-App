import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedsScreen from '../screens/FeedsScreen/FeedsScreen';
import PostsScreen from '../screens/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import { Colors } from '../../constants/constantStyles';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feeds') {
            iconName = 'home-outline';
          } else if (route.name === 'Posts') {
            iconName = 'create';
          } 
          else if (route.name === 'Connections') {
            iconName = 'person';
          }
          else if (route.name === 'Profile') {
            iconName = 'person';
          }
          
          return <Ionicons name={iconName} color={color} size={size} />;

        },
        tabBarActiveTintColor: Colors.primary, 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: { backgroundColor: '#000' } 
      })}
    >
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Connections" component={ConnectionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
