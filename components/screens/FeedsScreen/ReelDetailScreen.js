// ReelDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Video from 'react-native-video';
import { Colors } from '../../../constants/constantStyles';

const ReelDetailScreen = ({ route }) => {
  const { reel } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Reels</Text>
      <Video
        source={{ uri: reel.videoUrl }}
        style={styles.video}
        resizeMode="contain"
        controls={true}
        muted={false}
        repeat={true}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{reel.title}</Text>
        <Text style={styles.userName}>{reel.userName}</Text>
        <Text style={styles.views}>{reel.views} views</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heading:{
    color:Colors.text,
    fontSize:20,
    margin:20,
  },
  video: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userName: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  views: {
    color: '#999',
    fontSize: 14,
  },
});

export default ReelDetailScreen;