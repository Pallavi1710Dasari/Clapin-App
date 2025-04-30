import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Colors, fontFamily } from '../../../constants/constantStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Avatar, Card, Button, Divider } from '../../commonComponents/commonComponents';

// Connection request item component
export const ConnectionRequestItem = ({ request, onAccept, onIgnore }) => {
  const { name, profilePic, title, mutualConnections, timestamp } = request;
  
  return (
    <Card>
      <View style={styles.requestContainer}>
        <View style={styles.userInfoContainer}>
          <Avatar source={profilePic} size={60} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userTitle}>{title}</Text>
            {mutualConnections > 0 && (
              <Text style={styles.mutualText}>
                {mutualConnections} mutual connection{mutualConnections > 1 ? 's' : ''}
              </Text>
            )}
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            title="Accept" 
            type="primary" 
            size="small" 
            onPress={() => onAccept(request.id)} 
          />
          <Button 
            title="Ignore" 
            type="outline" 
            size="small"
            color="white" 
            onPress={() => onIgnore(request.id)} 
          />
        </View>
      </View>
    </Card>
  );
};

// Connection requests list component
export const ConnectionRequestsList = ({ requests, onAccept, onIgnore }) => {
  if (!requests || requests.length === 0) return null;
  
  return (
    <View style={styles.requestsSection}>
      <View style={styles.requestsHeader}>
        <Text style={styles.requestsTitle}>Connection Requests</Text>
        <Text style={styles.requestsCount}>{requests.length}</Text>
      </View>
      
      {requests.map(request => (
        <ConnectionRequestItem 
          key={request.id} 
          request={request} 
          onAccept={onAccept} 
          onIgnore={onIgnore} 
        />
      ))}
    </View>
  );
};

// Connection item component (for existing connections)
export const ConnectionItem = ({ connection, onPress, onMessage }) => {
  const { name, profilePic, title, company, location, connected } = connection;
  
  return (
    <TouchableOpacity style={styles.connectionItem} onPress={() => onPress(connection.id)}>
      <Avatar source={profilePic} size={55} />
      <View style={styles.connectionDetails}>
        <Text style={styles.connectionName}>{name}</Text>
        <Text style={styles.connectionTitle}>{title}</Text>
        <Text style={styles.connectionInfo}>{company} • {location}</Text>
        <Text style={styles.connectionTime}>Connected {connected}</Text>
      </View>
      <TouchableOpacity 
        style={styles.messageButton} 
        onPress={() => onMessage(connection.id)}
      >
        <AntDesign name="plus" size={22} color={Colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Connections grid component
export const ConnectionsGrid = ({ connections, onPress, onMessage }) => {
  return (
    <View>
      {connections.map(connection => (
        <React.Fragment key={connection.id}>
          <ConnectionItem 
            connection={connection} 
            onPress={onPress} 
            onMessage={onMessage}
          />
          <Divider />
        </React.Fragment>
      ))}
    </View>
  );
};

// Suggestion item component
export const SuggestionItem = ({ suggestion, onConnect, onIgnore }) => {
  const { name, profilePic, title, company, mutualConnections } = suggestion;
  
  return (
    <Card style={styles.suggestionCard}>
      <View style={styles.suggestionHeader}>
        <Avatar source={profilePic} size={50} />
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => onIgnore(suggestion.id)}
        >
          <AntDesign name="close" size={18} color={Colors.textGray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.suggestionBody}>
        <Text style={styles.suggestionName}>{name}</Text>
        <Text style={styles.suggestionTitle}>{title}</Text>
        <Text style={styles.suggestionCompany}>{company}</Text>
        {mutualConnections > 0 && (
          <Text style={styles.mutualText}>
            {mutualConnections} mutual connection{mutualConnections > 1 ? 's' : ''}
          </Text>
        )}
      </View>
      
      <Button 
        title="Connect" 
        type="outline" 
        fullWidth
        onPress={() => onConnect(suggestion.id)} 
        icon={<AntDesign name="adduser" size={16} color={Colors.primary} />}
      />
    </Card>
  );
};

// Suggestions horizontal list
export const SuggestionsList = ({ suggestions, onConnect, onIgnore, onSeeMore }) => {
  if (!suggestions || suggestions.length === 0) return null;
  
  return (
    <View style={styles.suggestionsSection}>
      <View style={styles.suggestionsHeader}>
        <Text style={styles.suggestionsTitle}>People you may know</Text>
        <TouchableOpacity onPress={onSeeMore}>
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SuggestionItem 
            suggestion={item} 
            onConnect={onConnect} 
            onIgnore={onIgnore} 
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestionsContainer}
      />
    </View>
  );
};

// Search bar component
export const ConnectionsSearchBar = ({ onSearch, placeholder = "Search connections..." }) => {
  return (
    <View style={styles.searchContainer}>
      <AntDesign name="search1" size={18} color={Colors.textGray} />
      <TouchableOpacity 
        style={styles.searchInput}
        onPress={onSearch}
      >
        <Text style={styles.searchPlaceholder}>{placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Request styles
  requestContainer: {
    flexDirection:'row',
    alignItems: 'center', // Added to vertically align items in the row
    justifyContent:'space-between',
    padding: 3
  },
  userInfoContainer: {
    flexDirection: 'row', // Uncommented for horizontal layout
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 1,
    width:220,
    height:75,
  },
  userDetails: {
    marginLeft: 12,
    marginTop:10,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Colors.text,
    marginBottom: 2
  },
  userTitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 4
  },
  mutualText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 2
  },
  timestamp: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: Colors.textGray
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    gap: 10,
  },
  requestsSection: {
    marginBottom: 10
  },
  requestsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    marginTop:10,
  },
  requestsTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Colors.text
  },
  requestsCount: {
    backgroundColor: Colors.primary,
    color: Colors.textBlack,
    fontFamily: fontFamily.bold,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    marginLeft: 8
  },
  
  // Connection item styles
  connectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  connectionDetails: {
    flex: 1,
    marginLeft: 12
  },
  connectionName: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Colors.text,
    marginBottom: 2
  },
  connectionTitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 2
  },
  connectionInfo: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 2
  },
  connectionTime: {
    fontSize: 12,
    fontFamily: fontFamily.light,
    color: Colors.textGray
  },
  messageButton: {
    padding: 8
  },
  
  // Suggestion styles
  suggestionCard: {
    width: 220,
    marginRight: 12,
    padding: 12,
    backgroundColor: Colors.cardBackground
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  closeButton: {
    padding: 4
  },
  suggestionBody: {
    marginBottom: 10
  },
  suggestionName: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: Colors.text,
    marginBottom: 4
  },
  suggestionTitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 2
  },
  suggestionCompany: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: Colors.textGray,
    marginBottom: 6
  },
  
  // Suggestions section styles
  suggestionsSection: {
    marginBottom: 8
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12
  },
  suggestionsTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: Colors.text
  },
  seeMoreText: {
    color: Colors.primary,
    fontFamily: fontFamily.medium,
    fontSize: 14
  },
  suggestionsContainer: {
    paddingLeft: 16,
    paddingRight: 4
  },
  
  // Search bar styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.input,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 8
  },
  searchPlaceholder: {
    color: Colors.placeholderTextColorPrimary,
    fontFamily: fontFamily.regular,
    fontSize: 14
  }
});

export default {
  ConnectionRequestItem,
  ConnectionRequestsList,
  ConnectionItem,
  ConnectionsGrid,
  SuggestionItem,
  SuggestionsList,
  ConnectionsSearchBar
};