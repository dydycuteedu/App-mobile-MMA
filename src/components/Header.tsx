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
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

const { width } = Dimensions.get('window');

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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleMyOrdersPress = () => {
    setShowPopup(false);
    navigation.navigate('MyOrderScreen');
  };

  const handleLogoutPress = () => {
    setShowPopup(false);
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {/* Header gốc giữ nguyên */}
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

      {/* Phần greeting và categories giữ nguyên */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Good Morning</Text>
        <Text style={styles.subText}>Rise and Shine! It's Breakfast Time</Text>
      </View>

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

      {/* Popup mới - hiển thị bên phải */}
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
          <View style={styles.rightPopupContainer}>
            {isLoggedIn ? (
              <>
                <View style={styles.userInfo}>
                  <Ionicons name="person-circle" size={40} color="#f97316" style={styles.userIcon} />
                  <View>
                    <Text style={styles.userName}>Nguyen Van A</Text>
                    <Text style={styles.userEmail}>nguyenvana@email.com</Text>
                  </View>
                </View>
                
                <View style={styles.menuContainer}>
                  <TouchableMenuItem 
                    icon="list" 
                    text="My Orders" 
                    onPress={handleMyOrdersPress} 
                  />
                  <TouchableMenuItem 
                    icon="person" 
                    text="My Profile" 
                    onPress={() => {}} 
                  />
                  <TouchableMenuItem 
                    icon="location-on" 
                    text="Delivery Address" 
                    onPress={() => {}} 
                  />
                  <TouchableMenuItem 
                    icon="payment" 
                    text="Payment Methods" 
                    onPress={() => {}} 
                  />
                  <TouchableMenuItem 
                    icon="email" 
                    text="Contact Us" 
                    onPress={() => {}} 
                  />
                  <TouchableMenuItem 
                    icon="help" 
                    text="Help & FAQs" 
                    onPress={() => {}} 
                  />
                  <TouchableMenuItem 
                    icon="settings" 
                    text="Settings" 
                    onPress={() => {}} 
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.logoutButton}
                  onPress={handleLogoutPress}
                >
                  <MaterialIcons name="logout" size={20} color="white" />
                  <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.menuContainer}>
                <TouchableMenuItem 
                  icon="login" 
                  text="Login / Register" 
                  onPress={() => navigation.navigate('LoginScreen')} 
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Component phụ cho menu item
const TouchableMenuItem = ({ icon, text, onPress }: { icon: string, text: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <MaterialIcons name={icon as any} size={20} color="#555" />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({  container: {
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
  
  // Style mới cho popup bên phải
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(240, 234, 234, 0.5)',
  },
  rightPopupContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: '#EA580C',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20, // Bo tròn góc trên bên trái
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  }, 
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 15,
  },
  userIcon: {
    marginRight: 15,
    color: 'white',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 12,
    color: 'white',
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default Header;