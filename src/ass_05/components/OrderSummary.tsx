import React from "react";
import { formatPrice } from "../products";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  gstRate: number;
  gst: number;
  grandTotal: number;
  disabled: boolean;
  onCheckout: () => void;
}

const label: React.CSSProperties = {
  fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--subdued)",
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal, discount, gstRate, gst, grandTotal, disabled, onCheckout,
}) => {
  const rows: [string, string][] = [
    ["Subtotal", formatPrice(subtotal)],
    ["Discount", "−" + formatPrice(discount)],
    [`GST ${gstRate}%`, formatPrice(gst)],
  ];

  return (
    <div style={{ background: "var(--secondary)", borderRadius: "20px", padding: "14px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {rows.map(([name, value]) => (
        <div key={name} style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
          <span style={label}>{name}</span>
          <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--default)", opacity: 0.7 }}>{value}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <span style={label}>Grand total</span>
        <span style={{ fontSize: "16px", color: "var(--default)" }}>{formatPrice(grandTotal)}</span>
      </div>
      <button
        onClick={onCheckout}
        disabled={disabled}
        style={{
          font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
          padding: "6px 14px", border: "none", borderRadius: "20px",
          background: "var(--default)", color: "var(--background)",
          opacity: disabled ? 0.7 : 1, transition: "all 0.2s ease-in-out", cursor: "default",
        }}
      >
        Checkout
      </button>
    </div>
  );
};
