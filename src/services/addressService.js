import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Get path: users/{uid}/addresses
function addressesRef() {
  const uid = auth.currentUser.uid;
  return collection(db, "users", uid, "addresses");
}

// FETCH all addresses
export async function getAddresses() {
  const snap = await getDocs(addressesRef());
  const list = [];
  snap.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() });
  });
  return list;
}

// ADD address
export async function addAddress(addressData) {
  return addDoc(addressesRef(), {
    ...addressData,
    isDefault: false,
    createdAt: Date.now(),
  });
}

// UPDATE address
export async function updateAddress(id, newData) {
  const ref = doc(db, "users", auth.currentUser.uid, "addresses", id);
  return updateDoc(ref, newData);
}

// DELETE address
export async function deleteAddress(id) {
  const ref = doc(db, "users", auth.currentUser.uid, "addresses", id);
  return deleteDoc(ref);
}

// SET DEFAULT
export async function setDefaultAddress(id) {
  const uid = auth.currentUser.uid;
  const ref = collection(db, "users", uid, "addresses");

  const snap = await getDocs(ref);

  snap.forEach(async (docSnap) => {
    const addressId = docSnap.id;
    const isCurrentlyDefault = docSnap.data().isDefault;

    // If the clicked address was default → deselect it
    if (addressId === id && isCurrentlyDefault) {
      await updateDoc(doc(db, "users", uid, "addresses", id), {
        isDefault: false,
      });
      return;
    }

    // Otherwise normal behavior: only this one becomes default
    await updateDoc(doc(db, "users", uid, "addresses", addressId), {
      isDefault: addressId === id,
    });
  });
}
