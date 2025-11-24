import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY = "#FF4647";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      
      <View style={styles.headerBox}>
        <Ionicons name="information-circle-outline" size={40} color={PRIMARY} />
        <Text style={styles.headerTitle}>About This App</Text>
        <Text style={styles.headerSub}>
          Learn more about the project and the team behind it.
        </Text>
      </View>

      {/* App Info Card */}
      <View style={styles.card}>
        <Text style={styles.title}>App Name</Text>
        <Text style={styles.content}>OurStore – E-Commerce Mobile App</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Version</Text>
        <Text style={styles.content}>1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Project Purpose</Text>
        <Text style={styles.content}>
          This mobile app was developed as part of a group academic project. It
          demonstrates modern authentication, user profile management, product
          browsing, and UI patterns used in real e-commerce applications.
        </Text>
      </View>

      {/* Team */}
      <View style={styles.card}>
        <Text style={styles.title}>Developers</Text>

        <Text style={styles.person}>
          Hendrick Nkuba – Authentication, Profile & Settings
        </Text>
        <Text style={styles.person}>
          James – Home, Products & Navigation
        </Text>
        <Text style={styles.person}>
          Ola – Cart, Checkout & Order Logic
        </Text>
      </View>

      <Text style={styles.footer}>© 2025 OurStore. All rights reserved.</Text>

    </ScrollView>
  );
}

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

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1A1A1A",
  },

  content: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 20,
  },

  person: {
    fontSize: 14,
    color: "#4A4A4A",
    marginTop: 4,
  },

  footer: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    color: "#9A9A9A",
    fontSize: 12,
  },
});