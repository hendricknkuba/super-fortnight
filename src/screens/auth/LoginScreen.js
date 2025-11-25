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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

  // animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

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

      // Friendly error messages
      let msg = "Unable to sign in. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          msg = "Incorrect email or password.";
          break;

        case "auth/invalid-email":
          msg = "Please enter a valid email address.";
          break;

        case "auth/network-request-failed":
          msg = "Network error. Please check your connection.";
          break;

        case "auth/too-many-requests":
          msg = "Too many attempts. Please try again later.";
          break;
      }

      Alert.alert("Login Failed", msg);
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

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to continue</Text>

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

            {/* LOGIN BUTTON */}
            <TouchableOpacity 
              style={[styles.button, success && styles.successButton]}
              onPress={handleLogin}
              disabled={loading || success}
            >
              {loading && !success && (
                <ActivityIndicator color="#FFF" size="small" />
              )}

              {success && (
                <Ionicons name="checkmark-circle-outline" size={26} color="#FFF" />
              )}

              {!loading && !success && (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

          </View>

          {/* REGISTER LINK */}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>
              Don't have an account?{" "}
              <Text style={{ fontWeight: "700" }}>Register</Text>
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
    alignItems: "center"
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