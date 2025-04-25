import { StyleSheet } from 'react-native';
import { Colors } from '../constants/constantStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileSection: {
    // alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
    alignItems:"center",
    justifyContent:'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editProfileImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '400',
    color: Colors.placeholderTextColorPrimary,
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: Colors.placeholderTextColorSecondary,
    marginBottom: 8,
    marginRight:50,
  },
  profileDetailsNames:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  profileRole: {
    fontSize: 16,
    color: Colors.placeholderTextColorPrimary,
    marginBottom: 8,
  },
  profileContainer: {
    // marginLeft:10,
    // marginRight:10,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  profileDetailsContainer:{
    marginLeft:5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLocation: {
    fontSize: 14,
    color: Colors.placeholderTextColorSecondary,
    marginLeft: 2,
  },
  profileActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  bioContainer: {
    width: '100%',
    marginTop: 16,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ddd',
    textAlign: 'left',
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '350',
    color: '#fff',
    marginBottom: 12,
  },
  // Post grid styles
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postTabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  postTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  emptyPostsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  emptyPostsText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;