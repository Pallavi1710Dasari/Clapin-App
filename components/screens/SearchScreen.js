// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import {Colors} from '../../constants/constantStyles';

// const SearchScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📝 Search Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background, // Black background
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: Colors.primary, // Yellow header
//     marginBottom: 20,
//   },
//   postText: {
//     fontSize: 16,
//     color: Colors.text, // White text for readability
//     textAlign: 'center',
//     marginBottom: 10,
//     lineHeight: 24,
//   },
// });

// export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/constantStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const dummyData = [
  {
    id: '1',
    name: 'John Doe',
    headline: 'Frontend Developer at Google',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    headline: 'UX Designer at Meta',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    headline: 'Data Scientist at Netflix',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Alice Johnson',
    headline: 'Software Engineer at Amazon',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const SearchScreen = () => {
  const [search, setSearch] = useState('');

  const filteredData = dummyData.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.headline}>{item.headline}</Text>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <AntDesign name="search1" size={24} color={Colors.iconsColor} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search people, jobs, companies..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputContainer:{
   flexDirection:"row",
  },
  searchInput: {
    height: 45,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    marginBottom: 12,
  },
  searchIcon:{
    margin:10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headline: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 6,
  },
  connectButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  connectText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SearchScreen;
