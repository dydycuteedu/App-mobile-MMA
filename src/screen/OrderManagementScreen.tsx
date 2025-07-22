import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Platform } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Dựa theo cấu trúc trong file db.json của cậu
interface Order {
  id: string;
  total: number | string;
  status: string; 
  customerId?: string;
  date?: string;
}

// ===================================================================
// ĐỊA CHỈ IP MỚI CỦA CẬU ĐÃ ĐƯỢC CẬP NHẬT
const YOUR_COMPUTER_IP = "10.12.66.89";
// ===================================================================

const API_URL = `http://${YOUR_COMPUTER_IP}:3000/orders`;

// Component cho từng nút tab
const StatusTab = ({ title, isActive, onPress }: { title: string, isActive: boolean, onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.tab, isActive && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

export default function OrderManagementScreen() {
  const navigation = useNavigation();
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('New'); // Các tab: New, In Progress, History

  const fetchOrders = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const data: Order[] = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách đơn hàng. Hãy đảm bảo server đang chạy.");
    } finally {
      setLoading(false);
    }
  };

  // Lọc danh sách đơn hàng mỗi khi allOrders hoặc activeTab thay đổi
  useEffect(() => {
    let ordersToShow: Order[] = [];
    if (activeTab === 'New') {
      ordersToShow = allOrders.filter(o => o.status.toLowerCase() === 'pending');
    } else if (activeTab === 'In Progress') {
      ordersToShow = allOrders.filter(o => ['confirmed', 'shipping'].includes(o.status.toLowerCase()));
    } else { // History
      ordersToShow = allOrders.filter(o => ['completed', 'cancelled'].includes(o.status.toLowerCase()));
    }
    setFilteredOrders(ordersToShow);
  }, [allOrders, activeTab]);


  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`${API_URL}/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchOrders(); // Tải lại toàn bộ danh sách để cập nhật
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật trạng thái thất bại.");
    }
  };

  const handleCancelOrder = (order: Order) => {
    Alert.alert(
      "Xác nhận hủy",
      `Bạn có chắc chắn muốn hủy đơn hàng "${order.id}" không?`,
      [
        { text: "Không", style: "cancel" },
        { text: "Hủy đơn", onPress: () => updateOrderStatus(order.id, 'Cancelled'), style: 'destructive' }
      ]
    );
  };
  
  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'pending') return { container: styles.statusPending, text: styles.statusTextLight };
    if (s === 'confirmed') return { container: styles.statusConfirmed, text: styles.statusTextLight };
    if (s === 'shipping') return { container: styles.statusShipping, text: styles.statusTextLight };
    if (s === 'completed') return { container: styles.statusCompleted, text: styles.statusTextDark };
    if (s === 'cancelled') return { container: styles.statusCancelled, text: styles.statusTextDark };
    return { container: {}, text: {} };
  };

  // Component render các nút hành động tùy theo trạng thái
  const ActionButtons = ({ order }: { order: Order }) => {
    const currentStatus = order.status.toLowerCase();

    switch (currentStatus) {
      case 'pending':
        return (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.confirmButton]} onPress={() => updateOrderStatus(order.id, 'Confirmed')}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => handleCancelOrder(order)}>
              <Ionicons name="close-circle-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        );
      case 'confirmed':
        return (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.shippingButton]} onPress={() => updateOrderStatus(order.id, 'Shipping')}>
              <Ionicons name="rocket-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Shipping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => handleCancelOrder(order)}>
               <Ionicons name="close-circle-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        );
      case 'shipping':
        return (
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.completeButton]} onPress={() => updateOrderStatus(order.id, 'Completed')}>
              <Ionicons name="flag-outline" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null; // Không hiển thị nút cho đơn hàng đã hoàn thành hoặc đã hủy
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>Order ID: {item.id}</Text>
          <View style={[styles.statusBadge, statusStyle.container]}>
            <Text style={statusStyle.text}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemDetail}><Ionicons name="calendar-outline" size={14} /> {item.date}</Text>
          <Text style={styles.itemDetail}><Ionicons name="person-outline" size={14} /> Customer ID: {item.customerId || 'N/A'}</Text>
          <Text style={styles.itemTotal}>Total: ${Number(item.total).toFixed(2)}</Text>
        </View>
        <ActionButtons order={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Management</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <StatusTab title="New" isActive={activeTab === 'New'} onPress={() => setActiveTab('New')} />
        <StatusTab title="In Progress" isActive={activeTab === 'In Progress'} onPress={() => setActiveTab('In Progress')} />
        <StatusTab title="History" isActive={activeTab === 'History'} onPress={() => setActiveTab('History')} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F5CB58" style={{ marginTop: 50 }}/>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.body}
          onRefresh={fetchOrders}
          refreshing={loading}
          ListEmptyComponent={<Text style={styles.emptyText}>No orders in this category.</Text>}
        />
      )}
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#F5CB58",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  backButton: { marginRight: 15 },
  headerText: { color: "white", fontSize: 22, fontWeight: "bold" },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#F5CB58',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
  body: { paddingHorizontal: 15, paddingTop: 15, paddingBottom: 30 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ECECEC",
    elevation: 3,
    shadowColor: '#404040',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  itemTitle: { fontSize: 18, fontWeight: "bold", color: '#333' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: { backgroundColor: '#FFA726' },
  statusConfirmed: { backgroundColor: '#66BB6A' },
  statusShipping: { backgroundColor: '#29B6F6' },
  statusCompleted: { backgroundColor: '#E0E0E0' },
  statusCancelled: { backgroundColor: '#EF5350' },
  statusTextLight: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  statusTextDark: { color: '#333', fontWeight: 'bold', fontSize: 12 },
  itemBody: {
    padding: 15,
  },
  itemDetail: { fontSize: 15, color: "#555", marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  itemTotal: { fontSize: 16, color: '#333', fontWeight: 'bold', marginTop: 5 },
  actionRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  confirmButton: { backgroundColor: '#4CAF50' },
  shippingButton: { backgroundColor: '#03A9F4' },
  completeButton: { backgroundColor: '#78909C' },
  cancelButton: { backgroundColor: '#F44336' },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  }
});
