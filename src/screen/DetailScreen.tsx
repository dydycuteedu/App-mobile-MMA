import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './CartContext';

const { width } = Dimensions.get("window");

interface PortionOption {
  label: string;
  price: number;
}

const validatePrice = (price: any): number => {
  if (typeof price === 'number') return price;
  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
};

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params as { item: any };
  const { 
    addToCart, 
    cartItems, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart 
  } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption>({
    label: 'Personal (4 Slices)',
    price: 0
  });
  const [showCartPopup, setShowCartPopup] = useState(false);

  const portionOptions: PortionOption[] = [
    { label: 'Personal (4 Slices)', price: 0 },
    { label: 'Medium (8 Slices)', price: 3 },
    { label: 'Familiar (10 Slices)', price: 5 },
    { label: 'Jumbo (12 Slices)', price: 10 },
  ];

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const validatedItemPrice = validatePrice(item.price);
    const validatedPortionPrice = validatePrice(selectedPortion.price);
    
    const cartItem = {
      id: item.id,
      name: item.name,
      price: validatedItemPrice + validatedPortionPrice,
      image: item.image,
      portion: selectedPortion.label,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quantity: quantity
    };

    addToCart(cartItem);
    Alert.alert('Đã thêm vào giỏ hàng');
  };

  // Calculate cart values
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxAndFees = subtotal * 0.1;
  const deliveryFee = 2.0;
  const total = subtotal + taxAndFees + deliveryFee;

  const handleCheckout = () => {
    setShowCartPopup(false);
    clearCart();
    navigation.navigate("ConfirmOrderScreen", {
      orderItems: cartItems,
      subtotal: subtotal,
      taxAndFees: taxAndFees,
      deliveryFee: deliveryFee,
      total: total,
    });
  };

  // Calculate display prices
  const displayPrice = (validatePrice(item.price) + validatePrice(selectedPortion.price)).toFixed(2);
  const displayTotal = (quantity * (validatePrice(item.price) + validatePrice(selectedPortion.price))).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => setShowCartPopup(true)}>
          <Ionicons name="cart-outline" size={24} color="#f97316" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-30%</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.newPrice}>${displayPrice}</Text>
        <Text style={styles.oldPrice}>$20.00</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={decreaseQty}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQty}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portion Options</Text>
        {portionOptions.map(option => (
          <TouchableOpacity
            key={option.label}
            style={styles.radioRow}
            onPress={() => setSelectedPortion(option)}
          >
            <Ionicons
              name={selectedPortion.label === option.label ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color="#f97316"
            />
            <Text style={styles.radioLabel}>{option.label}</Text>
            <Text style={styles.radioPrice}>
              {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'Free'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.cartBtn} 
        onPress={handleAddToCart}
      >
        <MaterialIcons name="add-shopping-cart" size={20} color="white" />
        <Text style={styles.cartBtnText}>Add to Cart (${displayTotal})</Text>
      </TouchableOpacity>

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
              <Text style={styles.cartSubtitle}>
                {cartItems.length > 0
                  ? `You have ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in the cart`
                  : 'Your cart is empty'}
              </Text>
            </View>

            <ScrollView
              style={styles.cartItemsContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {cartItems.length === 0 ? (
                <Text style={styles.emptyCartText}>No items in cart</Text>
              ) : (
                cartItems.map((item) => (
                  <View key={`${item.id}-${item.portion}`} style={styles.cartItem}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      {item.portion && (
                        <Text style={styles.cartItemPortion}>{item.portion}</Text>
                      )}
                      <Text style={styles.cartItemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
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
                ))
              )}
            </ScrollView>

            {cartItems.length > 0 && (
              <View style={styles.cartBottom}>
                <View style={styles.cartSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>
                      ${subtotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax and Fees</Text>
                    <Text style={styles.summaryValue}>
                      ${taxAndFees.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery</Text>
                    <Text style={styles.summaryValue}>
                      ${deliveryFee.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRowTotal}>
                    <Text style={styles.summaryLabelTotal}>Total</Text>
                    <Text style={styles.summaryValueTotal}>
                      ${total.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={handleCheckout}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  newPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f97316',
    marginRight: 8,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  qtyBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    color: '#f97316',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    color: '#666',
    fontSize: 14,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioLabel: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  radioPrice: {
    color: '#f97316',
    fontWeight: 'bold',
  },
  cartBtn: {
    backgroundColor: '#f97316',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  cartBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Cart Popup styles
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(240, 234, 234, 0.5)",
  },
  rightPopupContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#EA580C",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    flex: 1,
  },
  cartHeader: {
    marginBottom: 15,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cartSubtitle: {
    fontSize: 14,
    color: "white",
  },
  cartItemsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  cartItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  cartItemPortion: {
    fontSize: 12,
    color: 'white',
    marginBottom: 3,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    marginBottom: 5,
  },
  cartItemTime: {
    flexDirection: "row",
    gap: 10,
  },
  cartItemDateTime: {
    fontSize: 10,
    color: "white",
  },
  emptyCartText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 12.5,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  cartBottom: {
    marginBottom: 20,
  },
  cartSummary: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)",
    paddingTop: 10,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "white",
  },
  summaryValue: {
    fontSize: 14,
    color: "white",
  },
  summaryRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  summaryValueTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  checkoutButton: {
    backgroundColor: "#f97316",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetailScreen;