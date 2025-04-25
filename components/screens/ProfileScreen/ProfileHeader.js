import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';

const ProfileHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}
          onPress={() => navigation.navigate('AccountSettings')}
        >
          <AntDesign name="setting" size={24} color={Colors.placeholderTextColorSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 4,
  },
});

export default ProfileHeader;