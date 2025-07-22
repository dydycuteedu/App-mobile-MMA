import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../components/navigation"; // Update with your actual path
import AsyncStorage from '@react-native-async-storage/async-storage';

// ===================================================================
// ĐỊA CHỈ IP MỚI CỦA CẬU ĐÃ ĐƯỢC CẬP NHẬT
const YOUR_COMPUTER_IP = '192.168.6.209';
// ===================================================================

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState(""); // State này sẽ chứa email
  const [password, setPassword] = useState("");

  


const handleLogin = async () => {
  if (!username || !password) {
    Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu");
    return;
  }

  try {
    const response = await fetch(
      `http://192.168.6.209:3000/users?email=${username}&password=${password}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const user = data[0];

      if (user.isBanned) {
        Alert.alert("Truy cập bị từ chối", "Tài khoản của bạn đã bị khóa.");
        return;
      }

      // Lưu thông tin user vào AsyncStorage
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

      // Điều hướng theo vai trò
      if (user.role === 'admin') {
        navigation.navigate('Admin');
      } else if (user.role === 'customer') {
        navigation.navigate('Main');
      } else {
        Alert.alert("Lỗi", "Vai trò người dùng không được nhận dạng.");
      }
    } else {
      Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    Alert.alert("Lỗi", "Không thể kết nối đến server. Hãy kiểm tra lại IP hoặc khởi động lại JSON Server.");
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to our food</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.normalText}>Don't have an account? </Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Signin")}
        >
          Sign in
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF7D29",
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  welcomeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingLeft: 10,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  normalText: {
    fontSize: 16,
    color: "#333",
  },
  signupText: {
    fontSize: 16,
    color: "#FFEEA9",
    fontWeight: "bold",
  },
});
