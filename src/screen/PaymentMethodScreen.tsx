import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import CommonHeader from '../components/CommonHeader';

const PaymentMethodScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFD93D" />
      <CommonHeader title="Payment Methods" />
      <View style={styles.body}>
        <Text style={styles.placeholder}>You haven’t added any payment methods.</Text>

        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD93D',
  },
  body: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  placeholder: {
    color: '#555',
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
