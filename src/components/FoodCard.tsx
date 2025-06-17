import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const FoodCard = ({ image, name, desc, price }: any) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textDark,
  },
  desc: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  price: {
    color: Colors.accentRed,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodCard;
