import React from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Text, 
  StyleSheet,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';  
import { Colors } from '../../../constants/constantStyles';

// Get screen width for post grid
const { width } = Dimensions.get('window');
const POST_SIZE = width / 3;

const ProfilePostGrid = ({ posts, onPostPress, emptyMessage }) => {
  if (!posts || posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Entypo name="images" size={50} color="#666" />
        <Text style={styles.emptyText}>{emptyMessage || 'No posts yet'}</Text>
      </View>
    );
  }

  const renderPostItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.postContainer}
      onPress={() => onPostPress && onPostPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPostItem}
      keyExtractor={item => item.id}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexGrow: 1,
  },
  postContainer: {
    width: POST_SIZE,
    height: POST_SIZE,
    padding: 1,
  },
  postImage: {
    width: '100%', 
    height: '100%',
    borderRadius: 2,
  },
  emptyContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  }
});

export default ProfilePostGrid;