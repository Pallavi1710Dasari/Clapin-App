import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../../styles/FeedStyles';
import PostCard from './PostCard';
import { posts, job } from '../../../data/posts';

const FeedsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clapin</Text>
      </View>
      <ScrollView>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} job={job} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeedsScreen;
