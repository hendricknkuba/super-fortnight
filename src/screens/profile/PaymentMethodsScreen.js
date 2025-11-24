import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentMethodsScreen() {
  const methods = [
    { id: "1", label: "Credit / Debit Card", icon: "card-outline" },
    { id: "2", label: "PayPal", icon: "logo-paypal" },
    { id: "3", label: "Cash on Delivery", icon: "cash-outline" },
  ];

  return (
    <View style={styles.container}>
      {methods.map((m) => (
        <TouchableOpacity key={m.id} style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name={m.icon} size={22} color="#FF4647" />
            <Text style={styles.label}>{m.label}</Text>
          </View>

          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const PRIMARY = "#FF4647";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: "#1A1A1A",
  },
});