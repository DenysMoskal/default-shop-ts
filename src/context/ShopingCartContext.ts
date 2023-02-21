import { createContext, useContext, useState } from "react";

import { CartItem } from "../App";

export type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  getQuantity: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
