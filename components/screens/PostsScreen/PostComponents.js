// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
// import { Colors } from '../../../constants/constantStyles';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import { Avatar, Card, Divider, SocialActionBar } from '../../commonComponents/commonComponents';

// const { width } = Dimensions.get('window');

// // Post creation component
// export const CreatePostCard = ({ onPress, profilePic }) => {
//   return (
//     <Card style={styles.createPostCard}>
//       <TouchableOpacity style={styles.createPostContent} onPress={onPress}>
//         <Avatar source={profilePic} size={45} />
//         <View style={styles.createPostInput}>
//           <Text style={styles.createPostText}>Share what's on your mind...</Text>
//         </View>
//       </TouchableOpacity>
      
//       <Divider />
      
//       <View style={styles.createPostActions}>
//         <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
//           <Feather name="image" size={22} color={Colors.iconLight} />
//           <Text style={styles.mediaButtonText}>Photo</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
//           <Feather name="video" size={22} color={Colors.iconLight} />
//           <Text style={styles.mediaButtonText}>Video</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
//           <Feather name="calendar" size={22} color={Colors.iconLight} />
//           <Text style={styles.mediaButtonText}>Event</Text>
//         </TouchableOpacity>
//       </View>
//     </Card>
//   );
// };

// // Post header component (author info, timestamp, etc.)
// export const PostHeader = ({ author, timestamp, onProfilePress, onMorePress }) => {
//   return (
//     <View style={styles.postHeader}>
//       <TouchableOpacity 
//         style={styles.postAuthorContainer} 
//         onPress={() => onProfilePress(author.id)}
//       >
//         <Avatar source={author.profilePic} size={48} />
//         <View style={styles.postAuthorInfo}>
//           <Text style={styles.postAuthorName}>{author.name}</Text>
//           <Text style={styles.postAuthorTitle}>{author.title}</Text>
//           <Text style={styles.postTimestamp}>{timestamp}</Text>
//         </View>
//       </TouchableOpacity>
      
//       <TouchableOpacity 
//         style={styles.moreButton} 
//         onPress={onMorePress}
//       >
//         <Feather name="more-horizontal" size={24} color={Colors.iconLight} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Post media component (handles images, videos)
// export const PostMedia = ({ media }) => {
//   if (!media || media.length === 0) return null;

//   // If only one media item
//   if (media.length === 1) {
//     const item = media[0];
//     return (
//       <View style={styles.singleMediaContainer}>
//         <Image 
//           source={{ uri: item.url }} 
//           style={styles.singleMedia} 
//           resizeMode="cover" 
//         />
//       </View>
//     );
//   }

//   // For multiple media items
//   return (
//     <View style={styles.mediaGridContainer}>
//       <FlatList
//         data={media}
//         keyExtractor={(item, index) => `media-${index}`}
//         numColumns={media.length === 2 ? 2 : 1}
//         scrollEnabled={false}
//         renderItem={({ item, index }) => (
//           <View style={[
//             styles.mediaGridItem,
//             media.length === 2 && styles.twoMediaItem,
//             (media.length === 3 && index === 0) && styles.firstOfThreeItem,
//             (media.length === 3 && index > 0) && styles.smallItem
//           ]}>
//             <Image 
//               source={{ uri: item.url }} 
//               style={styles.mediaImage} 
//               resizeMode="cover" 
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// // Complete post component
// export const Post = ({ 
//   post, 
//   onLike, 
//   onComment, 
//   onShare, 
//   onProfilePress, 
//   onPostPress,
//   onMorePress
// }) => {
//   // Determine if the post is from the current user or someone else
//   const isOwnPost = !post.author;
//   const author = isOwnPost ? { name: "You", title: "Your post", profilePic: "" } : post.author;
  
//   return (
//     <Card>
//       <PostHeader 
//         author={author} 
//         timestamp={post.timestamp} 
//         onProfilePress={onProfilePress} 
//         onMorePress={() => onMorePress(post.id)}
//       />
      
//       <TouchableOpacity 
//         style={styles.postContent}
//         onPress={() => onPostPress(post.id)}
//         activeOpacity={0.9}
//       >
//         <Text style={styles.postText}>{post.content}</Text>
        
//         {post.media && post.media.length > 0 && (
//           <PostMedia media={post.media} />
//         )}
//       </TouchableOpacity>
      
//       {/* Like count and comments summary */}
//       {(post.likes > 0 || post.comments > 0) && (
//         <View style={styles.engagementSummary}>
//           {post.likes > 0 && (
//             <View style={styles.likesContainer}>
//               <AntDesign name="heart" size={14} color={Colors.primary} />
//               <Text style={styles.engagementText}>{post.likes}</Text>
//             </View>
//           )}
          
//           {post.comments > 0 && (
//             <TouchableOpacity onPress={() => onComment(post.id)}>
//               <Text style={styles.commentsCount}>
//                 {post.comments} comment{post.comments !== 1 ? 's' : ''}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       )}
      
//       <Divider />
      
//       <SocialActionBar 
//         likes={post.likes}
//         comments={post.comments}
//         shares={post.shares}
//         isLiked={post.isLiked}
//         onLike={() => onLike(post.id)}
//         onComment={() => onComment(post.id)}
//         onShare={() => onShare(post.id)}
//       />
//     </Card>
//   );
// };

// // Comment component
// export const Comment = ({ comment, onLike, onReply, onProfile }) => {
//   return (
//     <View style={styles.commentContainer}>
//       <TouchableOpacity onPress={() => onProfile(comment.author.id)}>
//         <Avatar source={comment.author.profilePic} size={36} />
//       </TouchableOpacity>
      
//       <View style={styles.commentContent}>
//         <View style={styles.commentBubble}>
//           <TouchableOpacity onPress={() => onProfile(comment.author.id)}>
//             <Text style={styles.commentAuthor}>{comment.author.name}</Text>
//           </TouchableOpacity>
//           <Text style={styles.commentText}>{comment.content}</Text>
//         </View>
        
//         <View style={styles.commentActions}>
//           <TouchableOpacity style={styles.commentAction} onPress={() => onLike(comment.id)}>
//             <Text style={styles.commentActionText}>Like</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.commentAction} onPress={() => onReply(comment.id)}>
//             <Text style={styles.commentActionText}>Reply</Text>
//           </TouchableOpacity>
//           <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
//         </View>
        
//         {comment.likes > 0 && (
//           <View style={styles.commentLikes}>
//             <AntDesign name="heart" size={12} color={Colors.primary} />
//             <Text style={styles.commentLikesText}>{comment.likes}</Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// // Draft post item component
// export const DraftPostItem = ({ draft, onResume, onDelete }) => {
//   // Format date for display
//   const formattedDate = new Date(draft.savedAt).toLocaleDateString('en-US', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric'
//   });
  
//   return (
//     <TouchableOpacity 
//       style={styles.draftItem}
//       onPress={() => onResume(draft.id)}
//     >
//       <View style={styles.draftContent}>
//         <Text style={styles.draftText} numberOfLines={2}>
//           {draft.content || 'Empty draft'}
//         </Text>
//         <Text style={styles.draftDate}>Saved on {formattedDate}</Text>
//       </View>
      
//       <TouchableOpacity 
//         style={styles.deleteDraftButton}
//         onPress={() => onDelete(draft.id)}
//       >
//         <AntDesign name="delete" size={18} color={Colors.textLight} />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// };

// // Post filter selector component
// export const PostFilter = ({ filters, selectedFilter, onFilterChange }) => {
//   return (
//     <View style={styles.filterContainer}>
//       <FlatList
//         horizontal
//         data={filters}
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={[
//               styles.filterOption,
//               selectedFilter === item.id && styles.selectedFilter
//             ]}
//             onPress={() => onFilterChange(item.id)}
//           >
//             <Text 
//               style={[
//                 styles.filterText,
//                 selectedFilter === item.id && styles.selectedFilterText
//               ]}
//             >
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.filterList}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // Create post styles
//   createPostCard: {
//     marginHorizontal: 16,
//     marginVertical: 8
//   },
//   createPostContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12
//   },
//   createPostInput: {
//     flex: 1,
//     marginLeft: 12,
//     backgroundColor: Colors.inputBackground,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10
//   },
//   createPostText: {
//     color: Colors.placeholderTextColorPrimary,
//     fontSize: 14
//   },
//   createPostActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 8
//   },
//   mediaButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12
//   },
//   mediaButtonText: {
//     color: Colors.textLight,
//     marginLeft: 6,
//     fontSize: 14
//   },
  
//   // Post header styles
//   postHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 8
//   },
//   postAuthorContainer: {
//     flexDirection: 'row',
//     flex: 1
//   },
//   postAuthorInfo: {
//     marginLeft: 12,
//     flex: 1
//   },
//   postAuthorName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.white,
//     marginBottom: 2
//   },
//   postAuthorTitle: {
//     fontSize: 14,
//     color: Colors.textLight,
//     marginBottom: 2
//   },
//   postTimestamp: {
//     fontSize: 12,
//     color: Colors.textLight
//   },
//   moreButton: {
//     padding: 4
//   },
  
//   // Post content styles
//   postContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 12
//   },
//   postText: {
//     fontSize: 14,
//     color: Colors.text,
//     lineHeight: 20,
//     marginBottom: 12
//   },
  
//   // Post media styles
//   singleMediaContainer: {
//     width: '100%',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginTop: 8
//   },
//   singleMedia: {
//     width: '100%',
//     aspectRatio: 16 / 9,
//     borderRadius: 8
//   },
//   mediaGridContainer: {
//     marginTop: 8
//   },
//   mediaGridItem: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     margin: 2
//   },
//   twoMediaItem: {
//     width: (width - 48) / 2,
//     aspectRatio: 1
//   },
//   firstOfThreeItem: {
//     width: width - 48,
//     aspectRatio: 16 / 9
//   },
//   smallItem: {
//     width: (width - 48) / 2,
//     aspectRatio: 1
//   },
//   mediaImage: {
//     width: '100%',
//     height: '100%'
//   },
  
//   // Engagement summary styles
//   engagementSummary: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 8
//   },
//   likesContainer: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   engagementText: {
//     fontSize: 12,
//     color: Colors.textLight,
//     marginLeft: 4
//   },
//   commentsCount: {
//     fontSize: 12,
//     color: Colors.textLight
//   },
  
//   // Comment styles
//   commentContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 8
//   },
//   commentContent: {
//     marginLeft: 8,
//     flex: 1
//   },
//   commentBubble: {
//     backgroundColor: Colors.inputBackground,
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 8
//   },
//   commentAuthor: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: Colors.white,
//     marginBottom: 2
//   },
//   commentText: {
//     fontSize: 14,
//     color: Colors.text
//   },
//   commentActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//     marginLeft: 8
//   },
//   commentAction: {
//     marginRight: 12
//   },
//   commentActionText: {
//     fontSize: 12,
//     color: Colors.textLight,
//     fontWeight: '500'
//   },
//   commentTimestamp: {
//     fontSize: 12,
//     color: Colors.textLight
//   },
//   commentLikes: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     right: 8,
//     bottom: -6,
//     backgroundColor: Colors.background,
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderWidth: 1,
//     borderColor: Colors.borderColor
//   },
//   commentLikesText: {
//     fontSize: 11,
//     color: Colors.textLight,
//     marginLeft: 3
//   },
  
//   // Draft post styles
//   draftItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.cardBackground,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8
//   },
//   draftContent: {
//     flex: 1
//   },
//   draftText: {
//     fontSize: 14,
//     color: Colors.text,
//     marginBottom: 4
//   },
//   draftDate: {
//     fontSize: 12,
//     color: Colors.textLight
//   },
//   deleteDraftButton: {
//     padding: 8
//   },
  
//   // Filter styles
//   filterContainer: {
//     marginVertical: 8
//   },
//   filterList: {
//     paddingHorizontal: 16
//   },
//   filterOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     borderRadius: 18,
//     backgroundColor: Colors.inputBackground
//   },
//   selectedFilter: {
//     backgroundColor: Colors.primary
//   },
//   filterText: {
//     fontSize: 14,
//     color: Colors.textLight
//   },
//   selectedFilterText: {
//     color: Colors.background,
//     fontWeight: '600'
//   }
// });

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Colors, fontFamily } from '../../../constants/constantStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar, Card, Divider, SocialActionBar } from '../../commonComponents/commonComponents';

const { width } = Dimensions.get('window');

// Post creation component
export const CreatePostCard = ({ onPress, profilePic }) => {
  return (
    <Card style={styles.createPostCard}>
      <TouchableOpacity style={styles.createPostContent} onPress={onPress}>
        <Avatar source={profilePic} size={45} />
        <View style={styles.createPostInput}>
          <Text style={styles.createPostText}>Share what's on your mind...</Text>
        </View>
      </TouchableOpacity>
      
      <Divider />
      
      <View style={styles.createPostActions}>
        <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
          <Feather name="image" size={22} color={Colors.iconLight} />
          <Text style={styles.mediaButtonText}>Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
          <Feather name="video" size={22} color={Colors.iconLight} />
          <Text style={styles.mediaButtonText}>Video</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
          <Feather name="calendar" size={22} color={Colors.iconLight} />
          <Text style={styles.mediaButtonText}>Event</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

// Post header component (author info, timestamp, etc.)
export const PostHeader = ({ author, timestamp, onProfilePress, onMorePress }) => {
  return (
    <View style={styles.postHeader}>
      <TouchableOpacity 
        style={styles.postAuthorContainer} 
        onPress={() => onProfilePress(author.id)}
      >
        <Avatar source={author.profilePic} size={48} />
        <View style={styles.postAuthorInfo}>
          <Text style={styles.postAuthorName}>{author.name}</Text>
          <Text style={styles.postAuthorTitle}>{author.title}</Text>
          <Text style={styles.postTimestamp}>{timestamp}</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.moreButton} 
        onPress={onMorePress}
      >
        <Feather name="more-horizontal" size={24} color={Colors.iconLight} />
      </TouchableOpacity>
    </View>
  );
};

// Post media component (handles images, videos)
export const PostMedia = ({ media }) => {
  if (!media || media.length === 0) return null;

  // If only one media item
  if (media.length === 1) {
    const item = media[0];
    return (
      <View style={styles.singleMediaContainer}>
        <Image 
          source={{ uri: item.url }} 
          style={styles.singleMedia} 
          resizeMode="cover" 
        />
      </View>
    );
  }

  // For multiple media items
  return (
    <View style={styles.mediaGridContainer}>
      <FlatList
        data={media}
        keyExtractor={(item, index) => `media-${index}`}
        numColumns={media.length === 2 ? 2 : 1}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={[
            styles.mediaGridItem,
            media.length === 2 && styles.twoMediaItem,
            (media.length === 3 && index === 0) && styles.firstOfThreeItem,
            (media.length === 3 && index > 0) && styles.smallItem
          ]}>
            <Image 
              source={{ uri: item.url }} 
              style={styles.mediaImage} 
              resizeMode="cover" 
            />
          </View>
        )}
      />
    </View>
  );
};

// Complete post component
export const Post = ({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onProfilePress, 
  onPostPress,
  onMorePress
}) => {
  // Determine if the post is from the current user or someone else
  const isOwnPost = !post.author;
  const author = isOwnPost ? { name: "You", title: "Your post", profilePic: "" } : post.author;
  
  return (
    <Card>
      <PostHeader 
        author={author} 
        timestamp={post.timestamp} 
        onProfilePress={onProfilePress} 
        onMorePress={() => onMorePress(post.id)}
      />
      
      <TouchableOpacity 
        style={styles.postContent}
        onPress={() => onPostPress(post.id)}
        activeOpacity={0.9}
      >
        <Text style={styles.postText}>{post.content}</Text>
        
        {post.media && post.media.length > 0 && (
          <PostMedia media={post.media} />
        )}
      </TouchableOpacity>
      
      {/* Like count and comments summary */}
      {(post.likes > 0 || post.comments > 0) && (
        <View style={styles.engagementSummary}>
          {post.likes > 0 && (
            <View style={styles.likesContainer}>
              <AntDesign name="heart" size={14} color={Colors.primary} />
              <Text style={styles.engagementText}>{post.likes}</Text>
            </View>
          )}
          
          {post.comments > 0 && (
            <TouchableOpacity onPress={() => onComment(post.id)}>
              <Text style={styles.commentsCount}>
                {post.comments} comment{post.comments !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <Divider />
      
      <SocialActionBar 
        likes={post.likes}
        comments={post.comments}
        shares={post.shares}
        isLiked={post.isLiked}
        onLike={() => onLike(post.id)}
        onComment={() => onComment(post.id)}
        onShare={() => onShare(post.id)}
      />
    </Card>
  );
};

// Comment component
export const Comment = ({ comment, onLike, onReply, onProfile }) => {
  return (
    <View style={styles.commentContainer}>
      <TouchableOpacity onPress={() => onProfile(comment.author.id)}>
        <Avatar source={comment.author.profilePic} size={36} />
      </TouchableOpacity>
      
      <View style={styles.commentContent}>
        <View style={styles.commentBubble}>
          <TouchableOpacity onPress={() => onProfile(comment.author.id)}>
            <Text style={styles.commentAuthor}>{comment.author.name}</Text>
          </TouchableOpacity>
          <Text style={styles.commentText}>{comment.content}</Text>
        </View>
        
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.commentAction} onPress={() => onLike(comment.id)}>
            <Text style={styles.commentActionText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentAction} onPress={() => onReply(comment.id)}>
            <Text style={styles.commentActionText}>Reply</Text>
          </TouchableOpacity>
          <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
        </View>
        
        {comment.likes > 0 && (
          <View style={styles.commentLikes}>
            <AntDesign name="heart" size={12} color={Colors.primary} />
            <Text style={styles.commentLikesText}>{comment.likes}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// Draft post item component
export const DraftPostItem = ({ draft, onResume, onDelete }) => {
  // Format date for display
  const formattedDate = new Date(draft.savedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <TouchableOpacity 
      style={styles.draftItem}
      onPress={() => onResume(draft.id)}
    >
      <View style={styles.draftContent}>
        <Text style={styles.draftText} numberOfLines={2}>
          {draft.content || 'Empty draft'}
        </Text>
        <Text style={styles.draftDate}>Saved on {formattedDate}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteDraftButton}
        onPress={() => onDelete(draft.id)}
      >
        <AntDesign name="delete" size={18} color={Colors.textLight} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Post filter selector component
export const PostFilter = ({ filters, selectedFilter, onFilterChange }) => {
  return (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.filterOption,
              selectedFilter === item.id && styles.selectedFilter
            ]}
            onPress={() => onFilterChange(item.id)}
          >
            <Text 
              style={[
                styles.filterText,
                selectedFilter === item.id && styles.selectedFilterText
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.filterList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Create post styles
  createPostCard: {
    marginHorizontal: 16,
    marginVertical: 8
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
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
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  mediaButtonText: {
    color: Colors.textGray,
    fontFamily: fontFamily.regular,
    marginLeft: 6,
    fontSize: 14
  },
  
  // Post header styles
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  postAuthorContainer: {
    flexDirection: 'row',
    flex: 1
  },
  postAuthorInfo: {
    marginLeft: 12,
    flex: 1
  },
  postAuthorName: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Colors.text,
    marginBottom: 2
  },
  postAuthorTitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 2
  },
  postTimestamp: {
    fontSize: 12,
    fontFamily: fontFamily.light,
    color: Colors.textGray
  },
  moreButton: {
    padding: 4
  },
  
  // Post content styles
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  postText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 12
  },
  
  // Post media styles
  singleMediaContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8
  },
  singleMedia: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8
  },
  mediaGridContainer: {
    marginTop: 8
  },
  mediaGridItem: {
    borderRadius: 8,
    overflow: 'hidden',
    margin: 2
  },
  twoMediaItem: {
    width: (width - 48) / 2,
    aspectRatio: 1
  },
  firstOfThreeItem: {
    width: width - 48,
    aspectRatio: 16 / 9
  },
  smallItem: {
    width: (width - 48) / 2,
    aspectRatio: 1
  },
  mediaImage: {
    width: '100%',
    height: '100%'
  },
  
  // Engagement summary styles
  engagementSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  engagementText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginLeft: 4
  },
  commentsCount: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: Colors.textGray
  },
  
  // Comment styles
  commentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  commentContent: {
    marginLeft: 8,
    flex: 1
  },
  commentBubble: {
    backgroundColor: Colors.input,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  commentAuthor: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: Colors.text,
    marginBottom: 2
  },
  commentText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.text
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 8
  },
  commentAction: {
    marginRight: 12
  },
  commentActionText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: Colors.textGray
  },
  commentTimestamp: {
    fontSize: 12,
    fontFamily: fontFamily.light,
    color: Colors.textGray
  },
  commentLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: -6,
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.borderColor
  },
  commentLikesText: {
    fontSize: 11,
    color: Colors.textLight,
    marginLeft: 3
  },
  
  // Draft post styles
  draftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  draftContent: {
    flex: 1
  },
  draftText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4
  },
  draftDate: {
    fontSize: 12,
    color: Colors.textLight
  },
  deleteDraftButton: {
    padding: 8
  },
  
  // Filter styles
  filterContainer: {
    marginVertical: 8
  },
  filterList: {
    paddingHorizontal: 16
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: Colors.input
  },
  selectedFilter: {
    backgroundColor: Colors.primary
  },
  filterText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.textGray
  },
  selectedFilterText: {
    color: Colors.textBlack,
    fontFamily: fontFamily.medium
  }
});