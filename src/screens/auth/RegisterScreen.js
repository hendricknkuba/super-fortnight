import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Animated,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();

  // animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    if (password.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters.");
    }

    if (password !== confirm) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // success animation
      setSuccess(true);

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          })
        ]).start();
      }, 400);

    } catch (error) {
      setLoading(false);
      setSuccess(false);

      let msg = "Unable to create your account.";

      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "This email is already registered.";
          break;

        case "auth/invalid-email":
          msg = "Please enter a valid email address.";
          break;

        case "auth/weak-password":
          msg = "The password is too weak.";
          break;

        case "auth/network-request-failed":
          msg = "Network error. Please check your connection.";
          break;
      }

      Alert.alert("Registration Failed", msg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join and start shopping</Text>

          <View style={styles.card}>

            {/* EMAIL */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.inputWrapper}>
              <Ionicons name="repeat-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>

            {/* REGISTER BUTTON */}
            <TouchableOpacity
              style={[styles.button, success && styles.successButton]}
              onPress={handleRegister}
              disabled={loading || success}
            >
              {loading && !success && (
                <ActivityIndicator color="#FFF" size="small" />
              )}

              {success && (
                <Ionicons name="checkmark-circle-outline" size={26} color="#FFF" />
              )}

              {!loading && !success && (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

          </View>

          {/* LOGIN LINK */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={{ fontWeight: "700" }}>Login</Text>
            </Text>
          </TouchableOpacity>

        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const PRIMARY = "#FF4647";
const SUCCESS = "#38c172";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#1A1A1A",
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  inputIcon: { marginRight: 10 },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1A1A1A",
  },

  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: PRIMARY,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },

  successButton: {
    backgroundColor: SUCCESS,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  link: {
    marginTop: 10,
    textAlign: "center",
    color: PRIMARY,
    fontSize: 15,
    fontWeight: "500",
  },
});
