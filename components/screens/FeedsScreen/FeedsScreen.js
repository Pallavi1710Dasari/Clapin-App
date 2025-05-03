
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  RefreshControl, 
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/FeedStyles';
import PostCard from './PostCard';
import { getEnrichedPosts, users } from '../../../data/dummyFeedPostsData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/constantStyles';

// Define specific user types for different content
const VIDEO_CREATORS = ['user3', 'user7', 'user9']; // Konkona Sen, Richa Chadha, Vidya Balan
const IMAGE_POSTERS = [ 'user5',  'user6',]; // Rajkumar Rao, Anurag Kashyap, Pankaj Tripathi
const JOB_POSTERS  = ['user2','user1', 'user4', 'user8', 'user10']; //Rajkumar Rao,Pankaj Tripathi, The rest

const FeedsScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  // Fetch posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Load posts from our data source
  const loadPosts = () => {
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Get posts from dummy data
      const originalPosts = getEnrichedPosts();
      
      // Create a new array where we'll assign content based on user type
      let modifiedPosts = [];
      
      originalPosts.forEach((post) => {
        // Make a copy of the original post first
        const updatedPost = { ...post };
        
        // Clear any existing content type flags
        updatedPost.hasVideo = false;
        updatedPost.hasJob = false;
        updatedPost.hasImages = false;
        updatedPost.jobData = null;
        updatedPost.images = [];
        
        // Assign content type based on user ID
        if (VIDEO_CREATORS.includes(updatedPost.userId)) {
          // Video creators post videos
          updatedPost.hasVideo = true;
          updatedPost.videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Example video URL
          updatedPost.thumbnail = 'https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_640.jpg';
          updatedPost.duration = '0:45';
          updatedPost.views = `${Math.floor(Math.random() * 15) + 1}K`;
        } 
        else if (JOB_POSTERS.includes(updatedPost.userId)) {
          // Job posters post job opportunities
          updatedPost.hasJob = true;
          updatedPost.jobData = {
            id: `job-${updatedPost.userId}`,
            title: `${updatedPost.name}'s Job Opportunity`,
            company: "Clapin Productions",
            location: "Mumbai, India",
            text: "Looking for talented professionals to join our next project. Must have experience in film production.",
            employment_type: "Full-Time"
          };
        }
        else if (IMAGE_POSTERS.includes(updatedPost.userId)) {
          // Image posters post images
          updatedPost.hasImages = true;
          // Use original images if they exist, otherwise generate some
          if (!post.images || post.images.length === 0) {
            updatedPost.images = [
              'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1518930259200-3e5b29f42096?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            ];
          }
        }
        
        modifiedPosts.push(updatedPost);
      });
      
      setPosts(modifiedPosts);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  // Filter posts based on selection
  const getFilteredPosts = () => {
    if (activeFilter === 'All') {
      return posts;
    } else if (activeFilter === 'Photos') {
      return posts.filter(post => post.hasImages);
    } else if (activeFilter === 'Videos') {
      return posts.filter(post => post.hasVideo);
    } else if (activeFilter === 'Jobs') {
      return posts.filter(post => post.hasJob);
    } else if (activeFilter === 'Trending') {
      return posts.sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  // Navigate to Profile screen
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  // Navigate to Notifications screen
  const goToNotofications = () => {
    navigation.navigate('Notifications');
  };

  // Navigate to Messages screen
  const goToMessages = () => {
    navigation.navigate('Messages');
  };

  return (
    <View style={styles.container}>
      {/* Header with profile pic and icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToProfile}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.headerProfileImage} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconButton} onPress={goToNotofications}>
            <MaterialIcons name="notifications-none" size={26} color={Colors.iconsColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIconButton} onPress={goToMessages}>
            <MaterialIcons name="chat" size={26} color={Colors.iconsColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Content filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'All' ? styles.activeFilterButton : {}
          ]}
          onPress={() => setActiveFilter('All')}
        >
          <Text 
            style={activeFilter === 'All' ? styles.activeFilterText : styles.filterText}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'Photos' ? styles.activeFilterButton : {}
          ]}
          onPress={() => setActiveFilter('Photos')}
        >
          <Text 
            style={activeFilter === 'Photos' ? styles.activeFilterText : styles.filterText}
          >
            Photos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'Videos' ? styles.activeFilterButton : {}
          ]}
          onPress={() => setActiveFilter('Videos')}
        >
          <Text 
            style={activeFilter === 'Videos' ? styles.activeFilterText : styles.filterText}
          >
            Videos
          </Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'Jobs' ? styles.activeFilterButton : {}
          ]}
          onPress={() => setActiveFilter('Jobs')}
        >
          <Text 
            style={activeFilter === 'Jobs' ? styles.activeFilterText : styles.filterText}
          >
            Jobs
          </Text>
        </TouchableOpacity> */}
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'Trending' ? styles.activeFilterButton : {}
          ]}
          onPress={() => setActiveFilter('Trending')}
        >
          <Text 
            style={activeFilter === 'Trending' ? styles.activeFilterText : styles.filterText}
          >
            Trending
          </Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Loading indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading feeds...</Text>
        </View>
      ) : (
        /* Main content - scrollable feed */
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        >
          {getFilteredPosts().map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {/* End of feed indicator */}
          {getFilteredPosts().length > 0 ? (
            <View style={styles.endOfFeedContainer}>
              <Text style={styles.endOfFeedText}>
                You're all caught up! Check back later for more updates.
              </Text>
            </View>
          ) : (
            <View style={styles.noContentContainer}>
              <MaterialIcons name="filter-none" size={50} color={Colors.textGray} />
              <Text style={styles.noContentText}>
                No {activeFilter.toLowerCase()} posts to show.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default FeedsScreen;