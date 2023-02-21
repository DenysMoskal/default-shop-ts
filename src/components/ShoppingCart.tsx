import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShopingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

import CartItem from "./CartItem";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isCart: boolean;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isCart }) => {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isCart} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Title</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
        <div className="ms-auto fw-bold fs-5">
          {" "}
          Total{" "}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((item) => item.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
