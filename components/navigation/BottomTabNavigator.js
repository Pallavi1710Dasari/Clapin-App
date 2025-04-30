import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedsScreen from '../screens/FeedsScreen/FeedsScreen';
import PostsScreen from '../screens/PostsScreen/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen/ConnectionsScreen';
import JobsScreen from '../screens/JobsScreen/JobsScreen';
import { Colors } from '../../constants/constantStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchScreen from '../screens/SearchScreen';

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
            iconName = 'plussquareo';
          } else if (route.name === 'Jobs') {
            iconName = 'folder1';  // LinkedIn-style briefcase icon
          } else if (route.name === 'Connections') {
            iconName = 'adduser';
          } else if (route.name === 'Search') {
            iconName = 'search1';
          }
          
          return <AntDesign name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: Colors.primary, 
        tabBarInactiveTintColor: Colors.placeholderTextColorPrimary, 
        tabBarStyle: { backgroundColor: '#000' } 
      })}
    >
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="Connections" component={ConnectionsScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;