import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Order } from './OrderDetailScreen';

type LiveTrackingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LiveTrackingScreen'>;
type LiveTrackingScreenRouteProp = RouteProp<RootStackParamList, 'LiveTrackingScreen'>;

interface Props {
  navigation: LiveTrackingScreenNavigationProp;
  route: LiveTrackingScreenRouteProp;
}

const LiveTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFD93D" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Tracking</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Phần nội dung với nền trắng và bo tròn 2 góc trên */}
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <Image 
              source={require('../assets/images/map-placeholder.png')}
              style={styles.mapImage}
              resizeMode="cover"
            />
          </View>

          {/* Driver Info */}
          <View style={styles.driverCard}>
            <View style={styles.driverHeader}>
              <Image 
                source={require('../assets/images/driver-avatar.png')}
                style={styles.driverAvatar}
              />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>John Doe</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>4.9</Text>
                  <Image 
                    source={require('../assets/images/star.png')}
                    style={styles.starIcon}
                  />
                  <Text style={styles.vehicleText}>• Toyota Corolla • AB 1234</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.callButton}>
                <Image 
                  source={require('../assets/images/call-icon.png')}
                  style={styles.buttonIcon}
                />
            
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Image 
                  source={require('../assets/images/message-icon.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Order Info */}
          <View style={styles.orderCard}>
            <Text style={styles.orderTitle}>Delivery goes your way</Text>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order Number</Text>
              <Text style={styles.orderInfoValue}>{order.orderNumber}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Estimated Arrival</Text>
              <Text style={styles.orderInfoValue}>15 min</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <View style={styles.progressLabels}>
              <Text>Order placed</Text>
              <Text>On the way</Text>
              <Text>Delivered</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD93D', // Chỉ header màu vàng
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  // Wrapper cho phần nội dung với bo tròn 2 góc trên
  contentWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mapContainer: {
    height: 300, // Đặt chiều cao cố định cho bản đồ
    backgroundColor: '#e0e0e0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#FFD93D',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  vehicleText: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonIcon: {
    width: 21,
    height: 21,
    padding: 12,

  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 20,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 4,
    width: '50%', // Giả sử đang ở bước 2 (On the way)
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LiveTrackingScreen;