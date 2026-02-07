import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Load cart ONLY when user is available
  useEffect(() => {
    if (!user?.email) return;

    const savedCart = localStorage.getItem(`cart_${user.email}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [user?.email]);

  // ✅ Save cart whenever it changes
  useEffect(() => {
    if (!user?.email) return;

    localStorage.setItem(
      `cart_${user.email}`,
      JSON.stringify(cartItems)
    );
  }, [cartItems, user?.email]);

  // ---------------- ADD ----------------
  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);

      if (existing) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }

      return [...prev, item];
    });
  };

  // ---------------- REMOVE ----------------
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // ---------------- CLEAR (logout / manual) ----------------
  const clearCart = () => {
    setCartItems([]);

    if (user?.email) {
      localStorage.removeItem(`cart_${user.email}`);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
