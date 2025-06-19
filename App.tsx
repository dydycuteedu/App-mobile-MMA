// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from "./src/screen/LoginScren";
import SigninScreen from "./src/screen/SigninScreen";
import HomeScreen from "./src/screen/HomeScreen";
import SnackScreen from "./src/screen/SnackScreen";
import MealScreen from "./src/screen/MealScreen";
import VeganScreen from "./src/screen/VeganScreen";
import DessertScreen from "./src/screen/DessertScreen";
import DrinksScreen from "./src/screen/DrinksScreen";
import MyOrdersScreen from "./src/screen/MyOrderScreen";
import OrderDetailScreen from "./src/screen/OrderDetailScreen";
import LiveTrackingScreen from "./src/screen/LiveTrackingScreen";
import ConfirmOrderScreen from "./src/screen/ConfirmOrderScreen";
import ReviewScreen from "./src/screen/ReviewScreen";
import PaymentScreen from "./src/screen/PaymentScreen";
import OrderSuccessScreen from "./src/screen/OrderSuccessScreen";
import AdminScreen from "./src/screen/AdminScreen";
import FoodManagementScreen from "./src/screen/FoodManagementScreen";
import PromotionManagementScreen from "./src/screen/PromotionManagementScreen";
import UserManagementScreen from "./src/screen/UserManagementScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Snack" component={SnackScreen} />
        <Stack.Screen name="Meal" component={MealScreen} />
        <Stack.Screen name="Vegan" component={VeganScreen} />
        <Stack.Screen name="Dessert" component={DessertScreen} />
        <Stack.Screen name="Drinks" component={DrinksScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="MyOrderScreen" component={MyOrdersScreen} />
        <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="LiveTrackingScreen" component={LiveTrackingScreen}/>
        <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen}/>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen}/>
        <Stack.Screen name="Admin"component={AdminScreen} options={{ title: "Admin Dashboard" }}/>
        <Stack.Screen name="FoodManagement" component={FoodManagementScreen} options={{ title: "Quản lý Thực phẩm" }}/>
        <Stack.Screen name="PromotionManagement" component={PromotionManagementScreen} options={{ title: "Quản lý Khuyến mãi" }}/>
        <Stack.Screen name="UserManagement" component={UserManagementScreen} options={{ title: "Quản lý Người dùng" }}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}
