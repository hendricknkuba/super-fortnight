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

  function handleCreate() {
    Alert.prompt(
      "New Address",
      "Enter your address",
      async (text) => {
        if (!text) return;
        await addAddress({ label: "Address", address: text });
        load();
      }
    );
  }

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

  async function handleSetDefault(id) {
    await setDefaultAddress(id);
    load();
  }

  function handleEdit(item) {
    setEditData(item);
    setShowEditModal(true);
  }

  return (
    <>
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* LEFT */}
            <View style={{ maxWidth: "75%" }}>
              {item.label ? (
                <Text style={styles.label}>{item.label}</Text>
              ) : null}

              <Text style={styles.address}>{item.address}</Text>

              {item.city ? (
                <Text style={styles.sub}>{item.city}</Text>
              ) : null}

              {item.postal ? (
                <Text style={styles.sub}>{item.postal}</Text>
              ) : null}

              {item.isDefault && (
                <Text style={styles.defaultTag}>Default</Text>
              )}
            </View>


            {/* RIGHT */}
            <View style={styles.actions}>
              {/* Make Default */}
              <TouchableOpacity onPress={() => handleSetDefault(item.id)}>
                <Ionicons
                  name={item.isDefault ? "star" : "star-outline"}
                  size={24}
                  color={item.isDefault ? "#FFD700" : "#FF4647"}
                />
              </TouchableOpacity>
              
              {/* Edit */}
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil-outline" size={22} color="#FF4647" />
              </TouchableOpacity>

              {/* Delete */}
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#FF4647" />
              </TouchableOpacity>

            </View>
          </View>
        )}
      />

    <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
      <Text style={styles.buttonText}>Add New Address</Text>
    </TouchableOpacity>
    </View>

    <ModalAddressForm
      visible={showModal}
      onClose={() => setShowModal(false)}
        onSubmit={async (data) => {
          await addAddress(data);
          load();
        }}
    />

    <ModalAddressForm
      visible={showEditModal}
      onClose={() => setShowEditModal(false)}
      defaultValues={editData || {}}
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
  card: {
    backgroundColor: "#FFF5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  address: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  defaultTag: {
    backgroundColor: PRIMARY,
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 12,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: PRIMARY,
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
  fontSize: 15,
  fontWeight: "700",
  marginBottom: 2,
  color: "#1A1A1A",
  },
  sub: {
    fontSize: 13,
    color: "#555",
    marginTop: 1,
  },

});
