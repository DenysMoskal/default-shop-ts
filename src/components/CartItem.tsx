import React from "react";

import storeItems from "../data/items.json";
import { useShoppingCart } from "../context/ShopingCartContext";
import { Button, Stack } from "react-bootstrap";

import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
  const { removeItem } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);

  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.imgUrl}
        alt="img"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item ? formatCurrency(item.price) : null}
        </div>
      </div>
      <div>{item ? formatCurrency(item.price * quantity) : null}</div>
      <Button variant="danger" onClick={() => removeItem(id)}>
        X
      </Button>
    </Stack>
  );
};

export default CartItem;
