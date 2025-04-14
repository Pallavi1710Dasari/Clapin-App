import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';

const UserTypeSelector = ({ options, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>I am a:</Text>
      <View style={styles.userTypeOptions}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.userTypeOption,
              option.selected && styles.userTypeOptionSelected,
            ]}
            onPress={() => onSelect(option.type)}
          >
            <Text
              style={[
                styles.userTypeText,
                option.selected && styles.userTypeTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  userTypeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userTypeOption: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
  },
  userTypeOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  userTypeText: {
    fontSize: 12,
    color: Colors.text,
  },
  userTypeTextSelected: {
    color: Colors.textBlack,
    fontWeight: 'bold',
  }
});

export default UserTypeSelector;