import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../styles/FeedStyles';

const JobCard = ({ job }) => (
  <View style={styles.jobOpportunityCard}>
    <Text style={styles.jobOpportunityTitle}>💼 Job Opportunity</Text>
    <Text style={styles.jobTitle}>{job.title}</Text>
    <Text style={styles.jobLocation}>{job.text}</Text>
    <TouchableOpacity style={styles.viewDetailsButton}>
      <Text style={styles.viewDetailsText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

export default JobCard;
