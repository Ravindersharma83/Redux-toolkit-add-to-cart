// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ProductScreen from './src/screens/ProductScreen';
// import CartScreen from './src/screens/CartScreen';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';


// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//       <Stack.Navigator initialRouteName='Home'>
//         <Stack.Screen name="Home" component={ProductScreen} />
//         <Stack.Screen name="Cart" component={CartScreen} />
//       </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
