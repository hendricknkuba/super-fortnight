import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const colRef = collection(db, "products");

/**
 * Fetch all products from Firestore.
 * This will be used as the main source for search/filter.
 */
export async function getAllProducts() {
  try {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    const list = [];
    snap.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return list;
  } catch (error) {
    console.log("PRODUCT FETCH ERROR:", error);
    return [];
  }
}

/**
 * Filter products by category (done locally for speed)
 */
export function filterByCategory(products, category) {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

/**
 * Search in product name or description
 */
export function searchProducts(products, text) {
  if (!text.trim()) return products;
  const q = text.toLowerCase();

  return products.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId) {
  const all = await getAllProducts();
  return all.find((p) => p.id === productId) || null;
}
