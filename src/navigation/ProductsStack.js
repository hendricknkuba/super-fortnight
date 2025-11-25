import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "../screens/products/ProductsScreen";
import ProductDetailsScreen from "../screens/products/ProductDetailsScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";


const Stack = createNativeStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductsHome" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: true, title: "Checkout" }}
      />
    </Stack.Navigator>
  );
}