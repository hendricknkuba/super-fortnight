import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPaymentMethod, setPaymentMethod } from "../../services/paymentMethodService";

const PRIMARY = "#FF4647";

// Lista fixa de métodos disponíveis
const METHODS = [
  { key: "visa", label: "Visa", icon: "card-outline", sub: "Pay with Visa card" },
  { key: "mastercard", label: "Mastercard", icon: "card-outline", sub: "Pay with Mastercard" },
  { key: "paypal", label: "PayPal", icon: "logo-paypal", sub: "Use your PayPal account" },
  { key: "applepay", label: "Apple Pay", icon: "logo-apple", sub: "Quick Apple Pay checkout" },
  { key: "googlepay", label: "Google Pay", icon: "logo-google", sub: "Quick Google Pay checkout" },
];

export default function PaymentMethodsScreen() {
  const [selected, setSelected] = useState(null);

  async function load() {
    const method = await getPaymentMethod();
    setSelected(method);
  }

  async function handleSelect(methodKey) {
    setSelected(methodKey);
    await setPaymentMethod(methodKey);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={METHODS}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => handleSelect(item.key)}
          >
            {/* Left Section */}
            <View style={styles.left}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={20} color={PRIMARY} />
              </View>

              <View>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.sub}>{item.sub}</Text>
              </View>
            </View>

            {/* Right - Radio Button */}
            <View style={styles.radioOuter}>
              {selected === item.key && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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

    // Sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // Android
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  sub: {
    fontSize: 13,
    color: "#6F6F6F",
    marginTop: 2,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PRIMARY,
  },
});