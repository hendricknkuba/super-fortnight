import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddressesScreen() {
  // Temporary mock data — we will replace with Firestore later
  const data = [
    { id: "1", label: "Home", address: "123 Main Street", isDefault: true },
    { id: "2", label: "Work", address: "456 Office Road", isDefault: false },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={22} color="#FF4647" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.address}>{item.address}</Text>
              </View>
            </View>

            {item.isDefault && (
              <Text style={styles.defaultTag}>Default</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add New Address</Text>
      </TouchableOpacity>
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
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  defaultTag: {
    backgroundColor: PRIMARY,
    color: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  button: {
    backgroundColor: PRIMARY,
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
