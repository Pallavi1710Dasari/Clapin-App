import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/constantStyles';

const ProfileStats = ({ stats }) => {
  return (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <Text style={styles.statNumber}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.placeholderTextColorSecondary,
  },
});

export default ProfileStats;