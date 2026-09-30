import React, { useState } from "react";
import { Title } from "../../components/Title";
import { categories, priorities, statuses } from "../tasks";
import type { TaskDraft } from "../tasks";
import { errorText, pill, primary } from "../ui";
import { Segmented } from "./Segmented";

interface TaskFormProps {
  heading: string;
  submitLabel: string;
  initial?: TaskDraft;
  showStatus?: boolean;
  onSave: (draft: TaskDraft) => void;
  onCancel: () => void;
}

const blank: TaskDraft = {
  title: "", description: "", priority: "Medium", category: "Academic", dueDate: "", status: "Raised",
};

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

export const TaskForm: React.FC<TaskFormProps> = ({ heading, submitLabel, initial, showStatus, onSave, onCancel }) => {
  const [draft, setDraft] = useState<TaskDraft>(initial ?? blank);
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState("");

  const submit = () => {
    if (!draft.title.trim() || !draft.description.trim()) return setError("Header and description are required.");
    if (!draft.dueDate) return setError("Pick a due date.");
    onSave({ ...draft, title: draft.title.trim(), description: draft.description.trim() });
  };

  const field = (key: string, index: number): React.CSSProperties => ({
    font: "inherit", fontSize: "16px", padding: "14px 18px",
    border: "none", outline: "none", borderRadius: getBorderRadius(index, 3),
    background: focused === key ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
    color: "var(--default)", width: "100%", userSelect: "text", colorScheme: "dark",
    transition: "all 0.2s ease-in-out",
  });

  const focusProps = (key: string) => ({
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(null),
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <style>{".dir-input::placeholder{color:var(--subdued);opacity:.7}"}</style>
      <Title>{heading}</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <input
          className="dir-input" aria-label="Task header" placeholder="Task header"
          value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          style={field("title", 0)} {...focusProps("title")}
        />
        <textarea
          className="dir-input" aria-label="Task description" placeholder="Task description" rows={4}
          value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          style={{ ...field("description", 1), resize: "none" }} {...focusProps("description")}
        />
        <input
          type="date" aria-label="Due date"
          value={draft.dueDate} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
          style={field("due", 2)} {...focusProps("due")}
        />
      </div>
      <Segmented label="Priority" options={priorities} value={draft.priority} onChange={(priority) => setDraft({ ...draft, priority })} />
      <Segmented label="Category" options={categories} value={draft.category} onChange={(category) => setDraft({ ...draft, category })} />
      {showStatus && (
        <Segmented label="Status" options={statuses} value={draft.status} onChange={(status) => setDraft({ ...draft, status })} />
      )}
      {error && <span style={errorText}>{error}</span>}
      <div style={{ display: "flex", gap: "2px" }}>
        <button onClick={submit} style={{ ...primary, borderRadius: "20px 4px 4px 20px" }}>{submitLabel}</button>
        <button onClick={onCancel} style={{ ...pill, borderRadius: "4px 20px 20px 4px", background: "var(--secondary)", color: "var(--subdued)" }}>Cancel</button>
      </div>
    </div>
  );
};
