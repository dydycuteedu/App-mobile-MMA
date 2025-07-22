import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import { getAddressesByUser } from '../api/addressApi';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryAddressScreen = ({ navigation }: any) => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getAddressesByUser(userId).then(setAddresses);
    }
  }, [userId]);

  const renderAddressItem = ({ item }: any) => (
    <View style={styles.addressCard}>
      <Text style={styles.name}>{item.fullName}</Text>
      <Text>{item.address}</Text>
      <Text style={styles.info}>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFD93D" />
      <CommonHeader title="Delivery Address" />
      <View style={styles.body}>
        {addresses.length === 0 ? (
          <Text style={styles.placeholder}>Your saved addresses will appear here.</Text>
        ) : (
          <FlatList
            data={addresses}
            renderItem={renderAddressItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAddressScreen')}>
          <Text style={styles.addButtonText}>+ Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryAddressScreen;

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
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  info: {
    color: '#444',
  },
});
