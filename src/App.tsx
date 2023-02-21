import React, { useState } from "react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ShoppingCartContext } from "./context/ShopingCartContext";
import ShoppingCart from "./components/ShoppingCart";

export type CartItem = {
  id: number;
  quantity: number;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCart, setIsCart] = useState<boolean>(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      }
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      }
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const getQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const removeItem = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  const openCart = () => {
    setIsCart(true);
  };

  const closeCart = () => {
    setIsCart(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        getQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      <Navbar />
      <ShoppingCart isCart={isCart} />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartContext.Provider>
  );
};

export default App;
