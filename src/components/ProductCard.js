import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const PRIMARY = "#FF4647";

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>

      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 6,
    width: "46%",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },

    // Android shadow
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    marginBottom: 10,
  },

  name: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    fontSize: 15,
    fontWeight: "800",
    color: PRIMARY,
  },
});