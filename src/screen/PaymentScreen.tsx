// src/screens/PaymentScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image
} from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // State cho phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState('credit'); // 'credit' hoặc 'cash'
  
  // State cho thông tin thẻ
  const [cardNumber, setCardNumber] = useState('**** **** **** 1234');
  const [expiryDate, setExpiryDate] = useState('12/25');
  const [cvv, setCvv] = useState('***');
  
  // Lấy thông tin từ route.params
  const { orderItems, shippingAddress, total } = route.params || {};
  
  // Tính toán giá trị
  const subtotal = orderItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const taxAndFees = subtotal * 0.1;
  const deliveryFee = 0;
  const calculatedTotal = total || (subtotal + taxAndFees + deliveryFee);

  const handlePayNow = () => {
    navigation.navigate('OrderSuccessScreen');
  };

  const handleEditAddress = () => {
    navigation.navigate('EditAddressScreen');
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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Phần nội dung */}
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Shipping Address với nút Edit */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              <TouchableOpacity onPress={handleEditAddress}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
              <MaterialIcons name="location-on" size={20} color="#f97316" />
              <Text style={styles.addressText}>
                {shippingAddress || '278 Locust View Drive Oakland, CA'}
              </Text>
            </View>
          </View>

          {/* Order Summary với tổng bill */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <Text style={styles.orderTotal}>${calculatedTotal.toFixed(2)}</Text>
            </View>
            
            {orderItems?.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Text style={styles.itemText}>
                  {item.name} {item.quantity} {item.quantity > 1 ? 'items' : 'item'}
                </Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            {/* Tùy chọn Credit Card */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => setPaymentMethod('credit')}
            >
              <View style={styles.paymentMethodRow}>
                <View style={styles.paymentIcon}>
                  <FontAwesome name="credit-card" size={24} color="#f97316" />
                </View>
                <Text style={styles.paymentText}>Credit Card</Text>
              </View>
              {paymentMethod === 'credit' && (
                <MaterialIcons name="radio-button-checked" size={24} color="#f97316" />
              )}
              {paymentMethod !== 'credit' && (
                <MaterialIcons name="radio-button-unchecked" size={24} color="#777" />
              )}
            </TouchableOpacity>
            
            {/* Tùy chọn Cash */}
            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => setPaymentMethod('cash')}
            >
              <View style={styles.paymentMethodRow}>
                <View style={styles.paymentIcon}>
                  <FontAwesome name="money" size={24} color="#f97316" />
                </View>
                <Text style={styles.paymentText}>Cash on Delivery</Text>
              </View>
              {paymentMethod === 'cash' && (
                <MaterialIcons name="radio-button-checked" size={24} color="#f97316" />
              )}
              {paymentMethod !== 'cash' && (
                <MaterialIcons name="radio-button-unchecked" size={24} color="#777" />
              )}
            </TouchableOpacity>
            
            {/* Thông tin thẻ (chỉ hiển thị khi chọn Credit Card) */}
            {paymentMethod === 'credit' && (
              <View style={styles.cardInfoContainer}>
                <View style={styles.cardInfoRow}>
                  <Text style={styles.cardLabel}>Card Number</Text>
                  <Text style={styles.cardValue}>{cardNumber}</Text>
                </View>
                
                
                <View style={styles.cardDetailsRow}>
                  <View style={styles.cardDetail}>
                    <Text style={styles.cardLabel}>Expiry Date</Text>
                    <Text style={styles.cardValue}>{expiryDate}</Text>
                  </View>
                  
                  <View style={styles.cardDetail}>
                    <Text style={styles.cardLabel}>CVV</Text>
                    <Text style={styles.cardValue}>{cvv}</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.editCardButton}>
                  <Text style={styles.editCardText}>Edit Card Info</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Delivery Time */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Time</Text>
              <Ionicons name="time-outline" size={24} color="#f97316" />
            </View>
            
            <View style={styles.deliveryTimeContainer}>
              <Text style={styles.deliveryTimeLabel}>Estimated Delivery</Text>
              <Text style={styles.deliveryTimeValue}>Thu, 29th 4:00 PM</Text>
            </View>
          </View>

          {/* Price Summary */}
          <View style={styles.summarySection}>
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
              <Text style={styles.summaryValueTotal}>${calculatedTotal.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity 
        style={styles.payNowButton} 
        onPress={handlePayNow}
      >
        <Text style={styles.payNowText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD93D',
  },
  // Header style
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
    marginBottom: 2,
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
  },
  headerSpacer: {
    width: 40,
  },
  // Wrapper cho phần nội dung
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
    marginBottom: 10,
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
    marginTop: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderItem: {
    marginBottom: 8,
    marginTop: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  cardInfoContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
  },
  cardValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetail: {
    width: '48%',
  },
  editCardButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  editCardText: {
    color: '#f97316',
    fontWeight: '500',
  },
  deliveryTimeContainer: {
    marginTop: 10,
  },
  deliveryTimeLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  deliveryTimeValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  summarySection: {
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333333',
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  payNowButton: {
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
  payNowText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentScreen;