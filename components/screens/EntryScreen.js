// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Colors } from '../../constants/constantStyles';

// const EntryScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Clapin 🎬</Text>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.background, // Black background
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: Colors.primary, // Yellow text
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: Colors.primary, // Yellow button
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: Colors.textBlack, // Black text
//     fontSize: 18,
//     fontWeight: 600,
//   },
// });

// export default EntryScreen;


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors } from '../../constants/constantStyles';
import { images } from '../../constants/constantStyles'; 

const EntryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Background circles */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      {/* Character mascot */}
      <View style={styles.characterContainer}>
        <View style={styles.character}>
          {/* You could replace this with an actual image */}
          {/* <Image source={images['logo']} style={styles.emoji} /> */}
          <Text style={styles.emoji}>🎬</Text>
        </View>
      </View>
      
      {/* Main content */}
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Welcome to Clapin!</Text>
        <Text style={styles.subheading}>
        Where cinema meets connection — {'\n'}your network, your next big role
        </Text>
        <Text style={styles.subheading}>
        Lights, camera, connections —{'\n'}your journey through the movie world starts here...
        </Text>
        </View>
       
      {/* Navigation buttons at bottom */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUpPageOne')}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Black background
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundCircle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#222222',
    top: '25%',
    left: '50%',
    marginLeft: -90,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1A1A1A',
    top: '15%',
    right: '20%',
  },
  backgroundCircle3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1A1A1A',
    top: '35%',
    left: '15%',
  },
  characterContainer: {
    position: 'absolute',
    top: 80,
    right: 40,
    zIndex: 10,
  },
  character: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  contentContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    paddingHorizontal: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary, // Yellow text
    marginBottom: 15,
  },
  subheading: {
    fontSize: 16,
    color: Colors.placeholderTextColorPrimary,
    lineHeight: 24,
    marginBottom:10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  signInButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: Colors.placeholderTextColorPrimary,
  },
  signUpButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
});

export default EntryScreen;