import React, { useState } from "react";
import type { Gender } from "../employees";

export interface EmployeeCardProps {
  name: string;
  employeeId: string;
  department: string;
  gender: Gender;
  phone: string;
  localAddress: string;
  permanentAddress: string;
  index?: number;
  total?: number;
  onEdit: () => void;
  onDelete: () => void;
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

const pill: React.CSSProperties = {
  font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
  padding: "6px 14px", border: "none", borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.1)", color: "var(--default)",
  transition: "all 0.2s ease-in-out", cursor: "default",
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

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name, employeeId, department, gender, phone, localAddress, permanentAddress,
  index = 0, total = 1, onEdit, onDelete,
}) => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered || open ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
        borderRadius: getBorderRadius(index, total),
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "14px 18px",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "default" }}
      >
        <div style={{
          width: "44px", height: "44px", flexShrink: 0, borderRadius: "50%",
          background: "var(--background)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center", ...meta,
        }}>
          {getInitials(name)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: "16px", color: "var(--default)", ...clampOneLine }}>{name}</span>
          <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--subdued)", opacity: 0.7, ...clampOneLine }}>
            {employeeId}&nbsp;·&nbsp;{department}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0, whiteSpace: "nowrap" }}>
          <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--default)" }}>{phone}</span>
          <span style={meta}>{gender}</span>
        </div>
      </div>

      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={meta}>Local address</span>
          <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--default)", opacity: 0.7 }}>{localAddress}</span>
          <span style={{ ...meta, marginTop: "6px" }}>Permanent address</span>
          <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--default)", opacity: 0.7 }}>{permanentAddress}</span>
          <div style={{ display: "flex", gap: "2px", marginTop: "12px" }}>
            <button onClick={onEdit} style={{ ...pill, borderRadius: "20px 4px 4px 20px" }}>Edit</button>
            <button onClick={onDelete} style={{ ...pill, borderRadius: "4px 20px 20px 4px" }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
