import { View, Text, StyleSheet } from "react-native";

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <Text style={styles.text}>
        For support, please contact:
      </Text>

      <Text style={styles.item}>📧 Email: support@example.com</Text>
      <Text style={styles.item}>📞 Phone: +1 (555) 123-4567</Text>
      <Text style={styles.item}>❓ FAQ section coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginTop: 6,
  },
});
