import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image
} from 'react-native';
import { Colors, fontFamily } from '../../../constants/constantStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { 
  Header, 
  IconButton
} from '../../commonComponents/commonComponents';

const PostsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState('https://randomuser.me/api/portraits/men/32.jpg');

  // Handle creating a new post
  const handleCreatePost = () => {
    setShowOptions(true);
  };

  // Handle post options
  const handleTextPost = () => {
    setShowOptions(false);
    Alert.alert('Create Text Post', 'Navigate to text post creation screen');
  };

  const handleImagePost = () => {
    setShowOptions(false);
    Alert.alert('Create Image Post', 'Navigate to image post creation screen');
  };

  const handleVideoPost = () => {
    setShowOptions(false);
    Alert.alert('Create Video Post', 'Navigate to video post creation screen');
  };

  const handlePollPost = () => {
    setShowOptions(false);
    Alert.alert('Create Poll', 'Navigate to poll creation screen');
  };

  const handleArticlePost = () => {
    setShowOptions(false);
    Alert.alert('Write Article', 'Navigate to article writing screen');
  };

  // Create Post Card component 
  const CreatePostCard = ({ onPress, profilePic }) => {
    return (
      <View style={styles.createPostCard}>
        <TouchableOpacity style={styles.createPostContent} onPress={onPress}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profilePic }} 
              style={styles.avatar}
            />
          </View>
          <View style={styles.createPostInput}>
            <Text style={styles.createPostText}>Share what's on your mind...</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <View style={styles.createPostActions}>
          <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
            <AntDesign name="picture" size={22} color={Colors.iconsColor} />
            <Text style={styles.mediaButtonText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
            <AntDesign name="videocamera" size={22} color={Colors.iconsColor} />
            <Text style={styles.mediaButtonText}>Video</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
            <AntDesign name="calendar" size={22} color={Colors.iconsColor} />
            <Text style={styles.mediaButtonText}>Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Simple Post Options Modal
  const PostOptionsModal = () => (
    <Modal
      visible={showOptions}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowOptions(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.optionsContainer}>
          <View style={styles.optionsHeader}>
            <Text style={styles.optionsTitle}>Create Post</Text>
            <TouchableOpacity onPress={() => setShowOptions(false)}>
              <AntDesign name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <TouchableOpacity style={styles.optionItem} onPress={handleTextPost}>
              <AntDesign name="edit" size={24} color={Colors.iconsColor} />
              <Text style={styles.optionText}>Create a text post</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleImagePost}>
              <AntDesign name="picture" size={24} color={Colors.iconsColor} />
              <Text style={styles.optionText}>Share a photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleVideoPost}>
              <AntDesign name="videocamera" size={24} color={Colors.iconsColor} />
              <Text style={styles.optionText}>Share a video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handlePollPost}>
              <MaterialIcons name="poll" size={24} color={Colors.iconsColor} />
              <Text style={styles.optionText}>Create a poll</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem} onPress={handleArticlePost}>
              <MaterialIcons name="menu-book" size={24} color={Colors.iconsColor} />
              <Text style={styles.optionText}>Write an article</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Create Post" 
        rightComponent={
          <IconButton 
            iconName="search1" 
            size={24} 
            color={Colors.iconsColor} 
            onPress={() => Alert.alert('Search', 'Search posts')} 
          />
        }
      />
      
      {/* Post Creation Card */}
      <View style={styles.createPostSection}>
        <CreatePostCard 
          onPress={handleCreatePost}
          profilePic={userProfilePic}
        />
      </View>
      
      {/* Empty State */}
      <View style={styles.emptyStateContainer}>
        <AntDesign name="filetext1" size={80} color={Colors.textGray} style={styles.emptyStateIcon} />
        <Text style={styles.emptyStateTitle}>Share your thoughts</Text>
        <Text style={styles.emptyStateText}>
          Create a post to share with your network. You can share text, photos, videos and more.
        </Text>
        <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
          <Text style={styles.createPostButtonText}>Create a post</Text>
        </TouchableOpacity>
      </View>
      
      {/* Post Options Modal */}
      <PostOptionsModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  createPostSection: {
    padding: 10
  },
  createPostCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  createPostInput: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: Colors.input,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  createPostText: {
    color: Colors.placeholderTextColorPrimary,
    fontFamily: fontFamily.regular,
    fontSize: 14
  },
  divider: {
    height: 1,
    backgroundColor: Colors.seperatorLineColor,
    marginVertical: 7
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  mediaButtonText: {
    color: Colors.placeholderTextColorPrimary,
    fontFamily: fontFamily.regular,
    marginLeft: 6,
    fontSize: 16
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -100
  },
  emptyStateIcon: {
    marginBottom: 20
  },
  emptyStateTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: Colors.text,
    marginBottom: 12
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    textAlign: 'center',
    marginBottom: 24
  },
  createPostButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  createPostButtonText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Colors.textBlack
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end'
  },
  optionsContainer: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    maxHeight: '70%'
  },
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.seperatorLineColor
  },
  optionsTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Colors.text
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.seperatorLineColor
  },
  optionText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Colors.text,
    marginLeft: 16
  }
});

export default PostsScreen;