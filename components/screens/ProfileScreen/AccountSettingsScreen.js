import React from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  SafeAreaView,
  Alert,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import BackHeader from './BackHeader';
import ProfileListItem from './ProfileListItem';
import { Colors } from '../../../constants/constantStyles';

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          onPress: async () => {
            const result = await signOut();
            if (!result.success) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Account Settings" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <ProfileListItem 
            icon="person-outline"
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          
          <ProfileListItem 
            icon="lock-outline"
            title="Change Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          
          <ProfileListItem 
            icon="shield"
            title="Privacy"
            onPress={() => {}}
          />
          
          <ProfileListItem 
            icon="remove-red-eye"
            title="Account Visibility"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <ProfileListItem 
            icon="notifications-none"
            title="Notifications"
            onPress={() => {}}
          />
          
          <ProfileListItem 
            icon="language"
            title="Language"
            subtitle="English (US)"
            onPress={() => {}}
          />
          
          {/* <ProfileListItem 
            icon="moon-outline"
            title="Dark Mode"
            subtitle="On"
            onPress={() => {}}
          /> */}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <ProfileListItem 
            icon="help-outline"
            title="Help & Support"
            onPress={() => {}}
          />
          
          <ProfileListItem 
            icon="perm-device-information"
            title="About"
            onPress={() => {}}
          />
          
          <ProfileListItem 
            icon="dock"
            title="Terms & Policies"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <ProfileListItem 
            icon="logout"
            title="Sign Out"
            isDestructive={true}
            onPress={handleSignOut}
          />
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  versionText: {
    color: '#666',
    fontSize: 14,
  }
});

export default AccountSettingsScreen;