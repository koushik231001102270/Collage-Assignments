import React from "react";
import { Title } from "../../components/Title";
import { formatDate, formatDateTime, isOverdue, statuses } from "../tasks";
import type { Status, Task } from "../tasks";
import { emptyCard, meta, pill, primary } from "../ui";
import { Segmented } from "../components/Segmented";

interface TaskDetailsProps {
  task?: Task;
  onStatus: (status: Status) => void;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onStatus, onEdit, onDelete, onBack }) => {
  if (!task) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={emptyCard}>Task not found</div>
        <div><button onClick={onBack} style={pill}>Back to tasks</button></div>
      </div>
    );
  }

  const rows: [string, string][] = [
    ["Header", task.title],
    ["Description", task.description],
    ["Priority", task.priority],
    ["Category", task.category],
    ["Status", isOverdue(task) ? task.status + " · Overdue" : task.status],
    ["Raised", formatDateTime(task.raisedAt)],
    ["Due", formatDate(task.dueDate)],
  ];

  return (
    <>
      <Title>Task #{task.id}</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {rows.map(([label, value], index) => (
          <div key={label} style={{
            background: "var(--secondary)", borderRadius: getBorderRadius(index, rows.length),
            padding: "14px 18px", display: "flex", flexDirection: "column", gap: "6px",
          }}>
            <span style={meta}>{label}</span>
            <span style={{ fontSize: "16px", color: label === "Status" && isOverdue(task) ? "#ffb4ab" : "var(--default)" }}>{value}</span>
          </div>
        ))}
      </div>
      <Segmented label="Update status" options={statuses} value={task.status} onChange={onStatus} />
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {task.status !== "Closed" && <button onClick={() => onStatus("Closed")} style={primary}>Mark complete</button>}
        <button onClick={onEdit} style={pill}>Edit</button>
        <button onClick={onDelete} style={pill}>Delete</button>
        <button onClick={onBack} style={pill}>Back</button>
      </div>
    </>
  );
};
