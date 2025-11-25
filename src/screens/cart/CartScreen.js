import { useCart } from "../../context/CartContext";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY = "#FF4647";

export default function CartScreen({ navigation }) {
  const { cart, updateQty, removeFromCart } = useCart();

  // FIX: qty instead of quantity (prevents NaN)
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  return (
    <View style={styles.container}>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="cart-outline" size={80} color="#E0E0E0" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Items you add will appear here.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    ${item.price.toFixed(2)}
                  </Text>

                  {/* FIXED QTY ROW */}
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => item.qty > 1 && updateQty(item.id, item.qty - 1)}
                    >
                      <Ionicons name="remove" size={18} color="#333" />
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.qty}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => item.qty < 10 && updateQty(item.id, item.qty + 1)}
                    >
                      <Ionicons name="add" size={18} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={22} color={PRIMARY} />
                </TouchableOpacity>

              </View>
            )}
          />

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalAmount}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>

          </View>
        </>
      )}
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "700",
  },
  emptySub: {
    fontSize: 14,
    color: "#6F6F6F",
    marginTop: 6,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },

  details: { flex: 1 },

  name: {
    fontSize: 15,
    fontWeight: "700",
  },

  price: {
    marginTop: 4,
    fontSize: 15,
    color: PRIMARY,
    fontWeight: "700",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 14,
  },

  qtyBtn: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 8,
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    padding: 20,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  totalLabel: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: "800",
  },

  checkoutBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },

  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});