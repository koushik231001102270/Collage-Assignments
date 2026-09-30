export type Priority = "High" | "Medium" | "Low";
export type Category = "Academic" | "Personal";
export type Status = "Raised" | "Pending" | "Closed";

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    raisedAt: string;
    dueDate: string;
    status: Status;
}

export type TaskDraft = Omit<Task, "id" | "raisedAt">;

export const priorities: Priority[] = ["High", "Medium", "Low"];
export const categories: Category[] = ["Academic", "Personal"];
export const statuses: Status[] = ["Raised", "Pending", "Closed"];

export const tasks: Task[] = [
    { id: 1, title: "Submit React assignment", description: "Finish the Task Manager with routing and push it to the course portal.", priority: "High", category: "Academic", raisedAt: "2026-08-10T09:30:00.000Z", dueDate: "2026-10-05", status: "Pending" },
    { id: 2, title: "Prepare DBMS viva notes", description: "Revise normalization, transactions and indexing for the viva.", priority: "Medium", category: "Academic", raisedAt: "2026-08-12T14:00:00.000Z", dueDate: "2026-10-12", status: "Raised" },
    { id: 3, title: "Renew library membership", description: "Bring the ID card and the fee receipt to the library counter.", priority: "Low", category: "Personal", raisedAt: "2026-08-14T11:15:00.000Z", dueDate: "2026-08-28", status: "Raised" },
    { id: 4, title: "Book train tickets home", description: "Check the Puja holiday schedule and book a sleeper berth.", priority: "High", category: "Personal", raisedAt: "2026-08-15T18:45:00.000Z", dueDate: "2026-10-15", status: "Pending" },
    { id: 5, title: "Write lab report for Networks", description: "Include the Wireshark captures and a short analysis section.", priority: "Medium", category: "Academic", raisedAt: "2026-08-18T08:00:00.000Z", dueDate: "2026-09-20", status: "Closed" },
    { id: 6, title: "Pay hostel fees", description: "Transfer the semester fee and keep the payment confirmation.", priority: "High", category: "Personal", raisedAt: "2026-08-20T10:20:00.000Z", dueDate: "2026-09-10", status: "Closed" },
];

export function isOverdue(task: { dueDate: string; status: Status }) {
    return task.status !== "Closed" && task.dueDate < new Date().toISOString().slice(0, 10);
}

export function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(value: string) {
    return formatDate(value) + ", " + new Date(value).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function load<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function save(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // storage unavailable
    }
}
