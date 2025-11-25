import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PRIMARY = "#FF4647";

export default function OrderSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { orderId, total, items = [] } = route.params;

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 1,
      bounciness: 14,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* CHECK ANIMATION */}
      <Animated.View style={[styles.checkCircle, { transform: [{ scale }] }]}>
        <Ionicons name="checkmark" size={48} color="#fff" />
      </Animated.View>

      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>Thank you for shopping with us.</Text>

      {/* RECEIPT */}
      <View style={styles.receiptBox}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.orderId}>#{orderId}</Text>

        <View style={styles.line} />

        {/* LIST OF ITEMS */}
        <Text style={styles.label}>Items</Text>
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>x{item.qty}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
            </View>
          )}
        />

        <View style={styles.line} />

        <Text style={styles.totalLabel}>Total Paid</Text>
        <Text style={styles.totalAmount}>${Number(total).toFixed(2)}</Text>

        <Text style={styles.date}>{new Date().toLocaleString()}</Text>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Products" }],
          })
        }
      >
        <Text style={styles.buttonText}>Back to Store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },

  checkCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: { fontSize: 26, fontWeight: "800", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 22 },

  receiptBox: {
    width: "100%",
    backgroundColor: "#FFF5F5",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: PRIMARY },

  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 2 },
  orderId: { fontSize: 16, fontWeight: "800", marginBottom: 12 },

  line: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: { fontSize: 14, fontWeight: "500", color: "#333" },
  itemQty: { fontSize: 14, color: "#777" },
  itemPrice: { fontSize: 14, fontWeight: "700", color: PRIMARY },

  totalLabel: { fontSize: 15, fontWeight: "700", marginTop: 10 },
  totalAmount: { fontSize: 22, fontWeight: "900", color: PRIMARY },

  date: { marginTop: 16, fontSize: 12, color: "#777" },

  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
