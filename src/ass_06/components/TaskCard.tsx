import React, { useState } from "react";
import { formatDate } from "../tasks";
import type { Category, Priority, Status } from "../tasks";
import { meta } from "../ui";

export interface TaskCardProps {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  status: Status;
  dueDate: string;
  overdue: boolean;
  index?: number;
  total?: number;
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

export const TaskCard: React.FC<TaskCardProps> = ({
  id, title, category, priority, status, dueDate, overdue, index = 0, total = 1,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#/tasks/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
        borderRadius: getBorderRadius(index, total),
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 18px",
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: "16px", color: status === "Closed" ? "var(--subdued)" : "var(--default)", opacity: status === "Closed" ? 0.7 : 1, ...clampOneLine }}>
          {title}
        </span>
        <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--subdued)", opacity: 0.7, ...clampOneLine }}>
          {category}&nbsp;·&nbsp;Due {formatDate(dueDate)}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: "16px", color: "var(--default)" }}>{priority}</span>
        <span style={{ ...meta, color: overdue ? "#ffb4ab" : "var(--subdued)" }}>{overdue ? "Overdue" : status}</span>
      </div>
    </a>
  );
};
