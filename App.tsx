// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './components/navigation/AppNavigator';


// function App () {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;