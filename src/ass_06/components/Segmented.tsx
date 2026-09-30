interface SegmentedProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 4px 4px 20px";
  if (index === totalItems - 1) return "4px 20px 20px 4px";
  return "4px";
}

export function Segmented<T extends string>({ label, options, value, onChange }: SegmentedProps<T>) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "12px", letterSpacing: ".04em", color: "var(--subdued)", opacity: 0.7 }}>{label}</span>
      <div role="radiogroup" aria-label={label} style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
        {options.map((option, index) => {
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
                borderRadius: getBorderRadius(index, options.length),
                background: active ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
                color: active ? "var(--default)" : "var(--subdued)",
                transition: "all 0.2s ease-in-out", cursor: "default",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
