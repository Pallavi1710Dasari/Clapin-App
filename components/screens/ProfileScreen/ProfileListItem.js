// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { Colors } from '../../../constants/constantStyles';

// const ProfileListItem = ({ icon, title, onPress, isDestructive = false, showChevron = true }) => {
//   return (
//     <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
//       <View style={styles.itemContent}>
//         <MaterialIcons 
//           name={icon} 
//           size={22} 
//           color={isDestructive ? '#FF6B6B' : Colors.placeholderTextColorSecondary} 
//           style={styles.itemIcon} 
//         />
//         <Text style={[
//           styles.itemTitle, 
//           isDestructive && styles.destructiveText
//         ]}>
//           {title}
//         </Text>
//       </View>
//       <MaterialIcons name="chevron-right" size={18} color="#666" />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#222',
//   },
//   itemContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemIcon: {
//     marginRight: 12,
//   },
//   itemTitle: {
//     fontSize: 16,
//     color: Colors.placeholderTextColorSecondary,
//   },
//   destructiveText: {
//     color: '#FF6B6B',
//   },
// });

// export default ProfileListItem;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/constantStyles';

const ProfileListItem = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  isDestructive = false,
  showChevron = true
}) => {
  return (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <MaterialIcons 
          name={icon} 
          size={22} 
          color={isDestructive ? '#FF6B6B' : Colors.placeholderTextColorPrimary} 
          style={styles.itemIcon} 
        />
        <View style={styles.textContainer}>
          <Text style={[
            styles.itemTitle, 
            isDestructive && styles.destructiveText
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      
      {showChevron && (
        <MaterialIcons 
          name="chevron-right" 
          size={18} 
          color="#666" 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  itemTitle: {
    fontSize: 16,
    color: Colors.placeholderTextColorPrimary,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  destructiveText: {
    color: '#FF6B6B',
  },
});

export default ProfileListItem;