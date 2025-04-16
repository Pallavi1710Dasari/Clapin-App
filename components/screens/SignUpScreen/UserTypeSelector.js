import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';

const UserTypeSelector = ({ options, onSelect }) => {
  return (
    <View style={styles.container}>
      <View style={styles.methodSelector}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.methodButton,
              option.selected && styles.activeMethodButton
            ]}
            onPress={() => {
              console.log("Clicked option:", option.type);
              onSelect(option.type);
            }}
          >
            <Text
              style={[
                styles.methodButtonText,
                option.selected && styles.activeMethodButtonText
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
    marginBottom: 5,
  },
  methodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(77, 75, 75, 0.3)',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 5,
    width: '100%',
  },
  methodButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  activeMethodButton: {
    backgroundColor: "rgba(245, 216, 54, 0.75)",
  },
  methodButtonText: {
    color: Colors.text,
    fontSize: 16,
    opacity: 0.7,
  },
  activeMethodButtonText: {
    color: Colors.textBlack,
    fontWeight: 'bold',
    opacity: 1,
  },
});

export default UserTypeSelector;