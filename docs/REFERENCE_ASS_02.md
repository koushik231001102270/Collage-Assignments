# Reference Solution: Assignment 2 (Student Information Management)

This is the finished, approved solution. **Use it as the template for every other assignment:** the same file split, the same Header/Footer wrappers, the same card anatomy, the same control styling, and the same state-in-App / props-down flow.

## Assignment brief

> Create a student information portal. Each student card should display Name / Roll Number / Department / Semester / CGPA / Photo.
> Components: App, Student List, Student Card, Header/Footer. Pass all data through Props. Provide a mechanism to sort students by CGPA.

## How the brief maps to the design

| Requirement | Implementation |
|---|---|
| App | `App_02.tsx` holds the `order` state, sorts the data, and composes the page |
| Student List | `components/StudentList.tsx` is the grouped list (2px gap) and passes `index`/`total` for the corner rhythm |
| Student Card | `components/StudentCard.tsx` is a row: photo · name + "roll · dept" · CGPA + "SEM n / 8" |
| Header / Footer | `components/Header.tsx` and `components/Footer.tsx` wrap the shared primitives and take props |
| Props only | Seed data lives in `students.ts` and goes App → List → Card as explicit props |
| Sort by CGPA | `components/SortControl.tsx` is a segmented "Highest / Lowest" control, controlled via `value` + `onChange` |

## Files

```
src/ass_02/
  App_02.tsx
  students.ts
  components/
    Header.tsx
    Footer.tsx
    StudentList.tsx
    StudentCard.tsx
    SortControl.tsx
```

### `src/ass_02/students.ts`

```ts
export interface Student {
    id: number;
    name: string;
    roll: string;
    department: string;
    semester: number;
    cgpa: number;
    photo: string;
}

export const students: Student[] = [
    { id: 1, name: "Aarav Mehta", roll: "CSE2024-018", department: "Computer Science", semester: 4, cgpa: 9.42, photo: "https://i.pravatar.cc/96?img=12" },
    { id: 2, name: "Diya Nair", roll: "CSE2022-006", department: "Computer Science", semester: 8, cgpa: 9.67, photo: "https://i.pravatar.cc/96?img=47" },
    // …6 more
];
```

### `src/ass_02/App_02.tsx`

```tsx
import { useState } from "react"
import { Container } from "../components/Container"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { StudentList } from "./components/StudentList"
import { SortControl, type SortOrder } from "./components/SortControl"
import { students } from "./students"

function App_02() {
    const [order, setOrder] = useState<SortOrder>("desc")

    const sortedStudents = [...students].sort((a, b) =>
        order === "desc" ? b.cgpa - a.cgpa : a.cgpa - b.cgpa
    )

    return (
        <Container>
            <Header
                title="Student Information Management"
                subtitle="A student information portal for every student."
                backHref="../../index.html"
            />
            <Section style={{ gap: 32 }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    marginTop: 16,
                }}>
                    <Title>Students — {students.length}</Title>
                    <SortControl value={order} onChange={setOrder} />
                </div>
                <StudentList students={sortedStudents} />
            </Section>
            <Footer year={2026} author="Koushik" />
        </Container>
    )
}

export default App_02
```

### `src/ass_02/components/Header.tsx`

In a new assignment, change the breadcrumb text `Assignment 2` to the right number.

```tsx
import { Header as PageHeader } from "../../components/Header"
import { Section } from "../../components/Section"

interface HeaderProps {
  title: string;
  subtitle: string;
  backHref: string;
}

export const Header = ({ title, subtitle, backHref }: HeaderProps) => {
  return (
    <>
      <PageHeader />
      <Section>
        <div style={{ display: "flex", flexDirection: "column", paddingTop: 16 }}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div>
          <p>
            <a href={backHref} className="text-underline">All assignments</a>
            &nbsp;/&nbsp;Assignment 2
          </p>
        </div>
      </Section>
    </>
  )
}
```

### `src/ass_02/components/Footer.tsx`

```tsx
import { Footer as PageFooter } from "../../components/Footer"
import { Title } from "../../components/Title"

interface FooterProps {
  year: number;
  author: string;
}

export const Footer = ({ year, author }: FooterProps) => {
  return (
    <PageFooter>
      <div style={{
        "display": "flex", alignItems: "center", gap: "8px"
      }}>
        <p style={{ transform: "translateY(2px)" }}>&#169;</p>
        <Title>{year}&nbsp;{author}</Title>
      </div>
    </PageFooter>
  )
}
```

### `src/ass_02/components/StudentList.tsx`

```tsx
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
```

### `src/ass_02/components/StudentCard.tsx`

```tsx
import React, { useState } from "react";

export interface StudentCardProps {
  name: string;
  roll: string;
  department: string;
  semester: number;
  cgpa: number;
  photo: string;
  index?: number;
  total?: number;
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

function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

function getInitials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export const StudentCard: React.FC<StudentCardProps> = ({
  name, roll, department, semester, cgpa, photo, index = 0, total = 1,
}) => {
  const [hovered, setHovered] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
        borderRadius: getBorderRadius(index, total),
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 18px",
        transition: "all 0.2s ease-in-out",
        cursor: "default",
      }}
    >
      <div style={{
        width: "44px", height: "44px", flexShrink: 0,
        borderRadius: "50%", overflow: "hidden",
        background: "var(--background)", border: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        ...meta,
      }}>
        {photoFailed ? getInitials(name) : (
          <img src={photo} alt={name} draggable={false}
            onError={() => setPhotoFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: "16px", fontWeight: 400, color: "var(--default)", ...clampOneLine }}>
          {name}
        </span>
        <span style={{ fontSize: "12px", letterSpacing: "0.5px", color: "var(--subdued)", opacity: 0.7, ...clampOneLine }}>
          {roll}&nbsp;·&nbsp;{department}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: "16px", color: "var(--default)" }}>{cgpa.toFixed(2)}</span>
        <span style={meta}>sem {semester}&nbsp;/&nbsp;8</span>
      </div>
    </div>
  );
};
```

### `src/ass_02/components/SortControl.tsx`

```tsx
import React from "react";

export type SortOrder = "desc" | "asc";

interface SortControlProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

const options: { value: SortOrder; label: string }[] = [
  { value: "desc", label: "Highest" },
  { value: "asc", label: "Lowest" },
];

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 4px 4px 20px";
  if (index === totalItems - 1) return "4px 20px 20px 4px";
  return "4px";
}

export const SortControl: React.FC<SortControlProps> = ({ value, onChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ fontSize: "12px", letterSpacing: ".04em", color: "var(--subdued)", opacity: 0.7 }}>
        CGPA
      </span>
      <div role="radiogroup" aria-label="Sort by CGPA" style={{ display: "flex", gap: "2px" }}>
        {options.map((option, index) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              style={{
                font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
                padding: "6px 14px", border: "none",
                borderRadius: getBorderRadius(index, options.length),
                background: active ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
                color: active ? "var(--default)" : "var(--subdued)",
                transition: "all 0.2s ease-in-out",
                cursor: "default",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

## What to carry over to other assignments

- **Page skeleton:** Header (title, subtitle, back link) → content `Section` with `gap: 32` → label row (`Title` on the left, controls on the right, `marginTop: 16`) → grouped list → Footer.
- **Card:** media · text · right meta, with the corner rhythm and white-10% hover.
- **Controls:** segmented pills with the horizontal corner rhythm, `value` + `onChange` props.
- **Data:** a typed seed file, with state in `App_0X` and explicit props down to leaves.
