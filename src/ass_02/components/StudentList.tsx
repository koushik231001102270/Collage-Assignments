import React from "react";
import type { Student } from "../students";
import { StudentCard } from "./StudentCard";

interface StudentListProps {
  students: Student[];
  style?: React.CSSProperties;
}

export const StudentList: React.FC<StudentListProps> = ({ students, style }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      width: "100%",
      ...style
    }}>
      {students.map((student, index) => (
        <StudentCard
          key={student.id}
          name={student.name}
          roll={student.roll}
          department={student.department}
          semester={student.semester}
          cgpa={student.cgpa}
          photo={student.photo}
          index={index}
          total={students.length}
        />
      ))}
    </div>
  );
};
