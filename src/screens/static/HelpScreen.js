import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY = "#FF4647";

export default function HelpScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      
      <View style={styles.headerBox}>
        <Ionicons name="help-circle-outline" size={40} color={PRIMARY} />
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerSub}>
          We're here to help. Choose one of the support options below.
        </Text>
      </View>

      {/* Email */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail-outline" size={20} color={PRIMARY} />
          </View>
          <View>
            <Text style={styles.title}>Email Support</Text>
            <Text style={styles.content}>support@ourstore.com</Text>
          </View>
        </View>
      </View>

      {/* Phone */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconCircle}>
            <Ionicons name="call-outline" size={20} color={PRIMARY} />
          </View>
          <View>
            <Text style={styles.title}>Phone</Text>
            <Text style={styles.content}>+1 (555) 123-4567</Text>
          </View>
        </View>
      </View>

      {/* FAQ */}
      <TouchableOpacity style={styles.card} activeOpacity={0.9}>
        <View style={styles.row}>
          <View style={styles.iconCircle}>
            <Ionicons name="help-buoy-outline" size={20} color={PRIMARY} />
          </View>
          <View>
            <Text style={styles.title}>FAQ</Text>
            <Text style={styles.content}>Common questions answered</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Troubleshooting */}
      <TouchableOpacity style={styles.card} activeOpacity={0.9}>
        <View style={styles.row}>
          <View style={styles.iconCircle}>
            <Ionicons name="build-outline" size={20} color={PRIMARY} />
          </View>
          <View>
            <Text style={styles.title}>Troubleshooting</Text>
            <Text style={styles.content}>App errors or performance issues?</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <Text style={styles.footer}>Need more help? Reach out anytime.</Text>

    </ScrollView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  headerBox: {
    alignItems: "center",
    marginBottom: 26,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 12,
  },

  headerSub: {
    color: "#6F6F6F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  row: {
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

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  content: {
    fontSize: 14,
    color: "#6F6F6F",
    marginTop: 2,
  },

  footer: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
    color: "#9A9A9A",
    fontSize: 12,
  },
});