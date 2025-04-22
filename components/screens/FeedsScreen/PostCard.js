import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../../styles/FeedStyles';
import { Colors } from '../../../constants/constantStyles';
import JobCard from './JobCard';

const PostCard = ({ post, job }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.userName}>{post.name}</Text>
          <Text style={styles.userTitle}>{post.title}</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Text style={styles.actionText}>. . .</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.postText}>{post.text}</Text>
      {post.jobCard && <JobCard job={job} />}

      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="hearto" size={18} color={Colors.iconsColor} />
          <Text style={styles.actionText}>156</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="comment" size={20} color={Colors.iconsColor} />
          <Text style={styles.actionText}>28</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="share" size={18} color={Colors.iconsColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;
