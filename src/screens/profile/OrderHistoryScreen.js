import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
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
        return { text: "Delivered", dot: "#00C853", bg: "#E8F8EE", fg: "#00C853" };
      case "Shipped":
        return { text: "Shipped", dot: "#FFA000", bg: "#FFF3D6", fg: "#FFA000" };
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

          const items = item.items || [];
          const totalQty = items.reduce((sum, p) => sum + (p.qty || 0), 0);

          return (
            <TouchableOpacity activeOpacity={0.9} style={styles.card}>

              {/* TOP ROW */}
              <View style={styles.topRow}>
                <View style={styles.leftTop}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="cube-outline" size={18} color="#FF4647" />
                  </View>

                  <Text
                    style={styles.orderId}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    Order #{item.id}
                  </Text>
                </View>

                <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                  <View
                    style={[styles.badgeDot, { backgroundColor: badge.dot }]}
                  />
                  <Text style={[styles.badgeText, { color: badge.fg }]}>
                    {badge.text}
                  </Text>
                </View>
              </View>

              {/* DATE */}
              <View style={styles.midRow}>
                <Ionicons name="calendar-outline" size={14} color="#8A8A8A" />
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
              </View>

              {/* PRODUCT PREVIEW */}
              <View style={styles.previewRow}>
                {items.slice(0, 3).map((prod, index) => (
                  <Image
                    key={index}
                    source={{ uri: prod.image }}
                    style={styles.previewImg}
                  />
                ))}

                {items.length > 3 && (
                  <View style={styles.moreCircle}>
                    <Text style={styles.moreText}>+{items.length - 3}</Text>
                  </View>
                )}
              </View>

              {/* FOOTER */}
              <View style={styles.bottomRow}>
                <Text style={styles.itemsCount}>{totalQty} items</Text>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.totalLabel}>Total Paid</Text>
                  <Text style={styles.totalAmount}>
                    ${item.total?.toFixed(2)}
                  </Text>
                </View>
              </View>

            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const PRIMARY = "#FF4647";

/* =============================
      STYLES
============================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  loadingBox: { flex: 1, justifyContent: "center", alignItems: "center" },

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

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 4,
  },

  leftTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    maxWidth: "55%",
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
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    maxWidth: 160,
  },

  badge: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 18,
    alignItems: "center",
    gap: 4,
    maxWidth: "45%",
    justifyContent: "flex-end",
  },

  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "right",
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

  previewRow: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "center",
    gap: 6,
  },

  previewImg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },

  moreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  moreText: {
    color: "#FFF",
    fontWeight: "700",
  },

  bottomRow: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemsCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  totalLabel: {
    fontSize: 13,
    color: "#666",
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: "800",
    color: PRIMARY,
    marginTop: 2,
  },
});
