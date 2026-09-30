import React from "react";
import { isOverdue } from "../tasks";
import type { Task } from "../tasks";
import { emptyCard } from "../ui";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  emptyText?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, emptyText = "No tasks found" }) => {
  if (tasks.length === 0) return <div style={emptyCard}>{emptyText}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
      {tasks.map((t, index) => (
        <TaskCard
          key={t.id}
          id={t.id}
          title={t.title}
          category={t.category}
          priority={t.priority}
          status={t.status}
          dueDate={t.dueDate}
          overdue={isOverdue(t)}
          index={index}
          total={tasks.length}
        />
      ))}
    </div>
  );
};
