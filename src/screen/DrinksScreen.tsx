import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';  
import { RootStackParamList } from '../components/navigation'; // Adjust the import path as needed

const drinks = [
  {
    id: '1',
    name: 'Blueberry Tea',
    tag: 'HOT',
    price: 15.0,
    description: 'Fried chicken with rice and egg',
    image: require('../../assets/blueberry-tea.png'),
  },
  {
    id: '2',
    name: 'Green Tea',
    tag: 'HOT',
    price: 12.99,
    description:
      'Marinated in herbs and spices, grilled to perfection, served with a rich dip.',
    image: require('../../assets/green-tea.png'),
  },
  {
    id: '3',
    name: 'Lemonade',
    tag: 'HOT',
    price: 12.99,
    description:
      'Marinated in herbs and spices, grilled to perfection, served with a rich dip.',
    image: require('../../assets/lemonade.png'),
  },
  {
    id: '4',
    name: 'Matcha',
    tag: 'HOT',
    price: 12.99,
    description:
      'Marinated in herbs and spices, grilled to perfection, served with a rich dip.',
    image: require('../../assets/matcha.png'),
  },
  {
    id: '5',
    name: 'Caramel Popcorn Milkshake',
    tag: 'HOT',
    price: 12.99,
    description:
      'Marinated in herbs and spices, grilled to perfection, served with a rich dip.',
    image: require('../../assets/popcorn-milkshake.png'),
  },
];

const categories = ['Snacks', 'Meal', 'Vegan', 'Dessert', 'Drinks'];
type DrinkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Drinks'>;

const DrinkScreen = () => {
    const navigation = useNavigation<DrinkScreenNavigationProp>();
  
  
  return (
    <View style={styles.container}>
        <Header />

      {/* Sort Bar */}
      <View style={styles.sortBar}>
        <Text style={styles.sortBy}>Sort By:</Text>
        <Text style={styles.sortOption}>Popular</Text>
        <Ionicons name="chevron-down" size={16} color="#444" />
      </View>

      {/* Drink Cards */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
  {drinks.map(drink => (
    <View key={drink.id} style={styles.card}>
      <Image source={drink.image} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{drink.name}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{drink.tag}</Text>
          </View>
        </View>
        <Text style={styles.price}>${drink.price.toFixed(2)}</Text>
        <Text style={styles.description}>{drink.description}</Text>

        {/* 👇 Detail Button */}
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('Detail', { item: drink })}>
          <Text style={styles.detailButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  ))}
</ScrollView>

      <Footer/>
      
      {/* Categories */}
    </View>
  );
};

export default DrinkScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff'},

  categories: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#999',
  },
  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#f97316',
    paddingBottom: 4,
  },
  activeCategoryText: {
    color: '#f97316',
    fontWeight: 'bold',
  },

  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortBy: {
    color: '#444',
    marginRight: 4,
  },
  sortOption: {
    fontWeight: 'bold',
    marginRight: 4,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  tag: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  price: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 6,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  detailButton: {
  marginTop: 10,
  alignSelf: 'flex-start',
  backgroundColor: '#f97316',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
},
detailButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},
});
