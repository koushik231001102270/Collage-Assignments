import React from "react";
import type { Employee } from "../employees";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div style={{ background: "var(--secondary)", borderRadius: "20px", padding: "14px 18px", fontSize: "16px", color: "var(--subdued)" }}>
        No employees found
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
      {employees.map((e, index) => (
        <EmployeeCard
          key={e.id}
          name={e.name}
          employeeId={e.employeeId}
          department={e.department}
          gender={e.gender}
          phone={e.phone}
          localAddress={e.localAddress}
          permanentAddress={e.permanentAddress}
          index={index}
          total={employees.length}
          onEdit={() => onEdit(e.id)}
          onDelete={() => onDelete(e.id)}
        />
      ))}
    </div>
  );
};
