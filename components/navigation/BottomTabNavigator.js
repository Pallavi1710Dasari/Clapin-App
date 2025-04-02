import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedsScreen from '../screens/FeedsScreen';
import PostsScreen from '../screens/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
<<<<<<< HEAD
import ConnectionsScreen from '../screens/ConnectionsScreen';
import Colors from '../../constants/colors';
=======

>>>>>>> c03d9ac (initial commit)

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feeds') {
<<<<<<< HEAD
            iconName = 'home-outline';
          } else if (route.name === 'Posts') {
            iconName = 'create';
          } 
          else if (route.name === 'Connections') {
            iconName = 'person';
          }
          else if (route.name === 'Profile') {
=======
            iconName = 'home';
          } else if (route.name === 'Posts') {
            iconName = 'create';
          } else if (route.name === 'Profile') {
>>>>>>> c03d9ac (initial commit)
            iconName = 'person';
          }
          
          return <Ionicons name={iconName} color={color} size={size} />;

        },
<<<<<<< HEAD
        tabBarActiveTintColor: Colors.primary, 
=======
        tabBarActiveTintColor: '#FFD700', 
>>>>>>> c03d9ac (initial commit)
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: { backgroundColor: '#000' } 
      })}
    >
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
<<<<<<< HEAD
      <Tab.Screen name="Connections" component={ConnectionsScreen} />
=======
>>>>>>> c03d9ac (initial commit)
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
