import React, { useState } from "react";
import { Title } from "../../components/Title";
import { isOverdue } from "../tasks";
import type { Task } from "../tasks";
import { TaskList } from "../components/TaskList";

interface DashboardProps {
  tasks: Task[];
}

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

const StatRow: React.FC<{ label: string; value: number; index: number; total: number }> = ({ label, value, index, total }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
        borderRadius: getBorderRadius(index, total),
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 18px", transition: "all 0.2s ease-in-out", cursor: "default",
      }}
    >
      <span style={{ fontSize: "16px", color: "var(--subdued)" }}>{label}</span>
      <span style={{ fontSize: "16px", color: "var(--default)" }}>{value}</span>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const stats: [string, number][] = [
    ["Total tasks", tasks.length],
    ["Raised", tasks.filter((t) => t.status === "Raised").length],
    ["Pending", tasks.filter((t) => t.status === "Pending").length],
    ["Closed", tasks.filter((t) => t.status === "Closed").length],
    ["Overdue", tasks.filter(isOverdue).length],
  ];
  const upcoming = tasks
    .filter((t) => t.status !== "Closed")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Title>Overview</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {stats.map(([label, value], i) => (
            <StatRow key={label} label={label} value={value} index={i} total={stats.length} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Title>Due soon</Title>
        <TaskList tasks={upcoming} emptyText="Nothing due. All caught up" />
      </div>
    </>
  );
};
