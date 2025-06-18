// src/screen/OrderDetailScreen.tsx
import React from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu cho đơn hàng
export interface Order {
  id: number;
  name: string;
  price: string;
  date: string;
  items: string;
  image: any;
  status?: string;
  orderNumber?: string;
  subtotal?: string;
  tax?: string;
  deliveryFee?: string;
  total?: string;
  itemsList?: { name: string; price: string }[];
}

// Định nghĩa kiểu cho navigation và route
type RootStackParamList = {
  OrderDetailScreen: { order: Order };
};

type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetailScreen'>;
type OrderDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderDetailScreen'>;

interface Props {
  route: OrderDetailScreenRouteProp;
  navigation: OrderDetailScreenNavigationProp;
}

const OrderDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      

      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.orderNumber}>Order No. {order.orderNumber || 'N/A'}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          {order.itemsList?.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>1</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{order.subtotal || '$0.00'}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax and Fees</Text>
            <Text style={styles.priceValue}>{order.tax || '$0.00'}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>{order.deliveryFee || '$0.00'}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{order.total || '$0.00'}</Text>
          </View>
        </View>

        {/* Order Again Button */}
        <TouchableOpacity style={styles.orderAgainButton}>
          <Text style={styles.orderAgainText}>Order Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666666',
  },
  quantityContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  priceValue: {
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  orderAgainButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  orderAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;