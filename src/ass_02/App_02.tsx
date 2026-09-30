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
