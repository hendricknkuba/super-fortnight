import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfileStack from "./ProfileStack";
import { useCart } from "../context/CartContext";
import ProductsStack from "./ProductsStack";
import CartStack from "./CartStack";

const Tab = createBottomTabNavigator();

function Placeholder({ label }) {
  return <Text style={{ marginTop: 200, textAlign: "center" }}>{label}</Text>;
}

export default function AppTabs() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // start invisible
  const { getCount } = useCart();

  // fade-in on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#FF4647",
          tabBarInactiveTintColor: "#999",

          tabBarBadge:
          route.name === "Cart" && getCount() > 0
            ? getCount()
            : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#FF4647",
            color: "#FFF",
          },

          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Products") {
              iconName = focused ? "storefront" : "storefront-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            return <Ionicons name={iconName} size={26} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Products"
          component={ProductsStack}
          options={{ headerShown: true }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartStack}
          options={{ headerShown: true }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
}
