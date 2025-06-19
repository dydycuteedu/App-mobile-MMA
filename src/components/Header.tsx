// src/components/Header.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
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

const { width, height } = Dimensions.get('window');

const categories: {
  name: string;
  icon: string;
  screen: keyof RootStackParamList;
}[] = [
  { name: 'Snacks', icon: 'fast-food-outline', screen: 'Snack' },
  { name: 'Meal', icon: 'restaurant-outline', screen: 'Meal' },
  { name: 'Vegan', icon: 'leaf-outline', screen: 'Vegan' },
  { name: 'Dessert', icon: 'ice-cream-outline', screen: 'Dessert' },
  { name: 'Drinks', icon: 'cafe-outline', screen: 'Drinks' },
];

// Updated cart items with quantity field
const initialCartItems = [
  {
    id: '1',
    name: 'Strawberry Shake',
    price: 20.00,
    date: '29/11/24',
    time: '15:00',
    image: require('../assets/images/strawberry-shake.png'),
    quantity: 1
  },
  {
    id: '2',
    name: 'Braceoil Lavagna',
    price: 12.00,
    date: '29/11/24',
    time: '13:00',
    image: require('../assets/images/braceoil-lavagna.png'),
    quantity: 1
  }
];


const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleMyOrdersPress = () => {
    setShowProfilePopup(false);
    navigation.navigate('MyOrderScreen');
  };

  const handleLogoutPress = () => {
    setShowProfilePopup(false);
    setIsLoggedIn(false);
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Calculate cart values with quantity
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAndFees = subtotal * 0.1;
  const deliveryFee = 2.00;
  const total = subtotal + taxAndFees + deliveryFee;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRow}>
        <Text style={styles.logo}>Click<Text style={styles.logoAccent}>&</Text>Eat</Text>
        <Image
         source={require("../assets/images/logo.png")}
          style={styles.logo}/>

        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => setShowCartPopup(true)}
        >
          <MaterialIcons name="shopping-cart" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => setShowProfilePopup(true)}
        >
          <Ionicons name="person-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Greeting and categories */}
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
            onPress={() => navigation.navigate(cat.screen)}
          >
            <Ionicons name={cat.icon as any} size={22} color="#f97316" />
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Profile Popup */}
      <Modal
        visible={showProfilePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProfilePopup(false)}
      >
        <TouchableOpacity
          style={styles.popupOverlay}
          activeOpacity={1}
          onPress={() => setShowProfilePopup(false)}
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

      {/* Cart Popup */}
      <Modal
        visible={showCartPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCartPopup(false)}
      >
        <TouchableOpacity
          style={styles.popupOverlay}
          activeOpacity={1}
          onPress={() => setShowCartPopup(false)}
        >
          <View style={styles.rightPopupContainer}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>Cart</Text>
              <Text style={styles.cartSubtitle}>You have {cartItems.length} items in the cart</Text>
            </View>
            
            <ScrollView 
              style={styles.cartItemsContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <View style={styles.cartItemTime}>
                      <Text style={styles.cartItemDateTime}>{item.date}</Text>
                      <Text style={styles.cartItemDateTime}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={styles.quantityContainer}>
  <TouchableOpacity 
    style={styles.quantityButton}
    onPress={() => decreaseQuantity(item.id)}
  >
    <Text style={styles.quantityButtonText}>-</Text>
  </TouchableOpacity>
  <Text style={styles.quantityText}>{item.quantity}</Text>
  <TouchableOpacity 
    style={styles.quantityButton}
    onPress={() => increaseQuantity(item.id)}
  >
    <Text style={styles.quantityButtonText}>+</Text>
  </TouchableOpacity>
</View>
                </View>
              ))}
            </ScrollView>
            
            <View style={styles.cartBottom}>
              <View style={styles.cartSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax and Fees</Text>
                  <Text style={styles.summaryValue}>${taxAndFees.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery</Text>
                  <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRowTotal}>
                  <Text style={styles.summaryLabelTotal}>Total</Text>
                  <Text style={styles.summaryValueTotal}>${total.toFixed(2)}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={() => {
                  setShowCartPopup(false);
                  navigation.navigate('ConfirmOrderScreen');
                }}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Helper component for menu items
const TouchableMenuItem = ({ icon, text, onPress }: { icon: string, text: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <MaterialIcons name={icon as any} size={20} color="#555" />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

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
    width: 144,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
topControls: {
  flexDirection: 'row',
  alignItems: 'center',
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
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    flex: 1,
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
  
  // Cart popup styles
  cartHeader: {
    marginBottom: 15,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cartSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  cartItemsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  cartItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginBottom: 5,
  },
  cartItemTime: {
    flexDirection: 'row',
    gap: 10,
  },
  cartItemDateTime: {
    fontSize: 10,
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  cartBottom: {
    marginBottom: 20,
  },
  cartSummary: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    paddingTop: 10,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'white',
  },
  summaryValue: {
    fontSize: 14,
    color: 'white',
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  summaryValueTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#f97316',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;