import React, { useState } from "react";
import { formatPrice } from "../products";

export interface CartItemProps {
  name: string;
  price: number;
  qty: number;
  index?: number;
  total?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const clampOneLine: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const pill: React.CSSProperties = {
  font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
  padding: "6px 14px", border: "none",
  background: "rgba(255, 255, 255, 0.1)", color: "var(--default)",
  transition: "all 0.2s ease-in-out", cursor: "default",
};

function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

export const CartItem: React.FC<CartItemProps> = ({
  name, price, qty, index = 0, total = 1, onIncrease, onDecrease, onRemove,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
        borderRadius: getBorderRadius(index, total),
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "14px 18px",
        transition: "all 0.2s ease-in-out",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: "16px", color: "var(--default)", ...clampOneLine }}>{name}</span>
          <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--subdued)", opacity: 0.7 }}>
            {qty}&nbsp;×&nbsp;{formatPrice(price)}
          </span>
        </div>
        <span style={{ fontSize: "16px", color: "var(--default)", flexShrink: 0, whiteSpace: "nowrap" }}>
          {formatPrice(price * qty)}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", gap: "2px" }}>
          <button aria-label={`Decrease ${name}`} onClick={onDecrease} style={{ ...pill, borderRadius: "20px 4px 4px 20px" }}>−</button>
          <button aria-label={`Increase ${name}`} onClick={onIncrease} style={{ ...pill, borderRadius: "4px 20px 20px 4px" }}>+</button>
        </div>
        <button onClick={onRemove} style={{ ...pill, borderRadius: "20px" }}>Remove</button>
      </div>
    </div>
  );
};
