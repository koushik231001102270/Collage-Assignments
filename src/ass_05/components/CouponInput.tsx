import React, { useState } from "react";

interface CouponInputProps {
  applied: string | null;
  percent: number;
  onApply: (code: string) => boolean;
  onRemove: () => void;
}

const button: React.CSSProperties = {
  font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
  padding: "6px 14px", border: "none", borderRadius: "20px", flexShrink: 0,
  background: "rgba(255, 255, 255, 0.1)", color: "var(--default)",
  transition: "all 0.2s ease-in-out", cursor: "default",
};

export const CouponInput: React.FC<CouponInputProps> = ({ applied, percent, onApply, onRemove }) => {
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (onApply(code.trim().toUpperCase())) {
      setCode("");
      setError("");
    } else {
      setError("That coupon code isn't valid.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "16px", padding: "14px 18px", borderRadius: "20px",
        background: focused ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
        transition: "all 0.2s ease-in-out",
      }}>
        {applied ? (
          <>
            <span style={{ flex: 1, fontSize: "16px", color: "var(--default)" }}>{applied}&nbsp;·&nbsp;{percent}% off</span>
            <button onClick={onRemove} style={button}>Remove</button>
          </>
        ) : (
          <>
            <style>{".dir-input::placeholder{color:var(--subdued);opacity:.7}"}</style>
            <input
              className="dir-input"
              aria-label="Coupon code"
              placeholder="Coupon code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                font: "inherit", fontSize: "16px", flex: 1, minWidth: 0, padding: 0,
                border: "none", outline: "none", background: "transparent",
                color: "var(--default)", userSelect: "text",
              }}
            />
            <button onClick={submit} style={button}>Apply</button>
          </>
        )}
      </div>
      {error && <span style={{ fontSize: "12px", letterSpacing: ".04em", color: "#ffb4ab" }}>{error}</span>}
    </div>
  );
};
