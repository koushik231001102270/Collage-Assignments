import React from "react";

interface DepartmentFilterProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 4px 4px 20px";
  if (index === totalItems - 1) return "4px 20px 20px 4px";
  return "4px";
}

export const DepartmentFilter: React.FC<DepartmentFilterProps> = ({ options, value, onChange }) => {
  const all = ["All", ...options];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "12px", letterSpacing: ".04em", color: "var(--subdued)", opacity: 0.7 }}>
        Department
      </span>
      <div role="radiogroup" aria-label="Filter by department" style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
        {all.map((option, index) => {
          const active = option === value;
          return (
            <button
              key={option}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              style={{
                font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
                padding: "6px 14px", border: "none",
                borderRadius: getBorderRadius(index, all.length),
                background: active ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
                color: active ? "var(--default)" : "var(--subdued)",
                transition: "all 0.2s ease-in-out",
                cursor: "default",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
