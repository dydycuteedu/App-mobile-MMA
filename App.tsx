import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screen/LoginScren';
import SigninScreen from './src/screen/SigninScreen';
import HomeScreen from './src/screen/HomeScreen';
import SnackScreen from './src/screen/SnackScreen';
import MealScreen from './src/screen/MealScreen';
import VeganScreen from './src/screen/VeganScreen';
import DessertScreen from './src/screen/DessertScreen';
import DrinksScreen from './src/screen/DrinksScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Snack" component={SnackScreen} />
        <Stack.Screen name="Meal" component={MealScreen} />
        <Stack.Screen name="Vegan" component={VeganScreen} />
        <Stack.Screen name="Dessert" component={DessertScreen} />
        <Stack.Screen name="Drinks" component={DrinksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
