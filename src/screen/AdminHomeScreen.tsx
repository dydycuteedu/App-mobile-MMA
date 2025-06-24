import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import data from '../assets/data.json';

const bestSellers = [
  {
    name: 'Burger',
    price: '$10.00',
    image: require('../../assets/burger.png'),
  },
  {
    name: 'Salad',
    price: '$12.00',
    image: require('../../assets/burger.png'),
  },
  {
    name: 'Yogurt',
    price: '$8.20',
    image: require('../../assets/burger.png'),
  },
];

const recommended = [
  {
    name: 'Cheeseburger',
    price: '$9.99',
    image: require('../../assets/burger.png'),
  },
  {
    name: 'Spring Rolls',
    price: '$6.50',
    image: require('../../assets/burger.png'),
  },
];

const AdminHomeScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const currentUser = (route.params as any)?.user;

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Orders Button for Admin */}
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <Ionicons name="clipboard-outline" size={16} color="white" />
          <Text style={styles.orderButtonText}>Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Best Seller Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Seller</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestSellers.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>Experience our delicious new dish</Text>
        <Text style={styles.promoDiscount}>30% OFF</Text>
        <Image
          source={require('../../assets/burger.png')}
          style={styles.promoImage}
        />
      </View>

      {/* Recommended Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommend</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommended.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  section: { marginBottom: 25, paddingHorizontal: 15 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAll: { color: '#f97316', fontSize: 14 },
  card: {
    width: 120,
    backgroundColor: '#fff7ed',
    marginRight: 15,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardText: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardPrice: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 13,
  },
  promoBanner: {
    backgroundColor: '#fde68a',
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 25,
  },
  promoText: { fontSize: 16, color: '#333', marginBottom: 5 },
  promoDiscount: { fontSize: 26, color: '#dc2626', fontWeight: 'bold' },
  promoImage: {
    position: 'absolute',
    right: -10,
    top: 10,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  orderButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  orderButton: {
    backgroundColor: '#f97316',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 2,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AdminHomeScreen;
