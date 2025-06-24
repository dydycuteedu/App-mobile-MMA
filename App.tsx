import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screen/LoginScreen';
import SigninScreen from './src/screen/SigninScreen';
import TabNavigator from './src/components/Footer'; // Adjust the import path as necessary

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signin" component={SigninScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
    </NavigationContainer>
  );
}
