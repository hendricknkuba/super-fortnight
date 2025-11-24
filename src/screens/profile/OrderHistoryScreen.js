import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OrderHistoryScreen() {
  const orders = [
    { id: "1", date: "2025-01-15", total: 59.99, status: "Delivered" },
    { id: "2", date: "2025-01-19", total: 129.50, status: "Shipped" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.total}>Total: ${item.total}</Text>
            </View>

            <View style={styles.statusContainer}>
              <Ionicons name="time-outline" size={18} color="#FF4647" />
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const PRIMARY = "#FF4647";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFF5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  total: {
    marginTop: 4,
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    marginLeft: 6,
    color: PRIMARY,
    fontSize: 14,
    fontWeight: "600",
  },
});
