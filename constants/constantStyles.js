// const Colors = {
//     background: '#000000',      // black
//     primary: '#FFD700',         // yellow
//     text: '#FFFFFF',            // white
//     input: '#333',             // Dark grey for input Background
//     textBlack: '#000',         // Text with black color
//     textGray: 'gray',          // gray text
//     placeholderTextColorPrimary: "#ddd",   //placeholder Text with more white
//     placeholderTextColorSecondary: '#AAA',   //placeholder Text Color with less white
//     borderColor: 'rgba(247, 212, 15, 0.8)',    //Border color
//     headerBackground: '#2a2a2a',  //Top Header Color
//     seperatorLineColor: '#1f1e1e',   //Seperator Line Color
//     iconsColor: "#ddd",     //Icons Color
//     jobCardBackground: '#060126',  //Job Card Background
//     iconsBackgroundColor: '#444'  //Icons Background Color
//   };

//   const fontFamily= {
//     regular: 'Roboto-Regular',
//     bold: 'Roboto-Bold',
//     medium: 'Roboto-Medium',
//     light: 'Roboto-Light',
//   };

//   const images = {
//     logo: require('../assets/logoClapin.jpeg'),
//   };
  
  
  
//   export { Colors, fontFamily, images };

// Using the existing app constants
export const Colors = {
  background: '#000000',      // black
  primary: '#FFD700',         // yellow
  text: '#FFFFFF',            // white
  input: '#333',             // Dark grey for input Background
  textBlack: '#000',         // Text with black color
  textGray: 'gray',          // gray text
  placeholderTextColorPrimary: "#ddd",   //placeholder Text with more white
  placeholderTextColorSecondary: '#AAA',   //placeholder Text Color with less white
  borderColor: 'rgba(247, 212, 15, 0.8)',    //Border color
  headerBackground: '#2a2a2a',  //Top Header Color
  seperatorLineColor: '#1f1e1e',   //Seperator Line Color
  iconsColor: "#ddd",     //Icons Color
  jobCardBackground: '#060126',  //Job Card Background
  iconsBackgroundColor: '#444',  //Icons Background Color
  
  // Additional colors needed for new components (maintaining your color scheme)
  secondary: '#FFD700',      // Using primary for secondary as well
  cardBackground: '#0A0A0A', // Slightly lighter than background
  inputBackground: '#333',   // Using your input color
  textLight: 'gray',         // Using your textGray
  dividerColor: '#1f1e1e',   // Using your seperatorLineColor
  iconLight: "#ddd",         // Using your iconsColor
  error: '#ff6347',          // Tomato red for errors
  success: '#32CD32',        // Lime green for success
  white: '#FFFFFF',          // Using your text color
  black: '#000000',          // Using your background
};

export const fontFamily = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  medium: 'Roboto-Medium',
  light: 'Roboto-Light',
};

export const images = {
  logo: require('../assets/logoClapin.jpeg'),
};

// Typography - font sizes to maintain consistency across the app
export const Typography = {
  headingLarge: 24, // Large headings
  headingMedium: 20, // Medium headings
  headingSmall: 18, // Small headings
  bodyLarge: 16, // Large body text
  bodyMedium: 14, // Standard body text
  bodySmall: 12, // Small body text
  caption: 10 // Caption text
};

// Spacing - standardized spacing values
export const Spacing = {
  xs: 4, // Extra small spacing
  s: 8, // Small spacing
  m: 16, // Medium spacing
  l: 24, // Large spacing
  xl: 32, // Extra large spacing
  xxl: 48 // XXL spacing
};

// Border radius - standardized border radius values
export const BorderRadius = {
  xs: 4, // Extra small radius
  s: 8, // Small radius
  m: 12, // Medium radius
  l: 16, // Large radius
  xl: 24, // Extra large radius
  round: 999 // Fully rounded (for circular elements)
};

// Shadow - standardized shadow values
export const Shadow = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5
  }
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadow,
  fontFamily,
  images
};