import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { auth } from "../../services/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // RootNavigator will redirect automatically to AuthStack
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user?.email?.split("@")[0] || "User"}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Options List */}
        <View style={styles.menu}>
        <MenuItem 
        label="My Addresses" 
        icon="location-outline"
        onPress={() => navigation.navigate("Addresses")}
    />

    <MenuItem 
        label="Order History" 
        icon="time-outline"
        onPress={() => navigation.navigate("OrderHistory")}
    />

    <MenuItem 
        label="Payment Methods" 
        icon="card-outline"
        onPress={() => navigation.navigate("PaymentMethods")}
    />

    <MenuItem 
        label="About" 
        icon="information-circle-outline"
        onPress={() => navigation.navigate("About")}
    />

    <MenuItem 
        label="Help & Support" 
        icon="help-circle-outline"
        onPress={() => navigation.navigate("Help")}
        />
        </View>

      {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}

/* Component for each menu item */
function MenuItem({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={icon} size={22} color="#1A1A1A" style={{ marginRight: 12 }} />
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const PRIMARY = "#FF4647";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#FFF5F5",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  email: {
    fontSize: 14,
    color: "#6F6F6F",
    marginTop: 4,
  },

  menu: {
    marginTop: 20,
  },

  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",          // <-- IMPORTANTE
    justifyContent: "space-between", // <-- IMPORTANTE
    alignItems: "center", 
  },

  menuLabel: {
    fontSize: 16,
    color: "#1A1A1A",
  },

logoutButton: {
  backgroundColor: PRIMARY,
  marginHorizontal: 20,
  marginTop: 40,
  paddingVertical: 14,
  borderRadius: 12,
  elevation: 3,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
},


  logoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});