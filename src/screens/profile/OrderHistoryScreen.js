import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserOrders } from "../../services/orderService";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    const data = await getUserOrders();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function formatDate(timestamp) {
    if (!timestamp) return "Unknown date";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getStatusBadge(status) {
    const s = status || "Processing";
    switch (s) {
      case "Delivered":
        return {
          text: "Delivered",
          dot: "#00C853",
          bg: "#E8F8EE",
          fg: "#00C853",
        };
      case "Shipped":
        return {
          text: "Shipped",
          dot: "#FFA000",
          bg: "#FFF3D6",
          fg: "#FFA000",
        };
      default:
        return {
          text: "Processing",
          dot: "#1877F2",
          bg: "#E8F0FE",
          fg: "#1877F2",
        };
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#FF4647" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="cube-outline" size={64} color="#E0E0E0" />
        <Text style={styles.emptyText}>No past orders yet</Text>
        <Text style={styles.emptySub}>
          Your completed orders will appear here.
        </Text>

        {/* opcional: botão futuro para ir à loja */}
        {/* <TouchableOpacity style={styles.emptyBtn}>
          <Text style={styles.emptyBtnText}>Start Shopping</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
        renderItem={({ item }) => {
          const badge = getStatusBadge(item.status);
          return (
            <TouchableOpacity activeOpacity={0.9} style={styles.card}>
              {/* Top row */}
              <View style={styles.topRow}>
                <View style={styles.orderLeft}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="cube-outline" size={18} color="#FF4647" />
                  </View>
                  <Text style={styles.orderId} numberOfLines={1}>
                    Order #{item.id}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: badge.bg },
                  ]}
                >
                  <View
                    style={[
                      styles.badgeDot,
                      { backgroundColor: badge.dot },
                    ]}
                  />
                  <Text style={[styles.badgeText, { color: badge.fg }]}>
                    {badge.text}
                  </Text>
                </View>
              </View>

              {/* Middle */}
              <View style={styles.midRow}>
                <Ionicons name="calendar-outline" size={14} color="#8A8A8A" />
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
              </View>

              {/* Bottom */}
              <View style={styles.bottomRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>
                  ${item.total?.toFixed(2) || "0.00"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
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

  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyText: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  emptySub: {
    fontSize: 14,
    marginTop: 6,
    color: "#6F6F6F",
    textAlign: "center",
  },
  emptyBtn: {
    marginTop: 18,
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  emptyBtnText: {
    color: "#FFF",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    maxWidth: "70%",
  },

  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 6,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  midRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  date: {
    fontSize: 13,
    color: "#6F6F6F",
    fontWeight: "500",
  },

  bottomRow: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    color: "#6F6F6F",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: PRIMARY,
  },
});