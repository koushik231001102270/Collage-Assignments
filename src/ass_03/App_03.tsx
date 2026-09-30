import { useState } from "react"
import { Container } from "../components/Container"
import { Section } from "../components/Section"
import { Title } from "../components/Title"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { SearchInput } from "./components/SearchInput"
import { DepartmentFilter } from "./components/DepartmentFilter"
import { EmployeeList } from "./components/EmployeeList"
import { EmployeeForm, type EmployeeDraft } from "./components/EmployeeForm"
import { employees as seed, departments } from "./employees"

type Editing = "new" | number | null

function App_03() {
    const [employees, setEmployees] = useState(seed)
    const [query, setQuery] = useState("")
    const [department, setDepartment] = useState("All")
    const [editing, setEditing] = useState<Editing>(null)

    const q = query.trim().toLowerCase()
    const visible = employees.filter((e) =>
        (department === "All" || e.department === department) &&
        (q === "" || [e.name, e.employeeId, e.phone].some((v) => v.toLowerCase().includes(q)))
    )

    const current = typeof editing === "number" ? employees.find((e) => e.id === editing) : undefined

    const handleSave = (draft: EmployeeDraft) => {
        if (typeof editing === "number") {
            setEmployees(employees.map((e) => (e.id === editing ? { ...e, ...draft } : e)))
        } else {
            const id = Math.max(0, ...employees.map((e) => e.id)) + 1
            setEmployees([...employees, { id, ...draft }])
        }
        setEditing(null)
    }

    const handleDelete = (id: number) => {
        if (!window.confirm("Delete this employee?")) return
        setEmployees(employees.filter((e) => e.id !== id))
        if (editing === id) setEditing(null)
    }

    const takenIds = employees.filter((e) => e.id !== editing).map((e) => e.employeeId.toLowerCase())

    return (
        <Container>
            <Header
                title="Employee Directory"
                subtitle="Everyone who works on the farm, in one place."
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
                    <Title>Employees — {visible.length} of {employees.length}</Title>
                    {editing === null && (
                        <button
                            onClick={() => setEditing("new")}
                            style={{
                                font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
                                padding: "6px 14px", border: "none", borderRadius: "20px",
                                background: "var(--default)", color: "var(--background)", cursor: "default",
                            }}
                        >
                            Add employee
                        </button>
                    )}
                </div>
                {editing !== null && (
                    <EmployeeForm
                        key={String(editing)}
                        initial={current && { ...current }}
                        takenIds={takenIds}
                        onSave={handleSave}
                        onCancel={() => setEditing(null)}
                    />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <SearchInput value={query} onChange={setQuery} />
                    <DepartmentFilter options={departments} value={department} onChange={setDepartment} />
                </div>
                <EmployeeList employees={visible} onEdit={setEditing} onDelete={handleDelete} />
            </Section>
            <Footer year={2026} author="Koushik" />
        </Container>
    )
}

export default App_03
