import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

// Temporary placeholder screens
function PlaceholderScreen({ label }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{label}</Text>
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Products" 
        children={() => <PlaceholderScreen label="Products Page" />} 
      />

      <Tab.Screen 
        name="Cart" 
        children={() => <PlaceholderScreen label="Cart Page" />} 
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
