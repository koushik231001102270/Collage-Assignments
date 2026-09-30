import React, { useState } from "react";

interface ForecastCardProps {
  date: string;
  condition: string;
  icon: string;
  high: number;
  low: number;
  index?: number;
  total?: number;
}

const meta: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "var(--subdued)",
};

function getBorderRadius(
  index: number,
  totalItems: number
) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1)
    return "4px 4px 20px 20px";

  return "4px";
}

export const ForecastCard: React.FC<
  ForecastCardProps
> = ({
  date,
  condition,
  icon,
  high,
  low,
  index = 0,
  total = 1,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255, 255, 255, 0.1)"
          : "var(--secondary)",
        borderRadius: getBorderRadius(
          index,
          total
        ),
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 18px",
        transition: "all 0.2s ease-in-out",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          flexShrink: 0,
          borderRadius: "50%",
          background: "var(--background)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={condition}
          draggable={false}
          style={{
            width: "44px",
            height: "44px",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          minWidth: 0,
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: "16px",
            color: "var(--default)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {date}
        </span>

        <span
          style={{
            ...meta,
            opacity: 0.7,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {condition}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "6px",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            color: "var(--default)",
          }}
        >
          {Math.round(high)}°C
        </span>

        <span style={meta}>
          low&nbsp;{Math.round(low)}°C
        </span>
      </div>
    </div>
  );
};