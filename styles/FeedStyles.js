// import { StyleSheet } from 'react-native';
// import { Colors, fontFamily } from '../constants/constantStyles';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
  
//   // Header styles
//   header: {
//     marginTop: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     backgroundColor: Colors.headerBackground,
//   },
//   headerTitle: {
//     fontSize: 22,
//     color: Colors.text,
//     fontWeight: 'bold',
//     fontFamily: fontFamily.regular,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerIconButton: {
//     marginLeft: 15,
//   },
  
//   // Status update container (LinkedIn style)
//   statusUpdateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.seperatorLineColor,
//     backgroundColor: Colors.headerBackground,
//   },
//   profileThumbnail: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   statusInputButton: {
//     flex: 1,
//     backgroundColor: Colors.jobCardBackground,
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//   },
//   statusInputText: {
//     color: Colors.textGray,
//     fontSize: 16,
//     fontFamily: fontFamily.regular,
//   },
  
//   // Post type shortcuts (Photo, Video, etc.)
//   postTypeShortcuts: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     backgroundColor: Colors.headerBackground,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.seperatorLineColor,
//   },
//   postTypeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   postTypeText: {
//     marginLeft: 6,
//     color: Colors.textGray,
//     fontSize: 14,
//     fontFamily: fontFamily.regular,
//   },
  
//   // Content filters (All, Jobs, Photos, etc.)
//   filtersContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: Colors.headerBackground,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.seperatorLineColor,
//   },
//   filterButton: {
//     paddingHorizontal: 25,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 8,
//     backgroundColor: Colors.jobCardBackground,
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     height:34,
//    // width:"20%",
//     marginBottom:10,
//   },
//   activeFilterButton: {
//     backgroundColor: Colors.primary,
//     borderColor: Colors.primary,
//   },
//   filterText: {
//     color: Colors.text,
//     fontWeight: '500',
//     fontSize: 14,
//     fontFamily: fontFamily.regular,
//   },
//   activeFilterText: {
//     color: Colors.textBlack,
//     fontWeight: 'bold',
//     fontSize: 14,
//     fontFamily: fontFamily.regular,
//   },
  
//   // Loading indicator
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 30,
//   },
//   loadingText: {
//     color: Colors.textGray,
//     marginTop: 10,
//     fontSize: 16,
//     fontFamily: fontFamily.regular,
//   },
  
//   // Post card styles
//   postContainer: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.seperatorLineColor,
//     marginBottom: 7,
//     backgroundColor: Colors.headerBackground,
//   },
//   postHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 13,
//   },
//   userInfoContainer: {
//     flex: 1,
//   },
//   userName: {
//     fontWeight: '430',
//     color: Colors.text,
//     fontSize: 19,
//     fontFamily: fontFamily.regular,
//   },
//   userTitle: {
//     fontSize: 14,
//     color: Colors.textGray,
//     fontFamily: fontFamily.regular,
//   },
//   timeAgo: {
//     color: Colors.textGray,
//     fontSize: 12,
//     fontFamily: fontFamily.regular,
//   },
//   optionsButton: {
//     marginLeft: 'auto',
//   },
//   postText: {
//     color: Colors.placeholderTextColorPrimary,
//     marginBottom: 15,
//     fontSize: 16,
//     fontFamily: fontFamily.regular,
//   },
  
//   // Post stats (likes, comments count)
//   postStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.seperatorLineColor,
//   },
//   statItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   likeIconContainer: {
//     backgroundColor: Colors.primary,
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//   },
//   likeIcon: {
//     marginTop: -2, // Adjust icon position
//   },
//   statText: {
//     color: Colors.textGray,
//     fontSize: 14,
//     fontFamily: fontFamily.regular,
//   },
//   commentsLink: {
//     marginLeft: 'auto',
//   },
  
//   // Job card styles
//   jobOpportunityCard: {
//     backgroundColor: Colors.jobCardBackground,
//     padding: 15,
//     borderRadius: 8,
//     borderColor: Colors.borderColor,
//     borderWidth: 1,
//     marginVertical: 12,
//   },
//   jobOpportunityTitle: {
//     fontWeight: '350',
//     color: Colors.primary,
//     marginBottom: 5,
//     fontSize: 17,
//     fontFamily: fontFamily.regular,
//   },
//   jobTitle: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: Colors.text,
//     marginBottom: 8,
//     fontFamily: fontFamily.regular,
//   },
//   jobDetailsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   jobCompany: {
//     color: Colors.text,
//     fontSize: 16,
//     marginLeft: 8,
//     fontFamily: fontFamily.regular,
//   },
//   jobLocation: {
//     fontSize: 16,
//     color: Colors.placeholderTextColorSecondary,
//     marginLeft: 8,
//     fontFamily: fontFamily.regular,
//   },
//   jobSalary: {
//     fontSize: 16,
//     color: Colors.placeholderTextColorSecondary,
//     marginLeft: 8,
//     fontFamily: fontFamily.regular,
//   },
//   jobEmploymentType: {
//     fontSize: 16,
//     color: Colors.placeholderTextColorSecondary,
//     marginLeft: 8,
//     fontFamily: fontFamily.regular,
//   },
//   jobDescription: {
//     color: Colors.placeholderTextColorPrimary,
//     fontSize: 16,
//     lineHeight: 22,
//     marginVertical: 8,
//     fontFamily: fontFamily.regular,
//   },
//   jobButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   applyNowButton: {
//     backgroundColor: Colors.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   applyNowText: {
//     color: Colors.textBlack,
//     fontWeight: 'bold',
//     fontFamily: fontFamily.regular,
//   },
//   viewDetailsButton: {
//     backgroundColor: Colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 0,
//     alignSelf: 'flex-start',
//     flex: 1,
//     alignItems: 'center',
//   },
//   viewDetailsText: {
//     color: Colors.textBlack,
//     fontWeight: 'bold',
//     fontFamily: fontFamily.regular,
//   },
  
//   // Post footer styles (action buttons)
//   postFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//     paddingTop: 8,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 4,
//     flex: 1,
//   },
//   actionText: {
//     color: Colors.placeholderTextColorPrimary,
//     marginLeft: 5,
//     fontSize: 14,
//     fontFamily: fontFamily.regular,
//   },
  
//   // End of feed indicator
//   endOfFeedContainer: {
//     alignItems: 'center',
//     padding: 20,
//     paddingBottom: 40,
//   },
//   endOfFeedText: {
//     color: Colors.textGray,
//     fontSize: 14,
//     textAlign: 'center',
//     fontFamily: fontFamily.regular,
//   },
// });

// export default styles;

import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/constantStyles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerProfileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    marginLeft: 15,
  },
  
  // Filters styles
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 25,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginLeft:5,
        backgroundColor: Colors.jobCardBackground,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        height:34,
       // width:"20%",
        marginBottom:10,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
    
  },
  filterText: {
    color: '#fff',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#000',
    fontWeight: 'bold',
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  
  // Post styles
  postContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  userTitle: {
    fontSize: 14,
    color: Colors.textGray,
  },
  timeAgo: {
    fontSize: 12,
    color: Colors.textGray,
    marginTop: 2,
  },
  optionsButton: {
    padding: 5,
  },
  postText: {
    color: Colors.placeholderTextColorPrimary,
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  
  // Post stats styles
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIcon: {
    marginLeft: 0.5,
  },
  statText: {
    color: Colors.textGray,
    fontSize: 12,
    marginLeft: 5,
  },
  commentsLink: {
    paddingVertical: 2,
  },
  
  // Post footer styles
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionText: {
    color: Colors.placeholderTextColorPrimary,
    marginLeft: 5,
    fontSize: 12,
  },
  
  // End of feed styles
  endOfFeedContainer: {
    padding: 20,
    alignItems: 'center',
  },
  endOfFeedText: {
    color: Colors.textGray,
    textAlign: 'center',
    fontSize: 14,
  },
  
  // Job card styles
  jobOpportunityCard: {
    backgroundColor: Colors.jobCardBackground,
    padding: 10,
    margin: 15,
    // marginTop: 5,
    borderRadius: 8,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    marginVertical: 8,
  },
  jobOpportunityTitle: {
    color: Colors.textGray,
    fontSize: 14,
    marginBottom: 8,
  },
  jobTitle: {
    color: Colors.placeholderTextColorPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobCompany: {
    color: Colors.placeholderTextColorPrimary,
    marginLeft: 8,
    fontSize: 14,
  },
  jobLocation: {
    color: Colors.textGray,
    marginLeft: 8,
    fontSize: 14,
  },
  jobSalary: {
    color: Colors.textGray,
    marginLeft: 8,
    fontSize: 14,
  },
  jobEmploymentType: {
    color: Colors.textGray,
    marginLeft: 8,
    fontSize: 14,
  },
  jobDescription: {
    color: Colors.placeholderTextColorSecondary,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 10,
  },
  jobButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  applyNowButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 0.48,
    alignItems: 'center',
  },
  applyNowText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewDetailsButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 0.48,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
  },
  
  // Reels section styles
  reelsContainer: {
    marginVertical: 15,
  },
  reelsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
  },
  reelsList: {
    paddingLeft: 15,
  },
  
  // Create post button
  createPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default styles;