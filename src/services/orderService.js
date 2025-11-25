import { db, auth } from "./firebaseConfig";
import { 
  collection, addDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs
} from "firebase/firestore";

// -------------------- CREATE ORDER --------------------
export async function placeOrder(orderData) {
  try {
    const uid = auth.currentUser.uid;

    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      userId: uid,                  // 🔥 necessário para consulta
      total: Number(orderData.total),
      createdAt: Date.now(),
      status: "Processing",
    });

    return { id: docRef.id };

  } catch (error) {
    console.log("ORDER ERROR:", error);
    throw error;
  }
}

// Alias usado no Checkout
export async function createOrder(orderData) {
  return placeOrder(orderData);
}

// -------------------- FETCH ORDERS --------------------
export async function getUserOrders() {
  try {
    const uid = auth.currentUser.uid;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    const list = [];
    snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

    return list;

  } catch (error) {
    console.log("ORDER SERVICE ERROR:", error);
    return [];
  }
}

export async function getOrdersPaginated(lastDoc = null, pageSize = 10) {
  const uid = auth.currentUser.uid;

  let q = query(
    collection(db, "orders"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snap = await getDocs(q);

  const orders = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    _ref: d // ⬅ necessário para paginação
  }));

  return {
    orders,
    lastDoc: snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null
  };
}