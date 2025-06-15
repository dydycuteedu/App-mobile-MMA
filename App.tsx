import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screen/LoginScren';
import SigninScreen from './src/screen/SigninScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator
      screenOptions={{
        headerShown: false,}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
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
