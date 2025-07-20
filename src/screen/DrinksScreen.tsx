import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/navigation';
import { getFoodsByCategory } from '../api/foodAPI';
import { Food } from '../dataTypes/foodTypes';

type DrinksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Drinks'>;

const DrinksScreen = () => {
  const navigation = useNavigation<DrinksScreenNavigationProp>();
  const [veganFoods, setDrinksFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinksFoods = async () => {
      try {
        const data = await getFoodsByCategory('Drinks');
        setDrinksFoods(data);
        console.log('Fetched drinks:', data);
      } catch (error) {
        console.error('Failed to fetch drinks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinksFoods();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      {/* Sort Bar */}
      <View style={styles.sortBar}>
        <Text style={styles.sortBy}>Sort By:</Text>
        <Text style={styles.sortOption}>Popular</Text>
        <Ionicons name="chevron-down" size={16} color="#444" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f97316" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {veganFoods.map((vegan) => (
            <View key={vegan.id} style={styles.card}>
              <Image source={{ uri: vegan.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{vegan.name}</Text>
                  {vegan.tag && (
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{vegan.tag}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.price}>${vegan.price}</Text>
                <Text style={styles.description}>{vegan.description}</Text>

                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => navigation.navigate('Detail', { item: vegan })}
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default DrinksScreen;


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
