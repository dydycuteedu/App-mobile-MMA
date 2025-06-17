import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import data from '../assets/data.json'; // adjust path if needed

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
  isBanned?: boolean;
}

const CustomerListScreen = () => {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<User[]>(
    data.users.filter((user: User) => user.role === 'customer')
  );

  // Filter by name or email
  const filteredCustomers = customers.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBan = (id: string) => {
    const updated = customers.map(user =>
      user.id === id ? { ...user, isBanned: !user.isBanned } : user
    );
    setCustomers(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customer List</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by name or email"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCustomers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, item.isBanned && styles.banned]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.phone}</Text>
            <TouchableOpacity
              style={[
                styles.button,
                item.isBanned ? styles.unban : styles.ban
              ]}
              onPress={() => toggleBan(item.id)}
            >
              <Text style={styles.buttonText}>
                {item.isBanned ? 'Unban' : 'Ban'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  banned: {
    backgroundColor: '#ffe6e6'
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  button: {
    marginTop: 8,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  ban: {
    backgroundColor: '#ff4d4d'
  },
  unban: {
    backgroundColor: '#4caf50'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default CustomerListScreen;
