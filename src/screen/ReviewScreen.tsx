import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Order } from './OrderDetailScreen';

type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReviewScreen'>;
type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'ReviewScreen'>;

interface Props {
  navigation: ReviewScreenNavigationProp;
  route: ReviewScreenRouteProp;
}

const ReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { order } = route.params;
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert("Please select a rating");
      return;
    }
    
    if (!reviewText.trim()) {
      Alert.alert("Please write your review before submitting");
      return;
    }
    
    Alert.alert("Thank You", "Your review has been submitted!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFD93D" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave a Review</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Nội dung chính với bo tròn cạnh trên */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Dish Information */}
          <View style={styles.dishContainer}>
            <Image 
              source={order.image} 
              style={styles.dishImage}
              resizeMode="cover"
            />
            <Text style={styles.dishName}>{order.name}</Text>
          </View>
          
          {/* Review Prompt */}
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>
              We'd love to know what you
            </Text>
            <Text style={styles.promptText}>
              think of your dish.
            </Text>
          </View>
          
          <Text style={styles.commentLabel}>
            Leave us your comment!
          </Text>

          {/* Rating Stars */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Image
                  source={
                    star <= rating 
                      ? require('../assets/images/star-filled.png') 
                      : require('../assets/images/star-empty.png')
                  }
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Review Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write Review..."
              placeholderTextColor="#9CA3AF"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFD93D',
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
  // Phần nội dung chính với bo tròn cạnh trên
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -15, // Để bo tròn lấn lên phần header
    paddingTop: 25, // Bù lại phần margin âm
    overflow: 'hidden', // Đảm bảo bo tròn hiển thị đúng
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  dishContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  dishImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#1F2937',
    textAlign: 'center',
  },
  promptContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  promptText: {
    fontSize: 18,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 24,
  },
  commentLabel: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 25,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  star: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reviewInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 190,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  cancelButtonText: {
    color: '#FF6B35',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    width: '48%',
    backgroundColor: '#FF6B35',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReviewScreen;