import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

const PRIMARY = "#FF4647";

export default function ModalAddressForm({
  visible,
  onClose,
  onSubmit,
  defaultValues = {},
}) {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  // 🔥 Sincroniza valores ao abrir o modal OU ao trocar defaultValues
  useEffect(() => {
    if (visible) {
      setLabel(defaultValues.label || "");
      setAddress(defaultValues.address || "");
      setCity(defaultValues.city || "");
      setPostal(defaultValues.postal || "");
    }
  }, [defaultValues, visible]);

  function handleSave() {
    if (!address.trim()) return;
    onSubmit({ label, address, city, postal });
    onClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.avoidingView}
          >
            <View style={styles.modalBox}>
              
              {/* Title */}
              <Text style={styles.title}>
                {defaultValues.id ? "Edit Address" : "New Address"}
              </Text>

              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {/* Label */}
                <TextInput
                  placeholder="Label (Home, Work...)"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={label}
                  onChangeText={setLabel}
                />

                {/* Street */}
                <TextInput
                  placeholder="Street Address"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                />

                {/* City */}
                <TextInput
                  placeholder="City"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                />

                {/* Postal Code */}
                <TextInput
                  placeholder="Postal Code"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={postal}
                  onChangeText={setPostal}
                />
              </ScrollView>

              {/* Action buttons */}
              <View style={styles.actions}>
                <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avoidingView: {
    width: "100%",
  },
  modalBox: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 420,
    maxHeight: "85%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1A1A1A",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    fontSize: 16,
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  cancelBtn: {
    padding: 12,
    marginRight: 12,
  },
  cancelText: {
    color: "#444",
    fontSize: 16,
  },
  saveBtn: {
    padding: 12,
    backgroundColor: PRIMARY,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
  },
  saveText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
