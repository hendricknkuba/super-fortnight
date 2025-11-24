import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        This e-commerce mobile app was created as part of the INFO3173 course.
        It demonstrates Firebase authentication, Firestore integration, and React Native navigation.
      </Text>
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
    lineHeight: 22,
    color: "#444",
  },
});
