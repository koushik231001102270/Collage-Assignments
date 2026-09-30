import React, { useState } from "react";
import { Title } from "../../components/Title";
import { departments, genders } from "../employees";
import type { Employee, Gender } from "../employees";

export type EmployeeDraft = Omit<Employee, "id">;

interface EmployeeFormProps {
  initial?: EmployeeDraft;
  takenIds: string[];
  onSave: (draft: EmployeeDraft) => void;
  onCancel: () => void;
}

const empty: EmployeeDraft = {
  name: "", employeeId: "", department: departments[0], gender: "Male",
  phone: "", localAddress: "", permanentAddress: "",
};

const button: React.CSSProperties = {
  font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
  padding: "6px 14px", border: "none", transition: "all 0.2s ease-in-out", cursor: "default",
};

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

function getSegmentRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 4px 4px 20px";
  if (index === totalItems - 1) return "4px 20px 20px 4px";
  return "4px";
}

const fields: { key: keyof EmployeeDraft; label: string }[] = [
  { key: "name", label: "Full name" },
  { key: "employeeId", label: "Employee ID" },
  { key: "department", label: "Department" },
  { key: "phone", label: "Phone number" },
  { key: "localAddress", label: "Local address" },
  { key: "permanentAddress", label: "Permanent address" },
];

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ initial, takenIds, onSave, onCancel }) => {
  const [draft, setDraft] = useState<EmployeeDraft>(initial ?? empty);
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState("");

  const set = (key: keyof EmployeeDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const submit = () => {
    // Build the draft field by field so nothing extra (like the employee's `id`) leaks into onSave.
    const d: EmployeeDraft = {
      name: draft.name.trim(),
      employeeId: draft.employeeId.trim(),
      department: draft.department,
      gender: draft.gender,
      phone: draft.phone.trim(),
      localAddress: draft.localAddress.trim(),
      permanentAddress: draft.permanentAddress.trim(),
    };
    if (Object.values(d).some((v) => v === "")) return setError("All fields are required.");
    if (!/^\+?\d{7,15}$/.test(d.phone.replace(/[\s-]/g, ""))) return setError("Enter a valid phone number.");
    if (takenIds.includes(d.employeeId.toLowerCase())) return setError("That employee ID already exists.");
    onSave(d);
  };

  const inputStyle = (key: string, index: number): React.CSSProperties => ({
    font: "inherit", fontSize: "16px", padding: "14px 18px",
    border: "none", outline: "none", borderRadius: getBorderRadius(index, fields.length),
    background: focused === key ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
    color: "var(--default)", width: "100%", userSelect: "text",
    transition: "all 0.2s ease-in-out",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <style>{".dir-input::placeholder{color:var(--subdued);opacity:.7}"}</style>
      <Title>{initial ? "Edit employee" : "New employee"}</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {fields.map(({ key, label }, index) =>
          key === "department" ? (
            <select
              key={key}
              aria-label={label}
              value={draft.department}
              onChange={(e) => set(key, e.target.value)}
              onFocus={() => setFocused(key)}
              onBlur={() => setFocused(null)}
              style={inputStyle(key, index)}
            >
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          ) : (
            <input
              key={key}
              className="dir-input"
              aria-label={label}
              placeholder={label}
              value={draft[key]}
              onChange={(e) => set(key, e.target.value)}
              onFocus={() => setFocused(key)}
              onBlur={() => setFocused(null)}
              style={inputStyle(key, index)}
            />
          )
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "12px", letterSpacing: ".04em", color: "var(--subdued)", opacity: 0.7 }}>Gender</span>
        <div role="radiogroup" aria-label="Gender" style={{ display: "flex", gap: "2px" }}>
          {genders.map((g: Gender, index) => {
            const active = draft.gender === g;
            return (
              <button
                key={g}
                role="radio"
                aria-checked={active}
                onClick={() => setDraft((prev) => ({ ...prev, gender: g }))}
                style={{
                  ...button,
                  borderRadius: getSegmentRadius(index, genders.length),
                  background: active ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
                  color: active ? "var(--default)" : "var(--subdued)",
                }}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {error && <span style={{ fontSize: "12px", letterSpacing: ".04em", color: "#ffb4ab" }}>{error}</span>}

      <div style={{ display: "flex", gap: "2px" }}>
        <button onClick={submit} style={{ ...button, borderRadius: "20px 4px 4px 20px", background: "var(--default)", color: "var(--background)" }}>
          {initial ? "Save changes" : "Add employee"}
        </button>
        <button onClick={onCancel} style={{ ...button, borderRadius: "4px 20px 20px 4px", background: "var(--secondary)", color: "var(--subdued)" }}>
          Cancel
        </button>
      </div>
    </div>
  );
};
