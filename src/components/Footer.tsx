// src/components/Footer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© 2025 Foodie App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFA826',
    alignItems: 'center',
    bottom: 0,
    width: '100%'
  },
  text: {
    color: '#000',
    fontSize: 14
  }
});

export default Footer;
