// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   Image, 
//   ScrollView, 
//   Alert,
//   Modal,
//   TextInput
// } from 'react-native';
// import { Colors } from '../../constants/constantStyles';
// import { useAuth } from '../../context/AuthContext';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { AuthService } from '../../services';

// const ProfileScreen = () => {
//   const { signOut, userData } = useAuth();
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
  
//   // Default profile information
//   const [profile, setProfile] = useState({
//     name: userData?.name || 'John Doe',
//     role: 'Actor/Filmmaker',
//     location: 'Mumbai, India',
//     connections: 143,
//     projects: 12,
//     bio: 'Passionate filmmaker with experience in directing short films and documentaries. Looking to collaborate on meaningful projects.',
//     skills: ['Acting', 'Directing', 'Screenwriting', 'Cinematography'],
//     experience: [
//       { 
//         title: 'Lead Actor', 
//         production: 'The Last Scene', 
//         year: '2023' 
//       },
//       { 
//         title: 'Assistant Director', 
//         production: 'Eternal Sunshine', 
//         year: '2022' 
//       }
//     ]
//   });
  
//   useEffect(() => {
//     // Update profile with user data when available
//     if (userData) {
//       setProfile(prevProfile => ({
//         ...prevProfile,
//         name: userData.name || prevProfile.name,
//         email: userData.email
//       }));
//     }
//   }, [userData]);

//   const handleSignOut = async () => {
//     console.log("signOut button clicked");
//     const result = await signOut();
//     if (!result.success) {
//       Alert.alert('Error', 'Failed to sign out. Please try again.');
//     }
//   };
  
//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       Alert.alert('Error', 'Please fill in all password fields');
//       return;
//     }
    
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'New passwords do not match');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const accessToken = await AuthService.getAccessToken();
//       const response = await AuthService.changePassword({
//         old_password: oldPassword,
//         new_password: newPassword,
//         access_token: accessToken
//       });
//       console.log("change password", response)
      
//       if (response.ok) {
//         Alert.alert('Success', 'Password changed successfully');
//         setShowPasswordModal(false);
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         Alert.alert('Error', response.data.error || 'Failed to change password');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An error occurred. Please try again.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Profile Header */}
//         <View style={styles.header}>
//           <Text style={styles.screenTitle}>Profile</Text>
//           <View style={styles.settingsContainer}>
//             <TouchableOpacity onPress={() => setShowPasswordModal(true)}>
//               <Ionicons name="key-outline" size={24} color={Colors.primary} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.settingsButton}>
//               <Ionicons name="settings-outline" size={24} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         {/* Profile Info */}
//         <View style={styles.profileSection}>
//           <View style={styles.profileImageContainer}>
//             <Image 
//               source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
//               style={styles.profileImage} 
//             />
//             <TouchableOpacity style={styles.editImageButton}>
//               <Ionicons name="camera" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.profileInfo}>
//             <Text style={styles.profileName}>{profile.name}</Text>
//             <Text style={styles.profileRole}>{profile.role}</Text>
//             <View style={styles.locationContainer}>
//               <Ionicons name="location-outline" size={16} color="#aaa" />
//               <Text style={styles.locationText}>{profile.location}</Text>
//             </View>
//           </View>
//         </View>
        
//         {/* Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>{profile.connections}</Text>
//             <Text style={styles.statLabel}>Connections</Text>
//           </View>
//           <View style={styles.statDivider} />
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>{profile.projects}</Text>
//             <Text style={styles.statLabel}>Projects</Text>
//           </View>
//           <View style={styles.statDivider} />
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>85%</Text>
//             <Text style={styles.statLabel}>Profile</Text>
//           </View>
//         </View>
        
//         {/* Bio */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>About</Text>
//             <TouchableOpacity>
//               <Ionicons name="create-outline" size={20} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.bioText}>{profile.bio}</Text>
//         </View>
        
//         {/* Skills */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Skills</Text>
//             <TouchableOpacity>
//               <Ionicons name="add" size={20} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.skillsContainer}>
//             {profile.skills.map((skill, index) => (
//               <View key={index} style={styles.skillTag}>
//                 <Text style={styles.skillText}>{skill}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
        
//         {/* Experience */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Experience</Text>
//             <TouchableOpacity>
//               <Ionicons name="add" size={20} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//           {profile.experience.map((exp, index) => (
//             <View key={index} style={styles.experienceItem}>
//               <View style={styles.experienceDot} />
//               <View style={styles.experienceContent}>
//                 <Text style={styles.experienceTitle}>{exp.title}</Text>
//                 <Text style={styles.experienceProduction}>{exp.production}</Text>
//                 <Text style={styles.experienceYear}>{exp.year}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
        
//         {/* Account Actions */}
//         <View style={styles.accountActions}>
//           <TouchableOpacity 
//             style={styles.changePasswordButton} 
//             onPress={() => setShowPasswordModal(true)}
//           >
//             <Ionicons name="key-outline" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Change Password</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.signOutButton} 
//             onPress={handleSignOut}
//           >
//             <Ionicons name="log-out-outline" size={18} color={Colors.primary} />
//             <Text style={styles.signOutButtonText}>Sign Out</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
      
//       {/* Change Password Modal */}
//       <Modal
//         visible={showPasswordModal}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Change Password</Text>
//               <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
//                 <Ionicons name="close" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.passwordInputContainer}>
//               <View style={styles.passwordInputWrapper}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="Current Password"
//                   placeholderTextColor="#888"
//                   secureTextEntry={!showOldPassword}
//                   value={oldPassword}
//                   onChangeText={setOldPassword}
//                 />
//                 <TouchableOpacity 
//                   style={styles.eyeIcon} 
//                   onPress={() => setShowOldPassword(!showOldPassword)}
//                 >
//                   <Ionicons
//                     name={showOldPassword ? 'eye-off-outline' : 'eye-outline'}
//                     size={20}
//                     color={Colors.primary}
//                   />
//                 </TouchableOpacity>
//               </View>
              
//               <View style={styles.passwordInputWrapper}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="New Password"
//                   placeholderTextColor="#888"
//                   secureTextEntry={!showNewPassword}
//                   value={newPassword}
//                   onChangeText={setNewPassword}
//                 />
//                 <TouchableOpacity 
//                   style={styles.eyeIcon} 
//                   onPress={() => setShowNewPassword(!showNewPassword)}
//                 >
//                   <Ionicons
//                     name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
//                     size={20}
//                     color={Colors.primary}
//                   />
//                 </TouchableOpacity>
//               </View>
              
//               <View style={styles.passwordInputWrapper}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="Confirm New Password"
//                   placeholderTextColor="#888"
//                   secureTextEntry={!showNewPassword}
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                 />
//               </View>
//             </View>
            
//             <TouchableOpacity 
//               style={[styles.updatePasswordButton, loading && styles.disabledButton]} 
//               onPress={handleChangePassword}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" size="small" />
//               ) : (
//                 <Text style={styles.updatePasswordText}>Update Password</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 50,
//     paddingBottom: 16,
//   },
//   screenTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   settingsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   settingsButton: {
//     marginLeft: 16,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     alignItems: 'center',
//   },
//   profileImageContainer: {
//     position: 'relative',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: Colors.primary,
//   },
//   editImageButton: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: Colors.primary,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: Colors.background,
//   },
//   profileInfo: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   profileName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   profileRole: {
//     fontSize: 16,
//     color: Colors.primary,
//     marginBottom: 6,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationText: {
//     fontSize: 14,
//     color: '#aaa',
//     marginLeft: 4,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#222',
//     marginHorizontal: 16,
//     marginVertical: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#aaa',
//     marginTop: 4,
//   },
//   statDivider: {
//     width: 1,
//     height: '100%',
//     backgroundColor: '#444',
//   },
//   sectionContainer: {
//     backgroundColor: '#222',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.primary,
//   },
//   bioText: {
//     fontSize: 15,
//     color: '#ddd',
//     lineHeight: 22,
//   },
//   skillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   skillTag: {
//     backgroundColor: '#333',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 8,
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//   },
//   skillText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   experienceItem: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   experienceDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: Colors.primary,
//     marginTop: 6,
//   },
//   experienceContent: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   experienceTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   experienceProduction: {
//     fontSize: 14,
//     color: '#ddd',
//     marginTop: 2,
//   },
//   experienceYear: {
//     fontSize: 14,
//     color: '#aaa',
//     marginTop: 2,
//   },
//   accountActions: {
//     marginHorizontal: 16,
//     marginBottom: 30,
//   },
//   changePasswordButton: {
//     backgroundColor: '#444',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   signOutButton: {
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     backgroundColor: 'transparent',
//   },
//   signOutButtonText: {
//     color: Colors.primary,
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: '#222',
//     borderRadius: 12,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: Colors.primary,
//   },
//   passwordInputContainer: {
//     marginBottom: 20,
//   },
//   passwordInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#333',
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingHorizontal: 12,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     color: '#fff',
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 8,
//   },
//   updatePasswordButton: {
//     backgroundColor: Colors.primary,
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   updatePasswordText: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Alert,
  Modal,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Colors } from '../../constants/constantStyles';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SecureStorageService from '../../services/SecureStorageService';
import { AuthService } from '../../services';
import AuthService from '../../services';
import styles from '../../styles/ProfileStyles';

const ProfileScreen = () => {
  const { signOut, userData } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
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
  
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    
    setLoading(true);
    try {
      // Get access token from secure storage
      const accessToken = await SecureStorageService.getAccessToken();
      
      // Call the change password API
      const response = await AuthService.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        access_token: accessToken
      });
      console.log("change password response", response)
      
      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
        setShowPasswordModal(false);
        setOldPassword('');
        setNewPassword('');
      } else {
        Alert.alert('Error', response.data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
            onPress={() => setShowPasswordModal(true)}
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
      
      {/* Change Password Modal */}
      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Old Password */}
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Current Password"
                placeholderTextColor="#888"
                secureTextEntry={!showOldPassword}
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowOldPassword(!showOldPassword)}
              >
                <Ionicons
                  name={showOldPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
            
            {/* New Password */}
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="New Password"
                placeholderTextColor="#888"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
            
            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.updatePasswordButton, loading && styles.disabledButton]} 
              onPress={handleChangePassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.updatePasswordText}>Update Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default ProfileScreen;