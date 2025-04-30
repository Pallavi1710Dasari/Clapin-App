import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Dimensions 
} from 'react-native';
import Video from 'react-native-video'; // Make sure to install this package
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'; 
import { Colors } from '../../../constants/constantStyles';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.56; // 16:9 aspect ratio

const VideoPlayer = ({ videoUrl, thumbnail, duration, views }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle video load start
  const handleLoadStart = () => {
    setLoading(true);
  };

  // Handle video loaded
  const handleLoad = (data) => {
    setLoading(false);
    setTotalDuration(data.duration);
  };

  // Handle video progress
  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  // Handle video end
  const handleEnd = () => {
    setPlaying(false);
    setCurrentTime(0);
    videoRef.current.seek(0);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <View style={styles.container}>
      {/* Video/Thumbnail Container */}
      <TouchableOpacity 
        style={styles.videoContainer} 
        onPress={togglePlayPause}
        activeOpacity={0.9}
      >
        {playing ? (
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={styles.video}
            resizeMode="cover"
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onProgress={handleProgress}
            onEnd={handleEnd}
            paused={!playing}
            repeat={false}
          />
        ) : (
          <Image 
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}

        {/* Play/Pause Button Overlay */}
        {!playing && (
          <View style={styles.playButtonContainer}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={togglePlayPause}
            >
              <Entypo name="controller-play" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}

        {/* Views Badge */}
        {!playing && views && (
          <View style={styles.viewsBadge}>
            <MaterialIcons name="visibility" size={14} color="white" />
            <Text style={styles.viewsText}>{views}</Text>
          </View>
        )}

        {/* Duration Badge */}
        {!playing && duration && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}

        {/* Video Progress Bar (when playing) */}
        {playing && (
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${(currentTime / totalDuration) * 100}%` }
              ]} 
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  videoContainer: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  viewsBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.primary,
  },
  timeContainer: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default VideoPlayer;