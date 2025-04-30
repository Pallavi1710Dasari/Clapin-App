import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, fontFamily } from '../../constants/constantStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Avatar component for profile pictures
export const Avatar = ({ source, size = 50, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Image 
        source={{ uri: source }} 
        style={[
          styles.avatar, 
          { width: size, height: size, borderRadius: size / 2 }
        ]} 
      />
    </TouchableOpacity>
  );
};

// Header component for screens
export const Header = ({ title, onBack, rightComponent }) => {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={Colors.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>{rightComponent}</View>
    </View>
  );
};

// Button component
export const Button = ({ 
  title, 
  onPress, 
  type = 'primary', // primary, secondary, outline
  icon,
  size = 'medium', // small, medium, large
  disabled = false,
  fullWidth = false
}) => {
  const buttonStyles = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'secondary' && styles.secondaryButton,
    type === 'outline' && styles.outlineButton,
    size === 'small' && styles.smallButton,
    size === 'large' && styles.largeButton,
    disabled && styles.disabledButton,
    fullWidth && styles.fullWidthButton
  ];

  const textStyles = [
    styles.buttonText,
    type === 'outline' && styles.outlineButtonText,
    size === 'small' && styles.smallButtonText
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress} 
      disabled={disabled}
    >
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

// Card component for posts & connection items
export const Card = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

// Divider component
export const Divider = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

// Icon button component
export const IconButton = ({ iconName, size = 24, color = Colors.primary, onPress, library = 'AntDesign' }) => {
  let Icon;
  switch (library) {
    case 'Ionicons':
      Icon = Ionicons;
      break;
    case 'MaterialCommunityIcons':
      Icon = MaterialCommunityIcons;
      break;
    default:
      Icon = AntDesign;
  }

  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

// Social action bar component (like, comment, share)
export const SocialActionBar = ({ 
  likes, 
  comments, 
  shares, 
  isLiked = false,
  onLike, 
  onComment, 
  onShare 
}) => {
  return (
    <View style={styles.socialActionBar}>
      <TouchableOpacity style={styles.actionButton} onPress={onLike}>
        <AntDesign 
          name={isLiked ? "heart" : "hearto"} 
          size={22} 
          color={isLiked ? Colors.primary : Colors.iconsColor} 
        />
        {likes > 0 && <Text style={styles.actionText}>{likes}</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton} onPress={onComment}>
        <AntDesign name="message1" size={22} color={Colors.iconsColor} />
        {comments > 0 && <Text style={styles.actionText}>{comments}</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton} onPress={onShare}>
        <AntDesign name="sharealt" size={22} color={Colors.iconsColor} />
        {shares > 0 && <Text style={styles.actionText}>{shares}</Text>}
      </TouchableOpacity>
    </View>
  );
};

// Section header component
export const SectionHeader = ({ title, onSeeAll }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Avatar styles
  avatar: {
    borderWidth: 2,
    borderColor: Colors.primary
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderColor,
    backgroundColor: Colors.headerBackground
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Colors.text,
    flex: 1,
    //textAlign: 'center'
  },
  backButton: {
    padding: 8
  },
  headerRight: {
    flexDirection: 'row'
  },
  
  // Button styles
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 5
  },
  primaryButton: {
    backgroundColor: Colors.primary
  },
  secondaryButton: {
    backgroundColor: Colors.secondary
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20
  },
  disabledButton: {
    opacity: 0.5
  },
  fullWidthButton: {
    width: '100%'
  },
  buttonText: {
    color: Colors.textBlack,
    fontFamily: fontFamily.medium,
    fontSize: 16
  },
  outlineButtonText: {
    color: Colors.primary
  },
  smallButtonText: {
    fontSize: 14
  },
  buttonIcon: {
    marginRight: 8
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 15
  },
  
  // Divider styles
  divider: {
    height: 1,
    backgroundColor: Colors.seperatorLineColor,
    marginVertical: 12
  },
  
  // Icon button styles
  iconButton: {
    padding: 8
  },
  
  // Social action bar styles
  socialActionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: Colors.seperatorLineColor,
    marginTop: 10
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6
  },
  actionText: {
    marginLeft: 5,
    color: Colors.text,
    fontFamily: fontFamily.regular,
    fontSize: 14
  },
  
  // Section header styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Colors.text
  },
  seeAllText: {
    color: Colors.primary,
    fontFamily: fontFamily.medium,
    fontSize: 14
  }
});