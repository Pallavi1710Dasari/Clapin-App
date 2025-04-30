// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import styles from '../../../styles/FeedStyles';
// import { Colors } from '../../../constants/constantStyles';
// import JobCard from './JobCard';
// import ImageCarousel from './ImageCarousel';

// // Simple function to format timestamps to "time ago" format
// const formatTimeAgo = (timestamp) => {
//   if (!timestamp) return 'recently';
  
//   const now = new Date();
//   const postDate = new Date(timestamp);
//   const diffInSeconds = Math.floor((now - postDate) / 1000);
  
//   if (diffInSeconds < 60) {
//     return 'just now';
//   } else if (diffInSeconds < 3600) {
//     const minutes = Math.floor(diffInSeconds / 60);
//     return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
//   } else if (diffInSeconds < 86400) {
//     const hours = Math.floor(diffInSeconds / 3600);
//     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
//   } else if (diffInSeconds < 2592000) {
//     const days = Math.floor(diffInSeconds / 86400);
//     return `${days} ${days === 1 ? 'day' : 'days'} ago`;
//   } else if (diffInSeconds < 31536000) {
//     const months = Math.floor(diffInSeconds / 2592000);
//     return `${months} ${months === 1 ? 'month' : 'months'} ago`;
//   } else {
//     const years = Math.floor(diffInSeconds / 31536000);
//     return `${years} ${years === 1 ? 'year' : 'years'} ago`;
//   }
// };

// const PostCard = ({ post }) => {
//   // Format timestamp to "time ago" format (e.g., "2 hours ago")
//   const timeAgo = post.timestamp ? formatTimeAgo(post.timestamp) : 'recently';

//   return (
//     <View style={styles.postContainer}>
//       {/* Post Header */}
//       <View style={styles.postHeader}>
//         <Image source={{ uri: post.image }} style={styles.profileImage} />
//         <View style={styles.userInfoContainer}>
//           <Text style={styles.userName}>{post.name}</Text>
//           <Text style={styles.userTitle}>{post.title}</Text>
//           <Text style={styles.timeAgo}>{timeAgo}</Text>
//         </View>
//         <TouchableOpacity style={styles.optionsButton}>
//           <Text style={styles.actionText}>. . .</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Post Text Content */}
//       <Text style={styles.postText}>{post.text}</Text>
      
//       {/* Post Images (if any) */}
//       {post.hasImages && post.images && post.images.length > 0 && (
//         <ImageCarousel images={post.images} />
//       )}
      
//       {/* Job Card (if any) */}
//       {post.hasJob && post.jobData && <JobCard job={post.jobData} />}

//       {/* Post Stats (likes, comments) */}
//       <View style={styles.postStats}>
//         {post.likes > 0 && (
//           <View style={styles.statItem}>
//             <View style={styles.likeIconContainer}>
//               <AntDesign name="like1" size={12} color="#fff" style={styles.likeIcon} />
//             </View>
//             <Text style={styles.statText}>{post.likes}</Text>
//           </View>
//         )}
        
//         {post.comments > 0 && (
//           <TouchableOpacity style={styles.commentsLink}>
//             <Text style={styles.statText}>{post.comments} comments</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.postFooter}>
//         <TouchableOpacity style={styles.actionButton}>
//           <AntDesign name="like2" size={18} color={Colors.iconsColor} />
//           <Text style={styles.actionText}>Like</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.actionButton}>
//           <MaterialIcons name="comment" size={18} color={Colors.iconsColor} />
//           <Text style={styles.actionText}>Comment</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.actionButton}>
//           <MaterialIcons name="share" size={18} color={Colors.iconsColor} />
//           <Text style={styles.actionText}>Share</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default PostCard;

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../../styles/FeedStyles';
import { Colors } from '../../../constants/constantStyles';
import JobCard from './JobCard';
import ImageCarousel from './ImageCarousel';
import VideoPlayer from './VideoPlayer'; // New component for playing videos

// Simple function to format timestamps to "time ago" format
const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'recently';
  
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

const PostCard = ({ post }) => {
  // Format timestamp to "time ago" format (e.g., "2 hours ago")
  const timeAgo = post.timestamp ? formatTimeAgo(post.timestamp) : 'recently';

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.image }} style={styles.profileImage} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{post.name}</Text>
          <Text style={styles.userTitle}>{post.title}</Text>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Entypo name="dots-three-vertical" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Post Text Content */}
      <Text style={styles.postText}>{post.text}</Text>
      
      {/* Post Media Content (Images or Video) */}
      {post.hasImages && post.images && post.images.length > 0 && (
        <ImageCarousel images={post.images} />
      )}
      
      {/* Video/Reel Content */}
      {post.hasVideo && post.videoUrl && (
        <VideoPlayer 
          videoUrl={post.videoUrl}
          thumbnail={post.thumbnail}
          duration={post.duration}
          views={post.views}
        />
      )}
      
      {/* Job Card (if any) */}
      {post.hasJob && post.jobData && <JobCard job={post.jobData} />}

      {/* Post Stats (likes, comments) */}
      <View style={styles.postStats}>
        {post.likes > 0 && (
          <View style={styles.statItem}>
            <View style={styles.likeIconContainer}>
              <AntDesign name="like1" size={12} color="#fff" style={styles.likeIcon} />
            </View>
            <Text style={styles.statText}>{post.likes}</Text>
          </View>
        )}
        
        {post.comments > 0 && (
          <TouchableOpacity style={styles.commentsLink}>
            <Text style={styles.statText}>{post.comments} comments</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="like2" size={18} color={Colors.iconsColor} />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="comment" size={18} color={Colors.iconsColor} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="share" size={18} color={Colors.iconsColor} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;