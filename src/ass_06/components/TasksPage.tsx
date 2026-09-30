import React, { useState } from "react";
import { Title } from "../../components/Title";
import { categories, priorities, statuses } from "../tasks";
import type { Category, Priority, Status, Task } from "../tasks";
import { Segmented } from "../components/Segmented";
import { TaskList } from "../components/TaskList";

interface TasksPageProps {
  tasks: Task[];
  completedOnly?: boolean;
}

export const TasksPage: React.FC<TasksPageProps> = ({ tasks, completedOnly }) => {
  const [status, setStatus] = useState<Status | "All">("All");
  const [priority, setPriority] = useState<Priority | "All">("All");
  const [category, setCategory] = useState<Category | "All">("All");

  const base = completedOnly ? tasks.filter((t) => t.status === "Closed") : tasks;
  const visible = base.filter((t) =>
    (status === "All" || t.status === status) &&
    (priority === "All" || t.priority === priority) &&
    (category === "All" || t.category === category)
  );

  return (
    <>
      <Title>{completedOnly ? "Completed tasks" : "Tasks"} — {visible.length}</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {!completedOnly && <Segmented label="Status" options={["All", ...statuses]} value={status} onChange={setStatus} />}
        <Segmented label="Priority" options={["All", ...priorities]} value={priority} onChange={setPriority} />
        <Segmented label="Category" options={["All", ...categories]} value={category} onChange={setCategory} />
      </div>
      <TaskList tasks={visible} emptyText={completedOnly ? "No completed tasks yet" : "No tasks match these filters"} />
    </>
  );
};
