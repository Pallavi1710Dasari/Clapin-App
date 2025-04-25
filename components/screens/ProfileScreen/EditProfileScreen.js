import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';  
import { Colors } from '../../../constants/constantStyles';
import BackHeader from './BackHeader';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    role: 'Actor/Filmmaker',
    location: 'Mumbai, India',
    bio: 'Passionate filmmaker with experience in directing short films and documentaries. Looking to collaborate on meaningful projects.'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Profile updated successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Edit Profile" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Profile Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.changePhotoButton}>
              <Entypo name="camera" size={20} color={Colors.placeholderTextColorSecondary} />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          
          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Your name"
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              placeholder="Your username"
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={styles.input}
              value={formData.role}
              onChangeText={(text) => handleChange('role', text)}
              placeholder="Your profession"
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => handleChange('location', text)}
              placeholder="Your location"
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.bio}
              onChangeText={(text) => handleChange('bio', text)}
              placeholder="Tell us about yourself"
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  imageContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  changePhotoButton: {
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: Colors.textGray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop:30,
  },
  changePhotoText: {
    fontSize: 14,
    color: Colors.placeholderTextColorPrimary,
    fontWeight: '500',
    marginLeft: 6,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.placeholderTextColorSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.placeholderTextColorSecondary,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EditProfileScreen;