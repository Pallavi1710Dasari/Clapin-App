import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';  
import { Colors } from '../../../constants/constantStyles';

const ProfilePostTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'posts' && styles.activeTabButton
        ]}
        onPress={() => setActiveTab('posts')}
      >
        <Entypo 
          name="grid" 
          size={26} 
          color={activeTab === 'posts' ? Colors.primary : Colors.placeholderTextColorPrimary} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'reels' && styles.activeTabButton
        ]}
        onPress={() => setActiveTab('reels')}
      >
        <Entypo 
          name="folder-video" 
          size={24} 
          color={activeTab === 'reels' ? Colors.primary : Colors.placeholderTextColorPrimary} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'saved' && styles.activeTabButton
        ]}
        onPress={() => setActiveTab('saved')}
      >
        <Entypo 
          name="bookmark" 
          size={24} 
          color={activeTab === 'saved' ? Colors.primary : Colors.placeholderTextColorPrimary} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
    marginBottom: 2,
  },
  tabButton: {
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
});

export default ProfilePostTabs;