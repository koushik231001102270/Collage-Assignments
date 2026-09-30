import type React from "react";

export const meta: React.CSSProperties = {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "var(--subdued)",
};

export const pill: React.CSSProperties = {
    font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
    padding: "6px 14px", border: "none", borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)", color: "var(--default)",
    transition: "all 0.2s ease-in-out", cursor: "default",
};

export const primary: React.CSSProperties = {
    ...pill, background: "var(--default)", color: "var(--background)",
};

export const emptyCard: React.CSSProperties = {
    background: "var(--secondary)", borderRadius: "20px", padding: "14px 18px",
    fontSize: "16px", color: "var(--subdued)",
};

export const errorText: React.CSSProperties = {
    fontSize: "12px", letterSpacing: ".04em", color: "#ffb4ab",
};
