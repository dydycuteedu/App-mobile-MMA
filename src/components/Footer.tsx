// src/components/Footer.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';

// Dummy screens — replace with your real components
const HomeScreen = () => <View style={styles.screen}><Text>Home</Text></View>;
const SearchScreen = () => <View style={styles.screen}><Text>Search</Text></View>;
const FavoritesScreen = () => <View style={styles.screen}><Text>Favorites</Text></View>;
const OrdersScreen = () => <View style={styles.screen}><Text>Orders</Text></View>;
const ProfileScreen = () => <View style={styles.screen}><Text>Profile</Text></View>;

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fcd34d',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="shopping-cart" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f97316',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    zIndex: 100,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Footer;
