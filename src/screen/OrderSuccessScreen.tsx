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

const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  const handleTrackOrder = () => {
    navigation.navigate('LiveTrackingScreen');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back to home button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.8}
          onPress={handleBackToHome}
        >
          <Text style={styles.backIcon}> ⌂ </Text>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.content}>
        {/* Icon checkmark */}
        <View style={styles.iconContainer}>
          <MaterialIcons name="check-circle" size={100} color="#EA580C" />
        </View>
        
        {/* Title */}
        <Text style={styles.title}>Order Confirmed!</Text>
        
        {/* Success message */}
        <Text style={styles.message}>Your order has been placed</Text>
        <Text style={styles.message}>successfully</Text>
        
        {/* Delivery time */}
        <View style={styles.deliveryInfo}>
          <MaterialIcons name="access-time" size={24} color="#555" />
          <Text style={styles.deliveryText}>Delivery by Thu, 29th 4:00 PM</Text>
        </View>
        
        {/* Track Order Button */}
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={handleTrackOrder}
        >
          <Text style={styles.trackButtonText}>Track my order</Text>
        </TouchableOpacity>
        
        {/* Footer text */}
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
  trackButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 30,
  },
  trackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderSuccessScreen;