import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { getOrdersByUser, updateOrderStatus } from '../api/orderApi';
import { useFocusEffect } from '@react-navigation/native';

export interface Order {
  id: string;
  customerId: string;
  name: string;
  price: string;
  date: string;
  items: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  image: string;
  orderNumber: string;
  subtotal: string;
  tax: string;
  deliveryFee: string;
  total: string;
  itemsList: { name: string; price: string }[];
  deliveryTime?: string | Date;
}

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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cancelReasons, setCancelReasons] = useState({
    reason1: false,
    reason2: false,
    reason3: false,
    reason4: false,
    reason5: false,
    otherReason: false,
  });
  const [otherReasonText, setOtherReasonText] = useState('');
  const [orders, setOrders] = useState<OrderState>({ active: [], completed: [], cancelled: [] });

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const userId = 'u1';
          const allOrders: Order[] = await getOrdersByUser(userId);
          const now = new Date();
          for (const order of allOrders) {
            if ((order.status === 'Pending' || order.status === 'Confirmed') && order.deliveryTime) {
              const deliveryTime = new Date(order.deliveryTime);
              if (deliveryTime < now) {
                await updateOrderStatus(order.id, 'Completed');
                order.status = 'Completed';
              }
            }
          }
          const grouped: OrderState = {
            active: allOrders.filter(o => o.status === 'Pending' || o.status === 'Confirmed'),
            completed: allOrders.filter(o => o.status === 'Completed'),
            cancelled: allOrders.filter(o => o.status === 'Cancelled')
          };
          setOrders(grouped);
        } catch (err) {
          console.error('Error fetching orders:', err);
        }
      };
      fetchOrders();
    }, [])
  );

  const getCurrentOrders = (): Order[] => {
    switch (activeTab) {
      case 'Active': return orders.active;
      case 'Completed': return orders.completed;
      case 'Cancelled': return orders.cancelled;
      default: return orders.active;
    }
  };

  const handleCancelOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const handleOrderAgain = (order: Order) => {
    // Convert order back to cart items format for PaymentScreen
    const orderItems = order.itemsList.map((item, index) => ({
      id: `item_${index}`,
      name: item.name,
      price: parseFloat(String(item.price).replace(',', '')),
      quantity: 1,
      image: order.image, // Use the order's image for all items
    }));

    // Navigate to PaymentScreen with order data
    navigation.navigate('PaymentScreen', {
      orderItems: orderItems,
      shippingAddress: '278 Locust View Drive Oakland, CA', // Default address
      total: parseFloat(order.total),
    });
  };

  const handleReasonToggle = (reason: keyof typeof cancelReasons) => {
    setCancelReasons(prev => ({
      ...prev,
      [reason]: !prev[reason]
    }));
  };

  const handleSubmitCancel = () => {
    if (!selectedOrderId) return;
    
    const hasReasonSelected = Object.values(cancelReasons).some(val => val);
    if (!hasReasonSelected && !otherReasonText) {
      Alert.alert("Please select a reason for cancellation");
      return;
    }
    
    confirmCancelOrder(selectedOrderId);
    setShowCancelModal(false);
    setShowSuccessModal(true);
    setCancelReasons({
      reason1: false,
      reason2: false,
      reason3: false,
      reason4: false,
      reason5: false,
      otherReason: false,
    });
    setOtherReasonText('');
  };

  const confirmCancelOrder = async (orderId: string) => {
    const toCancel = orders.active.find(o => o.id === orderId);
    if (!toCancel) return;
    
    try {
      await updateOrderStatus(orderId, 'Cancelled');
      const cancelled = { ...toCancel, status: 'Cancelled' as const };
      setOrders(prev => ({
        ...prev,
        active: prev.active.filter(o => o.id !== orderId),
        cancelled: [cancelled, ...prev.cancelled]
      }));
      if (activeTab === 'Active') {
        setActiveTab('Cancelled');
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const getImageSource = (imageName: string) => {
    switch (imageName) {
      case 'green-tea.png': return require('../../assets/green-tea.png');
      case 'chicken.png': return require('../../assets/chicken.png');
      case 'coffee-icecream.png': return require('../../assets/coffee-icecream.png');
      case 'strawberry-cheesecake.png': return require('../../assets/strawberry-cheesecake.png');
      case 'pizza.png': return require('../../assets/pizza.png');
      case 'katsu-donburi.png': return require('../../assets/katsu-donburi.png');
      case 'popcorn-milkshake.png': return require('../../assets/popcorn-milkshake.png');
      case 'burger.png': return require('../../assets/burger.png');
      case 'vegan-toast.png': return require('../../assets/vegan-toast.png');
      case 'blueberry-tea.png': return require('../../assets/blueberry-tea.png');
      default: return require('../../assets/green-tea.png');
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
              source={getImageSource(order.image)} 
              style={styles.orderImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderName}>{order.name}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
            <Text style={styles.orderItems}>{order.items}</Text>
            {(order.status === 'Completed' || order.status === 'Cancelled') && (
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: order.status === 'Cancelled' ? '#EF4444' : '#10B981' }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: order.status === 'Cancelled' ? '#EF4444' : '#10B981' }
                ]}>
                  {order.status === 'Cancelled' ? 'Order cancelled' : 'Order delivered'}
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
            </>
          )}
          
          {activeTab === 'Completed' && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.reviewButton]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ReviewScreen', { order })}
              >
                <Text style={styles.reviewButtonText}>Leave a feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.orderAgainButton]}
                activeOpacity={0.8}
                onPress={() => handleOrderAgain(order)}
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
          onPress={() => navigation.navigate('Main')}
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

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cancel Order</Text>
            <Text style={styles.modalSubtitle}>
              We understand that plans can change. Please select the reason for canceling so we can keep improving.
            </Text>
            
            <View style={styles.reasonsContainer}>
              <TouchableOpacity 
                style={styles.reasonItem}
                onPress={() => handleReasonToggle('reason1')}
              >
                <View style={styles.checkbox}>
                  {cancelReasons.reason1 && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.reasonText}>I changed my mind.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reasonItem}
                onPress={() => handleReasonToggle('reason2')}
              >
                <View style={styles.checkbox}>
                  {cancelReasons.reason2 && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.reasonText}>Ordered by mistake.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reasonItem}
                onPress={() => handleReasonToggle('reason3')}
              >
                <View style={styles.checkbox}>
                  {cancelReasons.reason3 && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.reasonText}>Found a better price elsewhere.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reasonItem}
                onPress={() => handleReasonToggle('reason4')}
              >
                <View style={styles.checkbox}>
                  {cancelReasons.reason4 && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.reasonText}>The restaurant is not responding.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reasonItem}
                onPress={() => handleReasonToggle('reason5')}
              >
                <View style={styles.checkbox}>
                  {cancelReasons.reason5 && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.reasonText}>The estimated delivery time is too long.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.reasonItem}
                onPress={() => handleReasonToggle('otherReason')}
              >
                <View style={styles.checkbox}>
                  {cancelReasons.otherReason && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.reasonText}>Others</Text>
              </TouchableOpacity>
              
              {cancelReasons.otherReason && (
                <TextInput
                  style={styles.otherReasonInput}
                  placeholder="Others reason..."
                  value={otherReasonText}
                  onChangeText={setOtherReasonText}
                  multiline
                />
              )}
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitCancel}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.successTitle}>Order Cancelled!</Text>
            <Text style={styles.successText}>
              Your order has been successfully cancelled
            </Text>
            <Text style={styles.supportText}>
              If you have any question reach directly to our customer support
            </Text>
            
            <TouchableOpacity 
              style={styles.successButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.successButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    marginTop: 10,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  reasonsContainer: {
    marginBottom: 20,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#FF6B35',
  },
  reasonText: {
    fontSize: 15,
    color: '#1F2937',
    flex: 1,
  },
  otherReasonInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    minHeight: 50,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 10,
  },
  supportText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 25,
  },
  successButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyOrdersScreen;