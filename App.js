import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './src/services/firebaseConfig';
import RootNavigator from "./src/navigation/RootNavigator";
import { seedProducts } from './src/services/seedProducts';
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  //seedProducts();
  console.log("Firebase Auth Loaded: ", auth);
  return (
    <CartProvider>
      <RootNavigator/>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
