import React, { useState } from "react";
import { formatPrice } from "../products";

export interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  index?: number;
  total?: number;
  onAdd: () => void;
}

const clampOneLine: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name, category, price, index = 0, total = 1, onAdd,
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
        alignItems: "center",
        gap: "16px",
        padding: "14px 18px",
        transition: "all 0.2s ease-in-out",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: "16px", color: "var(--default)", ...clampOneLine }}>{name}</span>
        <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--subdued)", opacity: 0.7, ...clampOneLine }}>
          {category}&nbsp;·&nbsp;{formatPrice(price)}
        </span>
      </div>
      <button
        onClick={onAdd}
        style={{
          font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
          padding: "6px 14px", border: "none", borderRadius: "20px", flexShrink: 0,
          background: "rgba(255, 255, 255, 0.1)", color: "var(--default)",
          transition: "all 0.2s ease-in-out", cursor: "default",
        }}
      >
        Add
      </button>
    </div>
  );
};
