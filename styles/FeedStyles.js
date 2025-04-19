import { StyleSheet } from 'react-native';
import { Colors, fontFamily } from '../constants/constantStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginTop:5,
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
    fontFamily: fontFamily.regular,
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


export default styles;

