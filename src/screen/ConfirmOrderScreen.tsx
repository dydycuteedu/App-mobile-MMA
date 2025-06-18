import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Định nghĩa kiểu cho sản phẩm
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  time: string;
}

// Định nghĩa kiểu cho route.params
type ConfirmOrderScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmOrderScreen'>;

const ConfirmOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ConfirmOrderScreenRouteProp>();
  
  // Lấy dữ liệu từ route.params, nếu không có thì dùng mảng rỗng
  const initialItems: OrderItem[] = route.params?.orderItems || [];
  
  // Khởi tạo state với dữ liệu từ route.params
  const [items, setItems] = useState<OrderItem[]>(initialItems);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAndFees = subtotal * 0.1;
  const deliveryFee = 0;
  const total = subtotal + taxAndFees + deliveryFee;

  const handleIncrease = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? {...item, quantity: item.quantity + 1} : item
    ));
  };

  const handleDecrease = (id: string) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 
        ? {...item, quantity: item.quantity - 1} 
        : item
    ));
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePlaceOrder = () => {
    navigation.navigate('PaymentScreen', {
      orderItems: items,
      shippingAddress: route.params?.shippingAddress || "278 Locust View Drive Oaklands, CA",
      total: total
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFD93D" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Phần nội dung với bo tròn 2 góc trên */}
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Shipping Address */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
              <MaterialIcons name="location-on" size={20} color="#f97316" />
              <Text style={styles.addressText}>{route.params?.shippingAddress || "278 Locust View Drive Oaklands, CA"}</Text>
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            
            {items.length > 0 ? items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Image source={item.image} style={styles.itemImage} />
                
                <View style={styles.itemContent}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemTime}>{item.time}</Text>
                    
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => handleRemove(item.id)}
                    >
                      <Text style={styles.cancelText}>Cancel Order</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.rightContainer}>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleDecrease(item.id)}
                      >
                        <Feather name="minus" size={14} color="#f97316" />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleIncrease(item.id)}
                      >
                        <Feather name="plus" size={14} color="#f97316" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )) : (
              <Text style={styles.emptyText}>No items in order</Text>
            )}
          </View>

          {/* Order Total */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Details</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Tax and Fees</Text>
              <Text style={styles.priceValue}>${taxAndFees.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery</Text>
              <Text style={styles.priceValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity 
        style={styles.placeOrderButton} 
        onPress={handlePlaceOrder}
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD93D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: -1,
    height: 24,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    marginRight: 0,
  },
  headerSpacer: {
    width: 40,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  editText: {
    color: '#f97316',
    fontWeight: '500',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333333',
  },
  itemTime: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  cancelButton: {
    paddingVertical: 5,
  },
  cancelText: {
    color: '#f97316',
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f97316',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityButton: {
    padding: 3,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#333333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666666',
  },
  priceValue: {
    fontSize: 16,
    color: '#333333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#f97316',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  placeOrderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ConfirmOrderScreen;