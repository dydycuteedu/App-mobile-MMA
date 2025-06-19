// src/components/Header.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigation'; // Adjust path as needed

const categories = [
  { name: 'Snacks', icon: 'fast-food-outline', screen: 'Snack' },
  { name: 'Meal', icon: 'restaurant-outline', screen: 'Meal' },
  { name: 'Vegan', icon: 'leaf-outline', screen: 'Vegan' },
  { name: 'Dessert', icon: 'ice-cream-outline', screen: 'Dessert' },
  { name: 'Drinks', icon: 'cafe-outline', screen: 'Drinks' },
  { name: 'Login', icon: 'cafe-outline', screen: 'Login' },
];

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Platform Name & Top Icons */}
      <View style={styles.topRow}>
        <Text style={styles.logo}>Click<Text style={styles.logoAccent}>&</Text>Eat</Text>

        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="shopping-cart" size={22} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="person-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Greeting Text */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Good Morning</Text>
        <Text style={styles.subText}>Rise and Shine! It’s Breakfast Time</Text>
      </View>

      {/* Category Scroll Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => navigation.navigate(cat.screen as keyof RootStackParamList)}
          >
            <Ionicons name={cat.icon as any} size={22} color="#f97316" />
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fde68a',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    minHeight: 170,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#f97316',
  },
  logoAccent: {
    color: '#ea580c',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    marginRight: 8,
  },
  iconBtn: {
    backgroundColor: '#f97316',
    padding: 8,
    borderRadius: 10,
    marginLeft: 4,
  },
  greeting: {
    marginTop: 16,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f97316',
  },
  subText: {
    fontSize: 14,
    color: '#555',
  },
  categories: {
    marginTop: 16,
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryText: {
    fontSize: 12,
    color: '#f97316',
    marginTop: 4,
  },
});

export default Header;
