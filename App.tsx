// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from './src/screen/LoginScreen';
import SigninScreen from './src/screen/SigninScreen';
import TabNavigator from './src/components/Footer';
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
import DashboardScreen from "./src/screen/DashboardScreen";
import { Provider } from 'react-redux';
import store from './src/redux/store';
// --- THÊM DÒNG NÀY ĐỂ IMPORT MÀN HÌNH MỚI ---
import OrderManagementScreen from "./src/screen/OrderManagementScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
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
        <Stack.Screen name="UserManagement" component={UserManagementScreen} options={{ title: "Quản lý Người dùng" }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        

        
        {/* --- THÊM DÒNG NÀY ĐỂ ĐĂNG KÝ MÀN HÌNH MỚI --- */}
        <Stack.Screen name="OrderManagement" component={OrderManagementScreen} />

       </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
