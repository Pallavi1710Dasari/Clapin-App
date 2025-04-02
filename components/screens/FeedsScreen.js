import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';

const posts = [
  {
    id: 1,
    name: "Emma Davis",
    title: "Producer • 8h ago",
    text: 'Just released the trailer for our upcoming film "The Last Night" - Check it out and let me know what you think!',
    image: "https://img.freepik.com/free-photo/handsome-young-businessman-suit_273609-6513.jpg",
    jobCard: true,
  },
  {
    id: 2,
    name: "John Smith",
    title: "Director • 12h ago",
    text: "Excited to share behind-the-scenes footage from our latest project!",
    image: "https://www.shutterstock.com/image-photo/smiling-confident-calm-millennial-european-260nw-2378358255.jpg",
    jobCard: false,
  },
  {
    id: 3,
    name: "Sophia Wilson",
    title: "Screenwriter • 1d ago",
    text: "Finished writing my latest script! Can't wait to see it come to life.",
    image: "https://media.istockphoto.com/id/2058319417/photo/face-business-and-woman-with-arms-crossed-smile-and-career-with-teamwork-meeting-or-planning.jpg?s=612x612&w=0&k=20&c=IwafinWO1ryhwrdA3fB4wU0AtwjT7CGOliNrQijNh3A=",
    jobCard: true,
  },
];


const jobs=
  { 
      id: 1,
      title: "Sound Engineer Needed",
      text: "For documentary project in Los Angeles",
  }


const FeedsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clapin</Text>
      </View>

      <ScrollView>
        
        {/* Posts */}
        {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
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

          {/* Job Opportunity Card */}
          {post.jobCard ? 
              <View style={styles.jobOpportunityCard}>
                <Text style={styles.jobOpportunityTitle}>💼  Job Opportunity</Text>
                <Text style={styles.jobTitle}>{jobs.title}</Text>
                <Text style={styles.jobLocation}>{jobs.text}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>

              : null
          }


          {/* Post Actions */}
          <View style={styles.postFooter}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={18} color={Colors.iconsColor} />
              <Text style={styles.actionText}>156</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={18} color={Colors.iconsColor} />
              <Text style={styles.actionText}>28</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={18} color={Colors.iconsColor} />
            </TouchableOpacity>
          </View>
        
        </View>
        
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.headerBackground,
  },
  headerTitle: {
    fontSize: 22,
    color: Colors.text,
    fontWeight: 'bold',
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.seperatorLineColor,
    marginTop: 5,
    marginBottom: 7,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 13,
  },
  userName: {
    fontWeight: 430,
    color: Colors.text,
    fontSize: 19,
  },
  userTitle: {
    fontSize: 14,
    color: Colors.textGray,
  },
  optionsButton: {
    marginLeft: 'auto',
  },
  postText: {
    color: Colors.placeholderTextColorPrimary,
    marginBottom: 15,
    fontSize:16,
    fontFamily:"sans-serif",
  },
  jobOpportunityCard: {
    backgroundColor: Colors.jobCardBackground,
    padding: 15,
    borderRadius: 8,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  jobOpportunityTitle: {
    fontWeight: 350,
    color: Colors.primary,
    marginBottom: 5,
    fontSize: 17,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: Colors.text,
    marginBottom: 3,
  },
  jobLocation: {
    fontSize: 16,
    color: Colors.placeholderTextColorSecondary,
  },
  viewDetailsButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: Colors.textBlack,
    fontWeight: 'bold',
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    color: Colors.placeholderTextColorPrimary,
    marginLeft: 5,
  },
});

export default FeedsScreen;
