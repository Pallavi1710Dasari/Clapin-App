import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Alert
} from 'react-native';
import { Colors } from '../../../constants/constantStyles'; 
import { useAuth } from '../../../context/AuthContext'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChangePasswordModal from './ChangePasswordModal'; 
import styles from '../../../styles/ProfileStyles';

const ProfileScreen = () => {
  const { signOut, userData } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  
  // Default profile data
  const name = userData?.name || 'John Doe';
  const role = 'Actor/Filmmaker';
  const location = 'Mumbai, India';
  
  const handleSignOut = async () => {
    console.log("signOut button clicked");
    const result = await signOut();
    if (!result.success) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };
  
  const handleOpenModal = () => {
    console.log("Opening change password modal");
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log("Closing change password modal");
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileRole}>{role}</Text>
          <Text style={styles.profileLocation}>{location}</Text>
        </View>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>143</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Profile</Text>
          </View>
        </View>
        
        {/* About */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>
            Passionate filmmaker with experience in directing short films and documentaries. 
            Looking to collaborate on meaningful projects.
          </Text>
        </View>
        
        {/* Account Actions */}
        <View style={styles.accountActions}>
          <TouchableOpacity 
            style={styles.changePasswordButton} 
            onPress={handleOpenModal}
          >
            <Ionicons name="key-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={18} color={Colors.primary} />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Include the ChangePasswordModal component */}
      <ChangePasswordModal 
        visible={modalVisible} 
        onClose={handleCloseModal} 
      />
    </View>
  );
};

export default ProfileScreen;