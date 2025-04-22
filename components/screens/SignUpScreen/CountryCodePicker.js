import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  TextInput,
  StyleSheet 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';
import { countryCodes } from '../../../data/countryCodes';

const CountryCodePicker = ({ selectedCode, onSelectCode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  // Filter country codes based on search
  const filteredCodes = searchText 
    ? countryCodes.filter(item => 
        item.country.toLowerCase().includes(searchText.toLowerCase()) || 
        item.code.includes(searchText)
      )
    : countryCodes;
    
  // Render each country code item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        onSelectCode(item.code);
        setModalVisible(false);
      }}
    >
      <Text style={styles.countryCode}>{item.code}</Text>
      <Text style={styles.countryName}>{item.country}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View>
      <TouchableOpacity 
        style={styles.codeButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.codeButtonText}>{selectedCode}</Text>
        <MaterialIcons name="arrow-drop-down" size={16} color={Colors.primary} />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country Code</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={20} color="#999" style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by country or code"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            <FlatList
              data={filteredCodes}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              style={styles.codeList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.iconsBackgroundColor,
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: Colors.borderColor,
    padding: 10,
    paddingHorizontal: 12,
    height: '90%',
    minWidth: 80,
  },
  codeButtonText: {
    color: Colors.text,
    fontSize: 16,
    marginRight: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: Colors.text,
    fontSize: 16,
  },
  codeList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  countryCode: {
    width: 70,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  countryName: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default CountryCodePicker;