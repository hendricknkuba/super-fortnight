import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileStack from "./ProfileStack";



const Tab = createBottomTabNavigator();

function Placeholder({ label }) {
  return <Text style={{ marginTop: 200, textAlign: "center" }}>{label}</Text>;
}

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF4647",
        tabBarInactiveTintColor: "#999",

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Products") {
            iconName = "storefront-outline";
          } else if (route.name === "Cart") {
            iconName = "cart-outline";
          } else if (route.name === "Profile") {
            iconName = "person-circle-outline";
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Products" children={() => <Placeholder label="Products" />} />
      <Tab.Screen name="Cart" children={() => <Placeholder label="Cart" />} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}   // <-- ESSENCIAL
      />
    </Tab.Navigator>
  );
}