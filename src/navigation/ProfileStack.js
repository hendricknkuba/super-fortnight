import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/profile/ProfileScreen";
import AddressesScreen from "../screens/profile/AddressesScreen";
import PaymentMethodsScreen from "../screens/profile/PaymentMethodsScreen";
import OrderHistoryScreen from "../screens/profile/OrderHistoryScreen";
import AboutScreen from "../screens/static/AboutScreen";
import HelpScreen from "../screens/static/HelpScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerStyle: {
        backgroundColor: "#FFFFFF",
        },
        headerTitleStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1A1A1A",
        },
        headerTintColor: "#FF4647",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
    }}
    >
        <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
        />

      <Stack.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{ title: "My Addresses" }}
      />

      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: "Payment Methods" }}
      />

      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ title: "Order History" }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "About" }}
      />

      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: "Help & Support" }}
      />
    </Stack.Navigator>
  );
}
