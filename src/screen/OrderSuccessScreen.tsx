// src/screens/OrderSuccessScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createOrder } from '../api/orderApi';

const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.backIcon}>⌂</Text>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="check-circle" size={100} color="#EA580C" />
        </View>

        <Text style={styles.title}>Order Confirmed!</Text>

        <Text style={styles.message}>Your order has been placed</Text>
        <Text style={styles.message}>successfully</Text>

        <View style={styles.deliveryInfo}>
          <MaterialIcons name="access-time" size={24} color="#555" />
          <Text style={styles.deliveryText}>Delivery by today 4:00 PM</Text>
        </View>

        <Text style={styles.footerText}>
          If you have any questions, please reach out
        </Text>
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
    paddingBottom: 10,
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
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 22,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 32,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: '#FFD93D',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  deliveryText: {
    fontSize: 18,
    color: '#333333',
    marginLeft: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderSuccessScreen;
