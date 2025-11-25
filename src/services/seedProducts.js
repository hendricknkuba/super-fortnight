import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function seedProducts() {
  const products = [
    // -------------------
    // ELECTRONICS
    // -------------------
    {
      name: "Wireless Headphones",
      category: "Electronics",
      price: 59.99,
      description: "High-quality wireless over-ear headphones with noise isolation and 20-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    },
    {
      name: "Smartphone Stand",
      category: "Electronics",
      price: 14.99,
      description: "Adjustable stand for smartphones and tablets, perfect for desks and video calls.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=500&h=500&fit=crop",
    },
    {
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 39.99,
      description: "Compact speaker with powerful bass and 8-hour battery life.",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    },

    // -------------------
    // BOOKS
    // -------------------
    {
      name: "The Silent Forest",
      category: "Books",
      price: 18.95,
      description: "A suspense novel set deep inside the mysterious Ravenwood forest.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
    },
    {
      name: "Learn JavaScript Fast",
      category: "Books",
      price: 29.50,
      description: "A practical guide for beginners stepping into modern JavaScript development.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
    },
    {
      name: "History of Ancient Civilizations",
      category: "Books",
      price: 24.99,
      description: "Explore the origins, growth, and impact of the ancient world.",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop",
    },

    // -------------------
    // APPAREL
    // -------------------
    {
      name: "Casual Cotton T-Shirt",
      category: "Apparel",
      price: 16.99,
      description: "Soft and breathable cotton T-shirt, available in multiple sizes.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    },
    {
      name: "Classic Hoodie",
      category: "Apparel",
      price: 34.99,
      description: "Warm and comfortable hoodie with a modern fit and kangaroo pocket.",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    },
    {
      name: "Sport Joggers",
      category: "Apparel",
      price: 27.99,
      description: "Lightweight joggers ideal for workouts and casual wear.",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
    },
  ];

  const colRef = collection(db, "products");

  for (let p of products) {
    await addDoc(colRef, {
      ...p,
      createdAt: Date.now(),
    });
  }

  console.log("🔥 Product Seed Completed Successfully!");
}