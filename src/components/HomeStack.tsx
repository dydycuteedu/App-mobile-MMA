import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import SnackScreen from '../screen/SnackScreen';
import MealScreen from '../screen/MealScreen';
import VeganScreen from '../screen/VeganScreen';
import DessertScreen from '../screen/DessertScreen';
import DrinksScreen from '../screen/DrinksScreen';
import DetailScreen from '../screen/DetailScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Snack" component={SnackScreen} />
    <Stack.Screen name="Meal" component={MealScreen} />
    <Stack.Screen name="Vegan" component={VeganScreen} />
    <Stack.Screen name="Dessert" component={DessertScreen} />
    <Stack.Screen name="Drinks" component={DrinksScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

export default HomeStack;
