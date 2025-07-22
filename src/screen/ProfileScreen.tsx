import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

const ProfileScreen = () => {
  // Dữ liệu người dùng cố định
  const user = {
    id: '1753087563245',
    name: 'dy',
    email: 'cdy@gmail.com',
    password: '1', // Không hiển thị mật khẩu
    address: 'N/A',
    phone: '0905443128',
    role: 'customer',
    isBanned: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/anh.jpg')} // Thay bằng hình thật nếu có
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Số điện thoại:</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>

          <Text style={styles.infoLabel}>Địa chỉ:</Text>
          <Text style={styles.infoValue}>{user.address}</Text>

          <Text style={styles.infoLabel}>Vai trò:</Text>
          <Text style={styles.infoValue}>{user.role}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: '#FFA726',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '85%',
    elevation: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  infoSection: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
  },
});
