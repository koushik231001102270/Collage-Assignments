import React from "react";
import type { Product } from "../products";
import { CartItem } from "./CartItem";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartListProps {
  lines: CartLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export const CartList: React.FC<CartListProps> = ({ lines, onChangeQty, onRemove }) => {
  if (lines.length === 0) {
    return (
      <div style={{ background: "var(--secondary)", borderRadius: "20px", padding: "14px 18px", fontSize: "16px", color: "var(--subdued)" }}>
        Your cart is empty
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
      {lines.map(({ product, qty }, index) => (
        <CartItem
          key={product.id}
          name={product.name}
          price={product.price}
          qty={qty}
          index={index}
          total={lines.length}
          onIncrease={() => onChangeQty(product.id, 1)}
          onDecrease={() => onChangeQty(product.id, -1)}
          onRemove={() => onRemove(product.id)}
        />
      ))}
    </div>
  );
};
