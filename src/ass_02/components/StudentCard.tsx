import React, { useState } from "react";

export interface StudentCardProps {
  name: string;
  roll: string;
  department: string;
  semester: number;
  cgpa: number;
  photo: string;
  index?: number;
  total?: number;
}

const clampOneLine: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const meta: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "var(--subdued)",
};

function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

function getInitials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export const StudentCard: React.FC<StudentCardProps> = ({
  name,
  roll,
  department,
  semester,
  cgpa,
  photo,
  index = 0,
  total = 1,
}) => {
  const [hovered, setHovered] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

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
      <div style={{
        width: "44px",
        height: "44px",
        flexShrink: 0,
        borderRadius: "50%",
        overflow: "hidden",
        background: "var(--background)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...meta,
      }}>
        {photoFailed ? getInitials(name) : (
          <img
            src={photo}
            alt={name}
            draggable={false}
            onError={() => setPhotoFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: 0,
        flex: 1,
      }}>
        <span style={{
          fontSize: "16px",
          fontWeight: 400,
          color: "var(--default)",
          ...clampOneLine,
        }}>
          {name}
        </span>
        <span style={{
          fontSize: "12px",
          letterSpacing: "0.5px",
          color: "var(--subdued)",
          opacity: 0.7,
          ...clampOneLine,
        }}>
          {roll}&nbsp;·&nbsp;{department}
        </span>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "6px",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: "16px", color: "var(--default)" }}>
          {cgpa.toFixed(2)}
        </span>
        <span style={meta}>
          sem {semester}&nbsp;/&nbsp;8
        </span>
      </div>
    </div>
  );
};
