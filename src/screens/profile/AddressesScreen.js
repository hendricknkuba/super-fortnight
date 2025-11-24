import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalAddressForm from "../../components/ModalAddressForm";

import {
  getAddresses,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  updateAddress,
} from "../../services/addressService";

export default function AddressesScreen() {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  async function load() {
    const data = await getAddresses();
    setList(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    Alert.alert(
      "Delete Address?",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteAddress(id);
            load();
          },
        },
      ]
    );
  }

  function handleEdit(item) {
    setEditData(item);
    setShowEditModal(true);
  }

  async function handleSetDefault(id) {
    await setDefaultAddress(id);
    load();
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* LEFT SECTION */}
              <View style={{ flex: 1, paddingRight: 10 }}>
                {item.label ? (
                  <Text style={styles.label}>{item.label}</Text>
                ) : null}

                <Text style={styles.address}>{item.address}</Text>

                {item.city ? <Text style={styles.sub}>{item.city}</Text> : null}
                {item.postal ? <Text style={styles.sub}>{item.postal}</Text> : null}

                {item.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>

              {/* ACTIONS */}
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleSetDefault(item.id)}>
                  <Ionicons
                    name={item.isDefault ? "star" : "star-outline"}
                    size={24}
                    color={item.isDefault ? "#FFD700" : PRIMARY}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Ionicons name="pencil-outline" size={22} color={PRIMARY} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={22} color={PRIMARY} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* ADD NEW */}
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
          <Ionicons name="add-circle-outline" size={22} color="#FFF" />
          <Text style={styles.buttonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>

      {/* CREATE MODAL */}
      <ModalAddressForm
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async (data) => {
          await addAddress(data);
          load();
        }}
      />

      {/* EDIT MODAL */}
      <ModalAddressForm
        visible={showEditModal}
        defaultValues={editData || {}}
        onClose={() => setShowEditModal(false)}
        onSubmit={async (data) => {
          await updateAddress(editData.id, data);
          load();
        }}
      />
    </>
  );
}

const PRIMARY = "#FF4647";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* CARD */
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    borderWidth: 1,
    borderColor: "#F0F0F0",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },

  address: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },

  sub: {
    fontSize: 13,
    color: "#6F6F6F",
    marginTop: 2,
  },

  defaultBadge: {
    marginTop: 8,
    backgroundColor: PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  defaultBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },

  actions: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },

  /* BUTTON */
  button: {
    flexDirection: "row",
    backgroundColor: PRIMARY,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,

    marginBottom: 20,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
