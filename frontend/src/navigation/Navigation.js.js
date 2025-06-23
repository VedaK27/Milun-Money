import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen.js";
import SignupScreen from "../screens/SignupScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
// import ProfileScreen from "../screens/ProfileScreen.js";
import PaymentScreen from "../screens/PaymentScreen.js";
import GroupExpensesScreen from "../screens/GroupExpensesScreen.js";
import ExpensesScreen from "../screens/ExpensesScreen.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);
  
const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Expenses" component={ExpensesScreen} />
    <Tab.Screen name="Group" component={GroupExpensesScreen} />
    <Tab.Screen name="Payments" component={PaymentScreen} />
  </Tab.Navigator>
);
  
const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Dashboard" component={MainTabs} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Expenses" component={ExpensesScreen} />
  </Drawer.Navigator>
);
  
const RootStack = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};
  
const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
  
export default Navigation;
  