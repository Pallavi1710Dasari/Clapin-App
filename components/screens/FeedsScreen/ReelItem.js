// import React from 'react';
// import { 
//   View, 
//   Text, 
//   Image, 
//   StyleSheet, 
//   TouchableOpacity, 
//   Dimensions
// } from 'react-native';
// import Video from 'react-native-video'; 
// import { Colors } from '../../../constants/constantStyles';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const { width } = Dimensions.get('window');
// const REEL_WIDTH = width * 0.35;

// const ReelItem = ({ reel }) => {
//   return (
//     <TouchableOpacity style={styles.container}>
//       <View style={styles.reelContent}>
//         {/* Reel Thumbnail */}
//         <Image 
//           source={{ uri: reel.thumbnail }}
//           style={styles.thumbnail}
//           resizeMode="cover"
//         />
        
//         {/* Overlay Elements */}
//         <View style={styles.overlayContainer}>
//           {/* Views Count Badge */}
//           <View style={styles.viewsContainer}>
//             <MaterialIcons name="visibility" size={14} color="white" />
//             <Text style={styles.viewsText}>{reel.views}</Text>
//           </View>
          
//           {/* Play Icon */}
//           <View style={styles.playIconContainer}>
//             <Ionicons name="play" size={24} color="white" />
//           </View>
          
//           {/* User Info at Bottom */}
//           <View style={styles.userInfoContainer}>
//             <Image 
//               source={{ uri: reel.userImage }}
//               style={styles.userImage}
//             />
//             <Text style={styles.userName} numberOfLines={1}>{reel.userName}</Text>
//           </View>
          
//           {/* Duration */}
//           <View style={styles.durationContainer}>
//             <Text style={styles.durationText}>{reel.duration}</Text>
//           </View>
//         </View>
        
//         {/* Reel Title */}
//         <Text style={styles.title} numberOfLines={1}>{reel.title}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: REEL_WIDTH,
//     marginRight: 10,
//   },
//   reelContent: {
//     position: 'relative',
//   },
//   thumbnail: {
//     width: REEL_WIDTH,
//     height: REEL_WIDTH * 1.8,
//     borderRadius: 12,
//   },
//   overlayContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   viewsContainer: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   viewsText: {
//     color: 'white',
//     marginLeft: 3,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   playIconContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: -15 },
//       { translateY: -15 }
//     ],
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userInfoContainer: {
//     position: 'absolute',
//     bottom: 8,
//     left: 8,
//     right: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userImage: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'white',
//   },
//   userName: {
//     color: 'white',
//     marginLeft: 4,
//     fontSize: 12,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//     flex: 1,
//   },
//   durationContainer: {
//     position: 'absolute',
//     bottom: 8,
//     right: 8,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   durationText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   title: {
//     marginTop: 6,
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default ReelItem;

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import Video from 'react-native-video'; // Import the video component
import { Colors } from '../../../constants/constantStyles';
import Entypo from 'react-native-vector-icons/Entypo'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const REEL_WIDTH = width * 0.35;

const ReelItem = ({ reel, onPress }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePress = () => {
    setPlaying(!playing);
    if (onPress) onPress(reel);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.reelContent}>
        {playing && reel.videoUrl ? (
          <Video
            ref={videoRef}
            source={{ uri: reel.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            controls={true}
            muted={false}
            repeat={true}
            paused={!playing}
          />
        ) : (
          <>
            {/* Thumbnail and overlay shown when not playing */}
            <Image 
              source={{ uri: reel.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            
            {/* Overlay Elements */}
            <View style={styles.overlayContainer}>
              {/* Views Count Badge */}
              <View style={styles.viewsContainer}>
                <MaterialIcons name="visibility" size={14} color="white" />
                <Text style={styles.viewsText}>{reel.views}</Text>
              </View>
              
              {/* Play Icon */}
              <View style={styles.playIconContainer}>
                <Entypo name="controller-play" size={24} color="white" />
              </View>
              
              {/* User Info at Bottom */}
              <View style={styles.userInfoContainer}>
                <Image 
                  source={{ uri: reel.userImage }}
                  style={styles.userImage}
                />
                <Text style={styles.userName} numberOfLines={1}>{reel.userName}</Text>
              </View>
              
              {/* Duration */}
              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>{reel.duration}</Text>
              </View>
            </View>
          </>
        )}
        
        {/* Reel Title */}
        <Text style={styles.title} numberOfLines={1}>{reel.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   container: {
    width: REEL_WIDTH,
    marginRight: 10,
  },
  reelContent: {
    position: 'relative',
  },
  thumbnail: {
    width: REEL_WIDTH,
    height: REEL_WIDTH * 1.8,
    borderRadius: 12,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  viewsContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    color: 'white',
    marginLeft: 3,
    fontSize: 12,
    fontWeight: 'bold',
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -15 },
      { translateY: -15 }
    ],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
  userName: {
    color: Colors.placeholderTextColorSecondary,
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    flex: 1,
  },
  durationContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 15,
    color: Colors.placeholderTextColorSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  video: {
    width: REEL_WIDTH,
    height: REEL_WIDTH * 1.8,
    borderRadius: 12,
  },
});

export default ReelItem;