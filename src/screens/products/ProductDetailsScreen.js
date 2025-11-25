import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const PRIMARY = "#FF4647";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);

  function increase() {
    if (qty < 10) setQty(qty + 1);
  }
  function decrease() {
    if (qty > 1) setQty(qty - 1);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Quantity Selector */}
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
            <Ionicons name="remove" size={20} color="#333" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
            <Ionicons name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.85}
          onPress={() => {
            addToCart(product, qty);
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="cart-outline" size={22} color="#FFF" />
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  backBtn: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 10,
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 330,
    backgroundColor: "#F5F5F5",
  },

  content: {
    padding: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 4,
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: PRIMARY,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 30,
  },

  qtyBtn: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
  },

  qtyText: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 20,
  },

  addButton: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  addBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});