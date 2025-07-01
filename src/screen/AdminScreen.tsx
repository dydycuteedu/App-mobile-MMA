import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

export default function AdminScreen({ navigation }: Props) {
  const createAnimated = () => useRef(new Animated.Value(1)).current;

  const foodAnim = createAnimated();
  const promoAnim = createAnimated();
  const userAnim = createAnimated();

  const animateIn = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.body}>
        {/* Phần trên: Avatar và tên admin + profile button */}
        <View style={styles.profileContainer}>
          <View style={styles.leftProfile}>
            <Image
              source={require("../assets/images/anh.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.adminName}>Hello, Admin</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuContainer}>
          <Pressable
            onPress={() => navigation.navigate("FoodManagement")}
            onPressIn={() => animateIn(foodAnim)}
            onPressOut={() => animateOut(foodAnim)}
          >
            <Animated.View
              style={[styles.menuButton, { transform: [{ scale: foodAnim }] }]}
            >
              <Text style={styles.menuText}>Food Management</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("PromotionManagement")}
            onPressIn={() => animateIn(promoAnim)}
            onPressOut={() => animateOut(promoAnim)}
          >
            <Animated.View
              style={[styles.menuButton, { transform: [{ scale: promoAnim }] }]}
            >
              <Text style={styles.menuText}>Promotion Management</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("UserManagement")}
            onPressIn={() => animateIn(userAnim)}
            onPressOut={() => animateOut(userAnim)}
          >
            <Animated.View
              style={[styles.menuButton, { transform: [{ scale: userAnim }] }]}
            >
              <Text style={styles.menuText}>User Management</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons name="home" size={30} color="#fff" />
        <MaterialIcons name="list" size={30} color="#fff" />
        <FontAwesome name="support" size={30} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#F5CB58",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: "80%",
    width: undefined,
    aspectRatio: 3,
  },

  body: { flex: 1, padding: 20 },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  leftProfile: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  adminName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 15,
  },

  profileButton: {
    backgroundColor: "#E95322",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  profileButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginVertical: 15,
  },

  menuContainer: {
    alignItems: "flex-start",
  },

  menuButton: {
    backgroundColor: "#F5CB58",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    elevation: 5,
  },

  menuText: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E95322",
    paddingVertical: 20,
  },
});
