import { db, auth } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// PATH: users/{uid}/settings/paymentMethod
function ref() {
  const uid = auth.currentUser.uid;
  return doc(db, "users", uid, "settings", "paymentMethod");
}

export async function getPaymentMethod() {
  const snap = await getDoc(ref());
  if (!snap.exists()) return null;
  return snap.data().method;
}

export async function setPaymentMethod(methodKey) {
  return setDoc(ref(), { method: methodKey });
}