import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';
import data from '../assets/data.json';


const STATUS_COLORS = {
  pending: '#fbbf24',     // vàng
  completed: '#22c55e',   // xanh lá
  cancelled: '#ef4444'    // đỏ
};

const OrderManagementScreen = () => {
  const [orders, setOrders] = useState((data as any).orders);

  const getCustomerName = (customerId: string) => {
    const user = (data as any).users.find((u: any) => u.id === customerId);
    return user ? user.name : 'Unknown';
  };

  const getDishName = (dishId: string) => {
    const dish = (data as any).dishes.find((d: any) => d.id === dishId);
    return dish ? dish.name : 'Unknown Dish';
  };

  const updateStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map((order: any) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const confirmCancel = (orderId: string) => {
    Alert.alert('Cancel Order', 'Are you sure to cancel this order?', [
      { text: 'No' },
      { text: 'Yes', onPress: () => updateStatus(orderId, 'cancelled') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      <Text style={styles.heading}>Order Management</Text>

      <FlatList
        data={orders}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.customer}>
                👤 {getCustomerName(item.customerId)}
              </Text>
              <Text
                style={[
                  styles.status,
                  { backgroundColor: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] || '#ccc'
 },
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
            </View>

            {item.items.map((it: any, idx: number) => (
              <Text key={idx} style={styles.itemText}>
                🍽 {getDishName(it.dishId)} × {it.quantity}
              </Text>
            ))}

            <Text style={styles.total}>💵 Total: ${item.total.toFixed(2)}</Text>

            <View style={styles.actionRow}>
              {item.status === 'pending' && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.complete]}
                    onPress={() => updateStatus(item.id, 'completed')}
                  >
                    <Text style={styles.buttonText}>Mark Completed</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.cancel]}
                    onPress={() => confirmCancel(item.id)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f97316',
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customer: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  itemText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#555',
  },
  total: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  status: {
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 10,
  },
  complete: {
    backgroundColor: '#22c55e',
  },
  cancel: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default OrderManagementScreen;
