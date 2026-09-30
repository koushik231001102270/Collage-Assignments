import React from "react";

export type SortOrder = "desc" | "asc";

interface SortControlProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

const options: { value: SortOrder; label: string }[] = [
  { value: "desc", label: "Highest" },
  { value: "asc", label: "Lowest" },
];

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 4px 4px 20px";
  if (index === totalItems - 1) return "4px 20px 20px 4px";
  return "4px";
}

export const SortControl: React.FC<SortControlProps> = ({ value, onChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{
        fontSize: "12px",
        letterSpacing: ".04em",
        color: "var(--subdued)",
        opacity: 0.7,
      }}>
        CGPA
      </span>
      <div role="radiogroup" aria-label="Sort by CGPA" style={{ display: "flex", gap: "2px" }}>
        {options.map((option, index) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              style={{
                font: "inherit",
                fontSize: "12px",
                letterSpacing: ".04em",
                lineHeight: "16px",
                padding: "6px 14px",
                border: "none",
                borderRadius: getBorderRadius(index, options.length),
                background: active ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
                color: active ? "var(--default)" : "var(--subdued)",
                transition: "all 0.2s ease-in-out",
                cursor: "default",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
