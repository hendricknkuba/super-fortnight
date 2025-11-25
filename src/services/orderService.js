import { db, auth } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

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
    snap.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });

    return list;

  } catch (error) {
    console.log("ORDER SERVICE ERROR:", error);
    return []; // <<< impede loading infinito
  }
}
