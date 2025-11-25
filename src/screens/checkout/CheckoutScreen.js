import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { getDefaultAddress } from "../../services/addressService";
import { useIsFocused } from "@react-navigation/native";
import { createOrder } from "../../services/orderService";

const PRIMARY = "#FF4647";

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart } = useCart();

  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");

  const isFocused = useIsFocused();

  /* SAFE CALCULATIONS */
  const subtotal = cart.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.qty),
    0
  );
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  /* Load address every time Checkout is focused */
  useEffect(() => {
    async function fetchAddr() {
      const addr = await getDefaultAddress();
      setAddress(addr);
    }
    fetchAddr();
  }, [isFocused]);

  async function handlePlaceOrder() {
    if (cart.length === 0) return;

    if (!address) {
      alert("Please select a shipping address first.");
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder({
        items: cart,
        address,
        paymentMethod,
        total: Number(total),
      });

      clearCart();

      navigation.replace("OrderSuccess", {
        orderId: order.id,
        total: Number(total),
        items: cart,
      });

    } catch (error) {
      console.log("ORDER ERROR:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      {/* SHIPPING ADDRESS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>

        <View style={styles.addressCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location-outline" size={24} color={PRIMARY} />

            {address ? (
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.addrText}>{address.address}</Text>
                {address.city && <Text style={styles.addrSub}>{address.city}</Text>}
                {address.postal && <Text style={styles.addrSub}>{address.postal}</Text>}
              </View>
            ) : (
              <Text style={[styles.addrText, { marginLeft: 12 }]}>
                No default address selected
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", { screen: "Addresses" })
            }
            style={styles.changeBtn}
          >
            <Text style={styles.changeBtnText}>
              {address ? "Change" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

        {/* PAYMENT METHOD */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TouchableOpacity
            style={styles.singlePayment}
            onPress={() => {}}
            activeOpacity={0.8}
        >
            <View style={styles.paymentLeft}>
            <Ionicons name="card-outline" size={22} color={PRIMARY} />
            <Text style={styles.singlePaymentLabel}>Visa Card  ****1234</Text>
            </View>

            {/* lock para dar credibilidade */}
            <Ionicons name="lock-closed-outline" size={20} color="#777" />
        </TouchableOpacity>
        </View>

      {/* ITEMS LIST */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.qty}>Qty: {item.qty}</Text>
              </View>

              <Text style={styles.itemPrice}>
                ${(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes (13%)</Text>
          <Text style={styles.summaryValue}>${taxes.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryTotal}>
          <Text style={styles.summaryTotalLabel}>Total</Text>
          <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          disabled={loading}
          onPress={handlePlaceOrder}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.checkoutText}>Confirm & Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },

  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  addressCard: {
    backgroundColor: "#FFF5F5",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  addrText: { fontSize: 15, fontWeight: "700", color: "#1A1A1A" },
  addrSub: { fontSize: 13, color: "#555", marginTop: 2 },

  changeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: PRIMARY,
    borderRadius: 10,
  },
  changeBtnText: { color: "#FFF", fontWeight: "700", fontSize: 13 },

  paymentBox: {
    backgroundColor: "#FFF5F5",
    padding: 14,
    borderRadius: 14,
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#FFF",
  },

  selectedPayment: {
    borderWidth: 2,
    borderColor: PRIMARY,
    backgroundColor: "#FFE8E8",
  },

  paymentLabel: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
  },

  // ITEMS
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  itemName: { fontSize: 15, fontWeight: "600" },
  qty: { fontSize: 13, color: "#666" },
  itemPrice: { fontWeight: "700", color: PRIMARY },

  // SUMMARY
  summaryBox: { marginTop: "auto", paddingTop: 20, borderTopWidth: 1, borderTopColor: "#EEE" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryLabel: { color: "#666", fontSize: 15 },
  summaryValue: { fontSize: 15, fontWeight: "600" },

  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginBottom: 20,
  },

  summaryTotalLabel: { fontSize: 18, fontWeight: "700" },
  summaryTotalValue: { fontSize: 18, fontWeight: "800", color: PRIMARY },

  checkoutBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
  },
  checkoutText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  singlePayment: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 14,
  backgroundColor: "#FFF5F5",
  borderRadius: 14,

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
},

paymentLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

singlePaymentLabel: {
  fontSize: 15,
  fontWeight: "600",
  color: "#1A1A1A",
},

});
