import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
export default function LoginScreen() {
  const navigation = useNavigation();
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
        <Text style={styles.welcomeText}>Welcome to out food</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name={"user"} size={20} color={"black"}></Icon>
        <TextInput style={styles.textInput} placeholder=" username"></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Icon name={"lock"} size={20} color={"black"}></Icon>
        <TextInput
          style={styles.textInput}
          placeholder=" password"
          secureTextEntry
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.loginButton}>
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

    alignItems: "center", // Can giữa theo chiều ngang
  },
  logoContainer: {
    width: 150, // hoặc số cụ thể, hoặc '40%'
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
    width: "80%", // 👈 tăng chiều rộng
    alignSelf: "center",

    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    icon: {
      paddingRight: 50, // Khoảng cách giữa icon và text
    },
    textInput: {
      flex: 1, // 👈 chiếm hết phần còn lại
      fontSize: 16,
      color: "#333",
      paddingLeft: 50, // Khoảng cách giữa icon và text
    },
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 60,
    shadowColor: "#000", // iOS shadow
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
    color: "#FFEEA9", // màu xanh để nổi bật
    fontWeight: "bold",
  },
});
