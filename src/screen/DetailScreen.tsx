import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './CartContext';

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
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption>({
    label: 'Personal (4 Slices)',
    price: 0
  });

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
      quantity: quantity // Sử dụng quantity state thay vì hardcode 1
    };

    addToCart(cartItem);
    Alert.alert('Đã thêm vào giỏ hàng');
  };

  // Tính toán giá trị để hiển thị (đảm bảo validate price trước khi tính toán)
  const displayPrice = (validatePrice(item.price) + validatePrice(selectedPortion.price)).toFixed(2);
  const displayTotal = (quantity * (validatePrice(item.price) + validatePrice(selectedPortion.price))).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item.name}</Text>
        <Ionicons name="heart-outline" size={24} color="#f97316" />
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
});

export default DetailScreen;