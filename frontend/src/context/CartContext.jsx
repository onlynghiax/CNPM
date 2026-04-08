import { createContext, useContext, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });

  const refreshCart = async () => {
    try {
      const res = await axiosClient.get("/api/cart");
      setCart(res.data);
      return res.data;
    } catch {
      setCart({ items: [], subtotal: 0 });
      return { items: [], subtotal: 0 };
    }
  };

  const addToCart = async (albumId, quantity = 1) => {
    const res = await axiosClient.post("/api/cart/add", { albumId, quantity });
    setCart(res.data);
    return res.data;
  };

  const updateQuantity = async (cartItemId, quantity) => {
    const res = await axiosClient.put("/api/cart/update", { cartItemId, quantity });
    setCart(res.data);
    return res.data;
  };

  const removeItem = async (id) => {
    const res = await axiosClient.delete(`/api/cart/${id}`);
    setCart(res.data);
    return res.data;
  };

  const checkout = async (paymentMethod) => {
    const res = await axiosClient.post("/api/orders/checkout", { paymentMethod });
    await refreshCart();
    return res.data;
  };

  const itemCount = (cart.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0);

  const value = useMemo(
    () => ({ cart, itemCount, refreshCart, addToCart, updateQuantity, removeItem, checkout }),
    [cart, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
