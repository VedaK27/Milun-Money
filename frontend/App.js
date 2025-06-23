/**
 * Sample React Native App
 *
 * To run: npx expo start
 * 
 * On adding a new asset: npx react-native-asset  
 * 
 * Color palette : {
 *    #efe2fa,
 *    #bca5d4,
 *    #bacbfe,
 *    #8f9fe4,
 *    #7164b4
 * }
 * 
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import SplashScreen from './screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
// /import BudgetScreen from './screens/BudgetScreen';
// import ExpenseScreen from './screens/ExpenseScreen';
// import GroupExpenseScreen from './screens/GroupExpenseScreen';
import LoginScreen from './src/screens/LoginScreen.js';
import SignupScreen from './src/screens/SignupScreen.js';
import TripDetailScreen from './src/screens/tripDetailScreen.js';
//import PaymentScreen from './screens/PaymentScreen';
import AddEventPage from './src/screens/AddEventScreen.js';
import AddPaymentPage from './src/screens/AddPaymentScreen.js';
import ExpenseScreen from './src/screens/ExpenseScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TripDetails'
          component={TripDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddEventPage'
          component={AddEventPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name='AddPaymentPage'
          component={AddPaymentPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ExpenseScreen'
          component={ExpenseScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
