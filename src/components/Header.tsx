// src/components/Header.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
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
];

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  const handleMyOrdersPress = () => {
    setShowPopup(false);
    navigation.navigate('MyOrderScreen');
  };

  const handleMyAccountPress = () => {
    setShowPopup(false);
    navigation.navigate('AccountScreen');
  };

  const handleLoginPress = () => {
    setShowPopup(false);
    navigation.navigate('LoginScreen');
    setIsLoggedIn(true); // Simulate login
  };

  const handleLogoutPress = () => {
    setShowPopup(false);
    setIsLoggedIn(false);
    // Add actual logout logic here
  };

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

        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => setShowPopup(true)}
        >
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

      {/* User Popup Modal */}
      <Modal
        visible={showPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <TouchableOpacity
          style={styles.popupOverlay}
          activeOpacity={1}
          onPress={() => setShowPopup(false)}
        >
          <View style={styles.popupContainer}>
            {isLoggedIn ? (
              <>
                {/* Logged in options */}
                <View style={styles.userInfo}>
                  <Ionicons name="person-circle-outline" size={48} color="#f97316" />
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userEmail}>john.doe@example.com</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.popupItem}
                  onPress={handleMyAccountPress}
                >
                  <MaterialIcons name="account-circle" size={24} color="#f97316" />
                  <Text style={styles.popupText}>My Account</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.popupItem}
                  onPress={handleMyOrdersPress}
                >
                  <MaterialIcons name="list-alt" size={24} color="#f97316" />
                  <Text style={styles.popupText}>My Orders</Text>
                </TouchableOpacity>
                
                <View style={styles.divider} />
                
                <TouchableOpacity
                  style={styles.popupItem}
                  onPress={handleLogoutPress}
                >
                  <MaterialIcons name="logout" size={24} color="#f97316" />
                  <Text style={styles.popupText}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Not logged in options */}
                <View style={styles.userInfo}>
                  <Ionicons name="person-circle-outline" size={48} color="#f97316" />
                  <Text style={styles.userName}>Guest User</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.popupItem}
                  onPress={handleLoginPress}
                >
                  <MaterialIcons name="login" size={24} color="#f97316" />
                  <Text style={styles.popupText}>Login / Register</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.popupItem}
                  onPress={handleMyOrdersPress}
                >
                  <MaterialIcons name="list-alt" size={24} color="#f97316" />
                  <Text style={styles.popupText}>My Orders</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fde68a',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    minHeight: 170,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  // Popup styles
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  popupText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
});

export default Header;