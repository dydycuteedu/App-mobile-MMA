import { Order } from "../screen/OrderDetailScreen";
export type RootStackParamList = {
  Login: undefined;
  Signin: undefined;
  Main: undefined;
  Snack: undefined;
  Meal: undefined;
  Vegan: undefined;
  Dessert: undefined;
  Drinks: undefined;
  MyOrderScreen: undefined;
  AccountScreen: undefined;
  Admin: undefined;
  OrderDetailScreen: { order: Order };
  LiveTrackingScreen: { order: Order };
  ReviewScreen: { order: Order };
  Detail: { item: any };
};
