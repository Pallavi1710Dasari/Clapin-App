// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   TouchableOpacity, 
//   Image,
//   TextInput,
//   StatusBar
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Colors } from '../../../constants/constantStyles';
// import { availableJobs, myJobs } from '../../../data/dummyJobsData';

// const JobsScreen = () => {
//   const navigation = useNavigation();
//   const [activeTab, setActiveTab] = useState('recommended');
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleCreateJob = () => {
//     // Navigate to the CreateJob screen in the MainStack
//     navigation.navigate('CreateJobStep1');
//   };

//   const handleJobPress = (job) => {
//     // Navigate to JobDetails with job data
//     navigation.navigate('JobDetails', { job });
//   };

//   const handleMyJobPress = (job) => {
//     // Navigate to JobDetails for posted jobs
//     navigation.navigate('JobDetails', { job, isOwnJob: true });
//   };

//   // Improved Job Item rendering with less information
//   const renderJobItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.jobCard}
//       onPress={() => handleJobPress(item)}
//     >
//       <View style={styles.jobHeader}>
//         <Image 
//           source={{ uri: item.companyLogo || 'https://via.placeholder.com/60' }} 
//           style={styles.companyLogo} 
//         />
//         <View style={styles.jobInfo}>
//           <Text style={styles.jobTitle}>{item.title}</Text>
//           <Text style={styles.companyName}>{item.company}</Text>
//           <Text style={styles.jobLocation}>{item.location}</Text>
//         </View>
//       </View>
      
//       <View style={styles.jobFooter}>
//         <Text style={styles.postedDate}>{item.postedDate || "Recently"}</Text>
//         {item.isEasyApply && (
//           <View style={styles.easyApplyBadge}>
//             <Text style={styles.easyApplyText}>Easy Apply</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   // Improved My Jobs item with less content
//   const renderMyJobItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.myJobCard}
//       onPress={() => handleMyJobPress(item)}
//     >
//       <View style={styles.myJobHeader}>
//         <View style={styles.myJobTitleArea}>
//           <Text style={styles.myJobTitle}>{item.title}</Text>
//           <Text style={styles.myJobLocation}>{item.location}</Text>
//         </View>
        
//         <View style={styles.statusBadge}>
//           <View style={[styles.statusDot, {backgroundColor: item.job_status === 'active' ? '#4CAF50' : '#F44336'}]} />
//           <Text style={styles.statusText}>{item.job_status || 'active'}</Text>
//         </View>
//       </View>
      
//       <View style={styles.myJobFooter}>
//         <Text style={styles.applicantCount}>{item.applicants_count || 0} applicants</Text>
//         <Text style={styles.postedDate}>Posted {item.created_at ? new Date(item.created_at).toLocaleDateString() : '2 weeks ago'}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#000" />
      
//       {/* Header with reduced top padding */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Jobs</Text>
          
//           {/* Search Bar */}
//           <View style={styles.searchContainer}>
//             <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search jobs"
//               placeholderTextColor="#999"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//           </View>
       
//           {/* <TouchableOpacity 
//             style={styles.postJobButton}
//             onPress={handleCreateJob}
//           >
//             <AntDesign name="plus" size={16} color="#fff" />
//             <Text style={styles.postJobText}>Post</Text>
//           </TouchableOpacity> */}
          

//       </View>
      
//       {/* Tab Navigation */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'recommended' && styles.activeTab]}
//           onPress={() => setActiveTab('recommended')}
//         >
//           <Text style={[styles.tabText, activeTab === 'recommended' && styles.activeTabText]}>
//             Recommended
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'myJobs' && styles.activeTab]}
//           onPress={() => setActiveTab('myJobs')}
//         >
//           <Text style={[styles.tabText, activeTab === 'myJobs' && styles.activeTabText]}>
//             My Jobs
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'createJobs' && styles.activeTab]}
//           onPress={handleCreateJob}
//         >
//           <Text style={[styles.tabText, activeTab === 'createJobs' && styles.activeTabText]}>
//             Create Jobs
//           </Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* Job List */}
//       {activeTab === 'recommended' ? (
//         <FlatList
//           data={availableJobs}
//           renderItem={renderJobItem}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <FlatList
//           data={myJobs}
//           renderItem={renderMyJobItem}
//           keyExtractor={item => item.job_id}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyContainer}>
//               <AntDesign name="filetext1" size={64} color="#666" />
//               <Text style={styles.emptyTitle}>No jobs posted yet</Text>
//               <Text style={styles.emptyText}>
//                 Your posted jobs will appear here
//               </Text>
//               <TouchableOpacity 
//                 style={styles.createJobBtn}
//                 onPress={handleCreateJob}
//               >
//                 <Text style={styles.createJobBtnText}>Create Job</Text>
//               </TouchableOpacity>
//             </View>
//           }
//         />
//       )}
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 10, // Reduced from 50
//     paddingBottom: 10, // Reduced from 16
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   postJobButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.primary,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 16,
//   },
//   postJobText: {
//     color: '#000',
//     fontWeight: 'bold',
//     marginLeft: 4,
//     fontSize: 14,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.input,
//     borderRadius: 8,
//     marginHorizontal: 16,
//     paddingHorizontal: 12,
//     marginTop:13,
//     marginBottom: 12, // Reduced from 16
//     height: 38, // Added fixed height
//     width: 270,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//     height: 40,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     marginBottom: 12, // Reduced from 16
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   tab: {
//     paddingVertical: 8, // Reduced from 12
//     marginRight: 24,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: Colors.primary,
//   },
//   tabText: {
//     fontSize: 16,
//     color: Colors.text,
//     fontWeight:600,
//   },
//   activeTabText: {
//     color: Colors.primary,
//     fontWeight: 'bold',
//   },
//   listContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
  
//   // Improved Job Card Styles
//   jobCard: {
//     backgroundColor: '#1E1E1E',
//     borderRadius: 8,
//     padding: 12, // Reduced from 16
//     marginBottom: 12, // Reduced from 16
//     borderWidth: 1,
//     borderColor: '#333',
//   },
//   jobHeader: {
//     flexDirection: 'row',
//     marginBottom: 8, // Reduced from 12
//   },
//   companyLogo: {
//     width: 40, // Reduced from 60
//     height: 40, // Reduced from 60
//     borderRadius: 4,
//     marginRight: 10,
//     backgroundColor: '#333',
//   },
//   jobInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   jobTitle: {
//     fontSize: 16, // Reduced from 18
//     fontWeight: 600,
//     color: Colors.placeholderTextColorPrimary,
//     marginBottom: 2,
//   },
//   companyName: {
//     fontSize: 14, // Reduced from 16
//     color: '#ccc',
//     marginBottom: 2,
//   },
//   jobLocation: {
//     fontSize: 12, // Reduced from 14
//     color: '#999',
//   },
//   jobFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   postedDate: {
//     fontSize: 12,
//     color: '#999',
//   },
//   easyApplyBadge: {
//     backgroundColor: Colors.primary,
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   easyApplyText: {
//     color: '#000',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
  
//   // My Jobs styles - Improved and simplified
//   myJobCard: {
//     backgroundColor: '#1E1E1E',
//     borderRadius: 8,
//     padding: 12, // Reduced padding
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#333',
//   },
//   myJobHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 8,
//   },
//   myJobTitleArea: {
//     flex: 1,
//   },
//   myJobTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   myJobLocation: {
//     fontSize: 14,
//     color: '#999',
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#333',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginRight: 4,
//   },
//   statusText: {
//     fontSize: 12,
//     color: '#fff',
//   },
//   myJobFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//     paddingTop: 8,
//   },
//   applicantCount: {
//     fontSize: 12,
//     color: '#ccc',
//   },
//   // Empty state
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingHorizontal: 32,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   createJobBtn: {
//     backgroundColor: Colors.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   createJobBtnText: {
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// };

// export default JobsScreen;

// JobsScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
  ScrollView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/constantStyles';
import { availableJobs } from '../../../data/dummyJobsData';

const JobsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Navigate to job creation screen
  const handleCreateJob = () => {
    navigation.navigate('CreateJobStep1');
  };

  // Navigate to Applied Jobs screen
  const handleAppliedJobs = () => {
    navigation.navigate('AppliedJobs');
  };

  // Navigate to Created Jobs management
  const handleCreatedJobs = () => {
    navigation.navigate('CreatedJobs');
  };

  // Handle clicking on a job
  const handleJobPress = (job) => {
    navigation.navigate('JobDetails', { job });
  };

  // Render single job item in the list
  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={() => handleJobPress(item)}
    >
      <View style={styles.jobHeader}>
        <Image 
          source={{ uri: item.companyLogo || 'https://via.placeholder.com/60' }} 
          style={styles.companyLogo} 
        />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
          <Text style={styles.jobLocation}>{item.location}</Text>
        </View>
      </View>
      
      <View style={styles.jobFooter}>
        <Text style={styles.postedDate}>{item.postedDate || "Recently"}</Text>
        {item.isEasyApply && (
          <View style={styles.easyApplyBadge}>
            <Text style={styles.easyApplyText}>Easy Apply</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs</Text>
          
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Tab Navigation */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContainer}
      >
        <TouchableOpacity 
          style={[styles.tab, styles.activeTab]}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>
            Recommended
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tab}
          onPress={handleAppliedJobs}
        >
          <Text style={styles.tabText}>
            Applied Jobs
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tab}
          onPress={handleCreateJob}
        >
          <Text style={styles.tabText}>
            Post Job
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tab}
          onPress={handleCreatedJobs}
        >
          <Text style={styles.tabText}>
            Manage Post Jobs
          </Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Job List */}
      <FlatList
        data={availableJobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.input || '#1E1E1E',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginTop: 13,
    marginBottom: 5,
    height: 38,
    width: 270,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: 40,
  },
  tabScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    paddingVertical: -50,
    paddingHorizontal: 10,
    marginRight: 10,
    height:'140%'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.text || '#fff',
    fontWeight: '600',
    textalign:'center'
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  
  // Job Card Styles
  jobCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#333',
  },
  jobInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 12,
    color: '#999',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  postedDate: {
    fontSize: 12,
    color: '#999',
  },
  easyApplyBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  easyApplyText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  }
};

export default JobsScreen;