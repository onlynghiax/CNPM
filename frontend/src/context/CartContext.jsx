import { createContext, useContext, useMemo, useState, useCallback } from "react";
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

  const addToCart = useCallback(async (albumId, quantity = 1) => {
    try {
      const res = await axiosClient.post("/api/cart/add", { albumId, quantity });
      setCart(prev => res.data ?? prev);
      return res.data;
    } catch (err) {
      console.error("[CartContext] addToCart failed:", err);
      const msg = err.response?.data;
      throw typeof msg === "string" ? new Error(msg) : err;
    }
  }, []);

  const updateQuantity = useCallback(async (cartItemId, quantity) => {
    try {
      const res = await axiosClient.put("/api/cart/update", { cartItemId, quantity });
      setCart(prev => res.data ?? prev);
      return res.data;
    } catch (err) {
      console.error("[CartContext] updateQuantity failed:", err);
      throw err;
    }
  }, []);

  const removeItem = useCallback(async (id) => {
    try {
      const res = await axiosClient.delete(`/api/cart/${id}`);
      setCart(prev => res.data ?? prev);
      return res.data;
    } catch (err) {
      console.error("[CartContext] removeItem failed:", err);
      throw err;
    }
  }, []);

  const checkout = useCallback(async (paymentMethod) => {
    try {
      const res = await axiosClient.post("/api/orders/checkout", { paymentMethod });
      await refreshCart();
      return res.data;
    } catch (err) {
      console.error("[CartContext] checkout failed:", err);
      throw err;
    }
  }, [refreshCart]);

  const itemCount = (cart.items || []).reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Stable token check — does NOT cause re-renders
  const isLoggedIn = useCallback(() => Boolean(localStorage.getItem("token")), []);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      isLoggedIn,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
      checkout,
    }),
    // Include all stable callbacks so consumers never hold stale references
    [cart, itemCount, isLoggedIn, refreshCart, addToCart, updateQuantity, removeItem, checkout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
