import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
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
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarBox}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>
          {user?.email?.split("@")[0] || "User"}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* MENU */}
      <View style={styles.menuContainer}>
        <MenuCard
          label="My Addresses"
          icon="location-outline"
          onPress={() => navigation.navigate("Addresses")}
        />

        <MenuCard
          label="Order History"
          icon="time-outline"
          onPress={() => navigation.navigate("OrderHistory")}
        />

        <MenuCard
          label="Payment Methods"
          icon="card-outline"
          onPress={() => navigation.navigate("PaymentMethods")}
        />

        <MenuCard
          label="About"
          icon="information-circle-outline"
          onPress={() => navigation.navigate("About")}
        />

        <MenuCard
          label="Help & Support"
          icon="help-circle-outline"
          onPress={() => navigation.navigate("Help")}
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#FFFFFF"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

/* New Updated Menu Card */
function MenuCard({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cardLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={22} color="#FF4647" />
        </View>

        <Text style={styles.cardLabel}>{label}</Text>
      </View>

      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const PRIMARY = "#FF4647";

/* ---------- STYLES ---------- */

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

  avatarBox: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
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

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#F0F0F0",

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  cardLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  logoutButton: {
    backgroundColor: PRIMARY,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 14,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  logoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
