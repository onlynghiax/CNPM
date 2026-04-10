import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { AlbumProvider } from "./context/AlbumContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlbumProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AlbumProvider>
    </BrowserRouter>
  </React.StrictMode>
);
