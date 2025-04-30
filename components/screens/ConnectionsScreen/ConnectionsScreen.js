
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import { Colors, fontFamily } from '../../../constants/constantStyles';
import { 
  Header, 
  IconButton,
  Divider 
} from '../../commonComponents/commonComponents';
import {
  ConnectionsSearchBar,
  ConnectionRequestsList,
  ConnectionItem,
  SuggestionsList,
  ConnectionsGrid
} from './ConnectionComponents';

// Import mock data
import { connectionRequests, connections, suggestions } from '../../../data/dummyConnectionsData';

const ConnectionsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userConnections, setUserConnections] = useState(connections);
  const [pendingRequests, setPendingRequests] = useState(connectionRequests);
  const [userSuggestions, setUserSuggestions] = useState(suggestions);

  // Handle connection request actions
  const handleAcceptRequest = (requestId) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Move from requests to connections
      const acceptedRequest = pendingRequests.find(req => req.id === requestId);
      if (acceptedRequest) {
        // Format the accepted request into a connection object
        const newConnection = {
          id: acceptedRequest.id,
          name: acceptedRequest.name,
          profilePic: acceptedRequest.profilePic,
          title: acceptedRequest.title,
          company: 'New Connection',
          location: 'India',
          connected: 'just now'
        };
        
        // Update state
        setUserConnections([newConnection, ...userConnections]);
        setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleIgnoreRequest = (requestId) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
      setIsLoading(false);
    }, 1000);
  };

  // Handle connection actions
  const handleViewProfile = (connectionId) => {
    // Navigate to profile screen (not implemented yet)
    Alert.alert('View Profile', `Viewing profile of connection ${connectionId}`);
  };

  const handleMessageConnection = (connectionId) => {
    // Navigate to messages screen (not implemented yet)
    Alert.alert('Add', `Add to your connections ${connectionId}`);
  };

  // Handle suggestion actions
  const handleConnectSuggestion = (suggestionId) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Remove from suggestions
      setUserSuggestions(userSuggestions.filter(sugg => sugg.id !== suggestionId));
      
      // Show confirmation
      Alert.alert('Connection Request Sent', 'Your connection request has been sent successfully!');
      
      setIsLoading(false);
    }, 1000);
  };

  const handleIgnoreSuggestion = (suggestionId) => {
    // Remove from suggestions
    setUserSuggestions(userSuggestions.filter(sugg => sugg.id !== suggestionId));
  };

  const handleSeeMoreSuggestions = () => {
    // Navigate to see more suggestions screen (not implemented yet)
    Alert.alert('See More', 'View more connection suggestions');
  };

  // Handle search
  const handleSearch = () => {
    // Navigate to search screen (not implemented yet)
    Alert.alert('Search', 'Search for connections');
  };

  // Render connection item
  const renderConnectionItem = ({ item }) => (
    <ConnectionItem 
      connection={item}
      onPress={handleViewProfile}
      onMessage={handleMessageConnection}
    />
  );

  return (
    <View style={styles.container}>
      <Header 
        title="My Network" 
        rightComponent={
          <IconButton 
            iconName="setting" 
            size={24} 
            color={Colors.iconsColor} 
            onPress={() => Alert.alert('Settings', 'Network settings')} 
          />
        }
      />
      
      <ConnectionsSearchBar onSearch={handleSearch} />
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={userConnections}
          keyExtractor={(item) => item.id}
          renderItem={renderConnectionItem}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={() => (
            <>
              {/* Connection requests section */}
              {pendingRequests.length > 0 && (
                <ConnectionRequestsList 
                  requests={pendingRequests} 
                  onAccept={handleAcceptRequest}
                  onIgnore={handleIgnoreRequest}
                />
              )}
              
              {/* Suggestions section */}
              {userSuggestions.length > 0 && (
                <SuggestionsList 
                  suggestions={userSuggestions}
                  onConnect={handleConnectSuggestion}
                  onIgnore={handleIgnoreSuggestion}
                  onSeeMore={handleSeeMoreSuggestions}
                />
              )}
              
              {/* Connections header */}
              <Text style={styles.connectionsTitle}>
                Suggested For You 
              </Text>
            </>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You don't have any connections yet.
              </Text>
            </View>
          )}
          contentContainerStyle={
            userConnections.length === 0 ? 
            { flexGrow: 1, justifyContent: 'center' } : 
            { paddingBottom: 20 }
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  connectionsTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 20
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    color: Colors.textGray,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: 'center'
  },
  connectionDivider: {
    marginHorizontal: 16
  },
});

export default ConnectionsScreen;