
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Alert,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext'; 
import Entypo from 'react-native-vector-icons/Entypo';  
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileActionButton from './ProfileActionButton';
import ProfilePostTabs from './ProfilePostTabs';
import ProfilePostGrid from './ProfilePostGrid';
import { Colors } from '../../../constants/constantStyles';
import styles from '../../../styles/ProfileStyles';

const ProfileScreen = ({}) => {
  const navigation = useNavigation();
  const { userData } = useAuth();
  console.log("userData", userData);
  const [activeTab, setActiveTab] = useState('posts');
  const [refreshing, setRefreshing] = useState(false);
  
  // Default profile data
  const name = userData?.name || 'John Doe';
  const username = userData?.username || 'johndoe';
  const role = 'Actor/Filmmaker';
  const location = 'Mumbai, India';
  const bio = 'Passionate filmmaker with experience in directing short films and documentaries. Looking to collaborate on meaningful projects.';
  
  const stats = [
    { value: '143', label: 'Connections' },
    { value: '12', label: 'Projects' },
    { value: '20', label: 'Posts' }
  ];

   // Sample posts data
   const posts = Array(12).fill(0).map((_, index) => ({
    id: index.toString(),
    imageUrl: `https://picsum.photos/500/500?random=${index}`,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 20),
    caption: index % 3 === 0 ? 'Working on a new film project! #filmmaking #cinematography' : 
             index % 3 === 1 ? 'Behind the scenes on our latest shoot' : 
             'Some inspiration for the weekend',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString()
  }));

   // Sample saved posts
   const savedPosts = Array(5).fill(0).map((_, index) => ({
    id: `saved-${index}`,
    imageUrl: `https://picsum.photos/500/500?random=${100 + index}`,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 20),
    caption: 'Saved for inspiration',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString()
  }));

  // Sample reels posts
  const reelsPosts = Array(3).fill(0).map((_, index) => ({
    id: `reels-${index}`,
    imageUrl: `https://picsum.photos/500/500?random=${200 + index}`,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 20),
    caption: 'You were reels in this post',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString()
  }));

  // Navigate to Settings Screen
  const navigateToSettings = () => {
    navigation.navigate('AccountSettings');
  };
  
  // Handle post press
  const handlePostPress = (post) => {
    console.log('Post pressed:', post);
    // In the future, this would navigate to a post detail screen
  };
  // Determine which posts to show based on active tab
  const getPostsForActiveTab = () => {
    switch (activeTab) {
      case 'posts':
        return posts;
      case 'saved':
        return savedPosts;
      case 'reels':
        return reelsPosts;
      default:
        return posts;
    }
  };
  
  // Get empty message based on active tab
  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'posts':
        return 'Share your work and experiences\nYour posts will appear here';
      case 'saved':
        return 'Save posts for later\nThey will appear here';
      case 'reels':
        return 'Posts you\'re reels in\nwill appear here';
      default:
        return 'No posts yet';
    }
  };
  
  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
 
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader title="Profile"  onSettingsPress={navigateToSettings} />
      
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }>
        {/* Profile Info Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                style={styles.profileImage} 
              />
              <TouchableOpacity style={styles.editProfileImageButton}>
                <Entypo name="camera" size={18} color="#000" />
              </TouchableOpacity>
              </View>
            </View>
     
          {/* Profile Stats */}
          <ProfileStats stats={stats} />
         
          <View style={styles.profileDetailsContainer}>
            <View style={styles.profileDetailsNames}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileUsername}>@{username}</Text>
            </View>
              <Text style={styles.profileRole}>{role}</Text>  
              <View style={styles.locationContainer}>
                <Entypo name="location-pin" size={16} color={Colors.placeholderTextColorSecondary} />
                <Text style={styles.profileLocation}>{location}</Text>
              </View>
          </View>
        
          {/* Profile Actions */}
          <View style={styles.profileActionsContainer}>
            <ProfileActionButton 
              title="Edit Profile" 
              primary={true}
              onPress={() => navigation.navigate('EditProfile')}
              icon="edit"
            />
            
            <ProfileActionButton 
              title="Share Profile" 
              primary={false}
              onPress={() => {}}
              icon="share"
            />
          </View>
        </View>
        
        {/* About Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{bio}</Text>
        </View>

        {/* Bio Section */}
        {/* <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{bio}</Text>
          </View> */}
        
         {/* Post Tabs */}
         <ProfilePostTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        {/* Post Grid */}
        <ProfilePostGrid 
          posts={getPostsForActiveTab()} 
          onPostPress={handlePostPress}
          emptyMessage={getEmptyMessage()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;