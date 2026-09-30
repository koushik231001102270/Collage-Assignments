import { useEffect, useState } from "react"
import { Container } from "../components/Container"
import { Section } from "../components/Section"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { NavBar } from "./components/NavBar"
import { TaskForm } from "./components/TaskForm"
import { Dashboard } from "./components/Dashboard"
import { TasksPage } from "./components/TasksPage"
import { TaskDetails } from "./components/TaskDetails"
import { Login } from "./components/Login"
import { emptyCard } from "./ui"
import { navigate, usePath, matchRoute } from "./router"
import { tasks as seed, load, save } from "./tasks"
import type { Task, TaskDraft } from "./tasks"

const TASKS_KEY = "ass06-tasks"
const USER_KEY = "ass06-user"

function App_06() {
    const [tasks, setTasks] = useState<Task[]>(() => load<Task[]>(TASKS_KEY, seed))
    const [user, setUser] = useState<string | null>(() => load<string | null>(USER_KEY, null))
    const path = usePath()

    useEffect(() => save(TASKS_KEY, tasks), [tasks])
    useEffect(() => save(USER_KEY, user), [user])

    useEffect(() => {
        if (!user && path !== "/login") navigate("/login")
        if (user && path === "/login") navigate("/")
    }, [user, path])

    const route = user ? matchRoute(path) : ({ name: "login" } as const)
    const activePath =
        route.name === "dashboard" ? "/" :
        route.name === "add" ? "/tasks/new" :
        route.name === "completed" ? "/completed" : "/tasks"

    const handleAdd = (draft: TaskDraft) => {
        const id = Math.max(0, ...tasks.map((t) => t.id)) + 1
        setTasks([...tasks, { ...draft, id, status: "Raised", raisedAt: new Date().toISOString() }])
        navigate(`/tasks/${id}`)
    }

    const handleUpdate = (id: number, patch: Partial<TaskDraft>) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)))
    }

    const handleDelete = (id: number) => {
        if (!window.confirm("Delete this task?")) return
        setTasks(tasks.filter((t) => t.id !== id))
        navigate("/tasks")
    }

    const renderPage = () => {
        switch (route.name) {
            case "login":
                return user ? null : <Login onLogin={setUser} />
            case "dashboard":
                return <Dashboard tasks={tasks} />
            case "tasks":
                return <TasksPage tasks={tasks} />
            case "completed":
                return <TasksPage tasks={tasks} completedOnly />
            case "add":
                return (
                    <TaskForm
                        heading="New task"
                        submitLabel="Add task"
                        onSave={handleAdd}
                        onCancel={() => navigate("/tasks")}
                    />
                )
            case "details": {
                const task = tasks.find((t) => t.id === route.id)
                return (
                    <TaskDetails
                        task={task}
                        onStatus={(status) => handleUpdate(route.id, { status })}
                        onEdit={() => navigate(`/tasks/${route.id}/edit`)}
                        onDelete={() => handleDelete(route.id)}
                        onBack={() => navigate("/tasks")}
                    />
                )
            }
            case "edit": {
                const task = tasks.find((t) => t.id === route.id)
                if (!task) return <div style={emptyCard}>Task not found</div>
                return (
                    <TaskForm
                        key={task.id}
                        heading={`Edit task #${task.id}`}
                        submitLabel="Save changes"
                        initial={task}
                        showStatus
                        onSave={(draft) => { handleUpdate(task.id, draft); navigate(`/tasks/${task.id}`) }}
                        onCancel={() => navigate(`/tasks/${task.id}`)}
                    />
                )
            }
            default:
                return <div style={emptyCard}>Page not found</div>
        }
    }

    return (
        <Container>
            <Header
                title="Task Manager"
                subtitle="Create, track and close tasks, with routing between pages."
                backHref="../../index.html"
            />
            <Section style={{ gap: 32 }}>
                {user && (
                    <NavBar active={activePath} user={user} onNavigate={navigate} onSignOut={() => setUser(null)} />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: user ? 0 : 16 }}>
                    {renderPage()}
                </div>
            </Section>
            <Footer year={2026} author="Koushik" />
        </Container>
    )
}

export default App_06
