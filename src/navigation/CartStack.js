import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/cart/CartScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import OrderSuccessScreen from "../screens/checkout/OrderSuccessScreen";


const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "700",
        },
        headerTintColor: "#FF4647",
      }}
    >
      <Stack.Screen
        name="CartMain"
        component={CartScreen}
        options={{ title: "My Cart" }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />

      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ headerShown: false }}
     />
    </Stack.Navigator>
  );
}