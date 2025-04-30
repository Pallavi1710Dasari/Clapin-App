import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../styles/FeedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/constantStyles';

const JobCard = ({ job }) => (
  <View style={styles.jobOpportunityCard}>
    <Text style={styles.jobOpportunityTitle}>💼 Job Opportunity</Text>
    
    <Text style={styles.jobTitle}>{job.title}</Text>
    
    <View style={styles.jobDetailsRow}>
      <MaterialIcons name="business" size={16} color={Colors.primary} />
      <Text style={styles.jobCompany}>{job.company}</Text>
    </View>
    
    <View style={styles.jobDetailsRow}>
      <MaterialIcons name="location-on" size={16} color={Colors.primary} />
      <Text style={styles.jobLocation}>{job.location}</Text>
    </View>
    
    {/* Only show a truncated description */}
    <Text style={styles.jobDescription} numberOfLines={2}>
      {job.text}
    </Text>
    
    {/* Simplified buttons row */}
    <View style={styles.jobButtonsContainer}>
      <TouchableOpacity style={styles.applyNowButton}>
        <Text style={styles.applyNowText}>Apply</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default JobCard;