import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Order } from './OrderDetailScreen';
import { RootStackParamList } from '../navigation/types';

type MyOrdersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyOrderScreen'>;

interface Props {
  navigation: MyOrdersScreenNavigationProp;
}

interface OrderState {
  active: Order[];
  completed: Order[];
  cancelled: Order[];
}

const MyOrdersScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('Active');
  const [orders, setOrders] = useState<OrderState>({
    active: [
      {
        id: 1,
        name: 'Matcha',
        price: '$20.00',
        date: '17 Oct, 01:20 pm',
        items: '1 item',
        image: require('../../assets/green-tea.png'),
        orderNumber: '0054752',
        subtotal: '$32.00',
        tax: '$5.00',
        deliveryFee: '$3.00',
        total: '$40.00',
        itemsList: [
          { name: 'Strawberry Shake', price: '$20.00' },
          { name: 'Broccoli Lasagna', price: '$12.00' }
        ]
      },
      {
        id: 2,
        name: 'Sesame Chicken',
        price: '$20.00',
        date: '17 Oct, 01:20 pm',
        items: '1 item',
        image: require('../../assets/chicken.jpg'),
        orderNumber: '0054753',
        subtotal: '$20.00',
        tax: '$3.00',
        deliveryFee: '$3.00',
        total: '$26.00',
        itemsList: [
          { name: 'Sesame Chicken', price: '$20.00' }
        ]
      },
      {
        id: 3,
        name: 'Coffee Flavored Ice Cream',
        price: '$20.00',
        date: '22 Apr, 01:20 pm',
        items: '2 items',
        image: require('../../assets/coffee-icecream.png'),
        orderNumber: '0054754',
        subtotal: '$40.00',
        tax: '$6.00',
        deliveryFee: '$3.00',
        total: '$49.00',
        itemsList: [
          { name: 'Coffee Flavored Ice Cream', price: '$20.00' },
          { name: 'Extra Topping', price: '$20.00' }
        ]
      },
      {
        id: 4,
        name: 'Strawberry Cheesecake',
        price: '$20.00',
        date: '29 Nov, 01:20 pm',
        items: '1 item',
        image: require('../../assets/strawberry-cheesecake.png'),
        orderNumber: '0054755',
        subtotal: '$20.00',
        tax: '$3.00',
        deliveryFee: '$3.00',
        total: '$26.00',
        itemsList: [
          { name: 'Strawberry Cheesecake', price: '$20.00' }
        ]
      }
    ],
    completed: [
      {
        id: 6,
        name: 'Pizza',
        price: '$50.00',
        date: '29 Nov, 01:20 pm',
        items: '2 items',
        status: 'Order delivered',
        image: require('../../assets/pizza.png'),
        orderNumber: '0054756',
        subtotal: '$50.00',
        tax: '$7.50',
        deliveryFee: '$3.00',
        total: '$60.50',
        itemsList: [
          { name: 'Pizza', price: '$50.00' }
        ]
      },
      {
        id: 7,
        name: 'Katsu Donburi',
        price: '$15.0',
        date: '10 Nov, 06:05 pm',
        items: '2 items',
        status: 'Order delivered',
        image: require('../../assets/katsu-donburi.jpg'),
        orderNumber: '0054757',
        subtotal: '$30.00',
        tax: '$4.50',
        deliveryFee: '$3.00',
        total: '$37.50',
        itemsList: [
          { name: 'Katsu Donburi', price: '$15.00' },
          { name: 'Extra Rice', price: '$15.00' }
        ]
      },
      {
        id: 8,
        name: 'Caramel Popcorn Milkshake',
        price: '$12.99',
        date: '03 Oct, 03:40 pm',
        items: '2 items',
        status: 'Order delivered',
        image: require('../../assets/popcorn-milkshake.jpg'),
        orderNumber: '0054758',
        subtotal: '$25.98',
        tax: '$3.90',
        deliveryFee: '$3.00',
        total: '$32.88',
        itemsList: [
          { name: 'Caramel Popcorn Milkshake', price: '$12.99' },
          { name: 'Extra Caramel', price: '$12.99' }
        ]
      },
      {
        id: 9,
        name: 'Burger',
        price: '$15.0',
        date: '30 Oct, 03:40 pm',
        items: '2 items',
        status: 'Order delivered',
        image: require('../../assets/burger.png'),
        orderNumber: '0054759',
        subtotal: '$30.00',
        tax: '$4.50',
        deliveryFee: '$3.00',
        total: '$37.50',
        itemsList: [
          { name: 'Burger', price: '$15.00' },
          { name: 'French Fries', price: '$15.00' }
        ]
      },
    ],
    cancelled: [
      {
        id: 10,
        name: 'Avocado Toast',
        price: '$12.99',
        date: '02 Nov, 04:00 pm',
        items: '3 items',
        status: 'Order cancelled',
        image: require('../../assets/vegan-toast.jpg'),
        orderNumber: '0054760',
        subtotal: '$38.97',
        tax: '$5.85',
        deliveryFee: '$3.00',
        total: '$47.82',
        itemsList: [
          { name: 'Avocado Toast', price: '$12.99' },
          { name: 'Extra Avocado', price: '$12.99' },
          { name: 'Coffee', price: '$12.99' }
        ]
      },
      {
        id: 11,
        name: 'Blueberry Tea',
        price: '$15.00',
        date: '12 Oct, 03:15 pm',
        items: '2 items',
        status: 'Order cancelled',
        image: require('../../assets/blueberry-tea.png'),
        orderNumber: '0054761',
        subtotal: '$30.00',
        tax: '$4.50',
        deliveryFee: '$3.00',
        total: '$37.50',
        itemsList: [
          { name: 'Blueberry Tea', price: '$15.00' },
          { name: 'Honey', price: '$15.00' }
        ]
      },
    ]
  });

  const getCurrentOrders = (): Order[] => {
    switch (activeTab) {
      case 'Active': return orders.active;
      case 'Completed': return orders.completed;
      case 'Cancelled': return orders.cancelled;
      default: return orders.active;
    }
  };

  const handleCancelOrder = (orderId: number) => {
    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => confirmCancelOrder(orderId)
        }
      ]
    );
  };

  const confirmCancelOrder = (orderId: number) => {
    const orderToCancel = orders.active.find(order => order.id === orderId);
    
    if (!orderToCancel) return;
    
    const cancelledOrder = {
      ...orderToCancel,
      status: 'Order cancelled'
    };
    
    setOrders(prev => ({
      active: prev.active.filter(order => order.id !== orderId),
      completed: prev.completed,
      cancelled: [cancelledOrder, ...prev.cancelled]
    }));
    
    // Auto switch to Cancelled tab if currently in Active tab
    if (activeTab === 'Active') {
      setActiveTab('Cancelled');
    }
  };

  const TabButton: React.FC<{ tab: string; isActive: boolean; onPress: () => void }> = ({
    tab,
    isActive,
    onPress
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabButton,
        isActive ? styles.activeTab : styles.inactiveTab
      ]}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.tabText,
        isActive ? styles.activeTabText : styles.inactiveTabText
      ]}>
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetailScreen', { order })}
      activeOpacity={0.9}
    >
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderImageContainer}>
            <Image 
              source={order.image} 
              style={styles.orderImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderName}>{order.name}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
            <Text style={styles.orderItems}>{order.items}</Text>
            {order.status && (
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: order.status.includes('cancelled') ? '#EF4444' : '#10B981' }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: order.status.includes('cancelled') ? '#EF4444' : '#10B981' }
                ]}>
                  {order.status}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{order.price}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          {activeTab === 'Active' && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                activeOpacity={0.8}
                onPress={() => handleCancelOrder(order.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.trackButton]}
                activeOpacity={0.8}
              >
                <Text style={styles.trackButtonText}>Track Driver</Text>
              </TouchableOpacity>
            </>
          )}
          
          {activeTab === 'Completed' && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.reviewButton]}
                activeOpacity={0.8}
              >
                <Text style={styles.reviewButtonText}>Leave a feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.orderAgainButton]}
                activeOpacity={0.8}
              >
                <Text style={styles.orderAgainButtonText}>Order Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFD93D" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backIcon}> ⌂ </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabButton
          tab="Active"
          isActive={activeTab === 'Active'}
          onPress={() => setActiveTab('Active')}
        />
        <TabButton
          tab="Completed"
          isActive={activeTab === 'Completed'}
          onPress={() => setActiveTab('Completed')}
        />
        <TabButton
          tab="Cancelled"
          isActive={activeTab === 'Cancelled'}
          onPress={() => setActiveTab('Cancelled')}
        />
      </View>

      {/* Orders List */}
      <ScrollView 
        style={styles.ordersContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {getCurrentOrders().map((order) => (
        <OrderCard key={`${activeTab}-${order.id}`} order={order} />
        ))}
      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inactiveTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#FF6B35',
  },
  ordersContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
   orderImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  orderImage: {
    width: 50,
    height: 50,
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  trackButton: {
    backgroundColor: '#FFF2E6',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  trackButtonText: {
    color: '#FF6B35',
    fontWeight: '700',
    fontSize: 14,
  },
  reviewButton: {
    backgroundColor: '#FFF2E6',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  reviewButtonText: {
    color: '#FF6B35',
    fontWeight: '700',
    fontSize: 14,
  },
  orderAgainButton: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  orderAgainButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default MyOrdersScreen;