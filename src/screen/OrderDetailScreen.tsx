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
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Định nghĩa kiểu Order
export interface Order {
  id: string;
  name: string;
  status?: string;
  orderNumber?: string;
  date: string;
  items: number;
  itemsList?: Array<{ name: string; price: string }>;
  subtotal?: string;
  tax?: string;
  deliveryFee?: string;
  total?: string;
  image: any;
}

type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetailScreen'>;
type OrderDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderDetailScreen'>;

interface Props {
  route: OrderDetailScreenRouteProp;
  navigation: OrderDetailScreenNavigationProp;
}

// Tạo đơn hàng mặc định
const DEFAULT_ORDER: Order = {
  id: '1',
  name: 'Default Order',
  status: 'Order placed',
  orderNumber: 'N/A',
  date: new Date().toLocaleDateString(),
  items: 0,
  itemsList: [],
  subtotal: '$0.00',
  tax: '$0.00',
  deliveryFee: '$0.00',
  total: '$0.00',
  image: require('../assets/images/strawberry-shake.png')
};

const OrderDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const order = route.params?.order || DEFAULT_ORDER;
  
  // Hàm xử lý Order Again
  const handleOrderAgain = () => {
    const orderItems = order.itemsList?.map(item => {
      // Tách số từ chuỗi giá (ví dụ: "$10.00" -> 10.00)
      const priceValue = parseFloat(item.price.replace('$', ''));
      return {
        id: Math.random().toString(), // Tạo id mới ngẫu nhiên
        name: item.name,
        price: priceValue,
        quantity: 1, // Mặc định số lượng là 1
        image: order.image, // Sử dụng ảnh của đơn hàng
        time: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(',', '.') + ' pm' // Format: "Nov 29. 15:20 pm"
      };
    }) || [];

    // Điều hướng sang ConfirmOrderScreen
    navigation.navigate('ConfirmOrderScreen', {
      orderItems,
      shippingAddress: "278 Locust View Drive Oaklands, CA"
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
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Phần nội dung với bo tròn 2 góc trên */}
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Order Header with Image */}
          <View style={styles.orderHeader}>
            <View style={styles.orderImageContainer}>
              <Image 
                source={order.image} 
                style={styles.orderImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.orderHeaderInfo}>
              <Text style={styles.orderName}>{order.name}</Text>
              <Text style={[
                styles.orderStatus,
                { color: order.status?.includes('cancelled') ? '#EF4444' : '#10B981' }
              ]}>
                {order.status || 'Order placed'}
              </Text>
            </View>
          </View>

          {/* Order Info */}
          <View style={styles.section}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order Number</Text>
              <Text style={styles.infoValue}>{order.orderNumber || 'N/A'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order Date</Text>
              <Text style={styles.infoValue}>{order.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Items</Text>
              <Text style={styles.infoValue}>{order.items}</Text>
            </View>
          </View>

          {/* Order Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            {order.itemsList && order.itemsList.length > 0 ? (
              order.itemsList.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>1</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No items in this order</Text>
            )}
          </View>

          {/* Price Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Details</Text>
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

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {order.status && order.status.includes('Active') && (
              <TouchableOpacity 
                style={styles.trackButton}
                onPress={() => navigation.navigate('LiveTrackingScreen', { order })}
              >
                <Text style={styles.trackButtonText}>Track Order</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.orderAgainButton}
              onPress={handleOrderAgain}
            >
              <Text style={styles.orderAgainText}>Order Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
    marginTop: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
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
  contentWrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  orderImage: {
    width: 60,
    height: 60,
  },
  orderHeaderInfo: {
    flex: 1,
  },
  orderName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: '500',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
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
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  trackButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderAgainButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  orderAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;