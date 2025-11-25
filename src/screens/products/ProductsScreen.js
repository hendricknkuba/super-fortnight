import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getAllProducts,
  filterByCategory,
  searchProducts,
} from "../../services/productService";
import ProductCard from "../../components/ProductCard";

const PRIMARY = "#FF4647";

const CATEGORIES = ["all", "Electronics", "Books", "Apparel"];

export default function ProductsScreen({ navigation }) {
  const [fullList, setFullList] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchText, setSearchText] = useState("");

  async function loadProducts() {
    setLoading(true);
    const data = await getAllProducts();
    setFullList(data);
    setList(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Update list when search or category changes
  useEffect(() => {
    let filtered = filterByCategory(fullList, selectedCat);
    filtered = searchProducts(filtered, searchText);
    setList(filtered);
  }, [searchText, selectedCat]);

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color={PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* SEARCH BAR */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#777" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* CATEGORIES */}
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryItem,
              selectedCat === cat && styles.categorySelected,
            ]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCat === cat && styles.categoryTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PRODUCT GRID */}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 40 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate("ProductDetails", { product: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 45,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  categoryRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  categoryItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    marginRight: 8,
  },

  categorySelected: {
    backgroundColor: PRIMARY,
  },

  categoryText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },

  categoryTextSelected: {
    color: "#FFF",
  },
});