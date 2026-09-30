import { useEffect, useState } from "react";

export type Route =
    | { name: "dashboard" }
    | { name: "tasks" }
    | { name: "add" }
    | { name: "details"; id: number }
    | { name: "edit"; id: number }
    | { name: "completed" }
    | { name: "login" }
    | { name: "notfound" };

function currentPath() {
    return window.location.hash.replace(/^#/, "") || "/";
}

export function navigate(path: string) {
    window.location.hash = path;
}

export function usePath() {
    const [path, setPath] = useState(currentPath);
    useEffect(() => {
        const onChange = () => setPath(currentPath());
        window.addEventListener("hashchange", onChange);
        return () => window.removeEventListener("hashchange", onChange);
    }, []);
    return path;
}

export function matchRoute(path: string): Route {
    const [first, second, third] = path.split("/").filter(Boolean);
    if (!first) return { name: "dashboard" };
    if (first === "login") return { name: "login" };
    if (first === "completed") return { name: "completed" };
    if (first !== "tasks") return { name: "notfound" };
    if (!second) return { name: "tasks" };
    if (second === "new") return { name: "add" };
    const id = Number(second);
    if (!Number.isInteger(id)) return { name: "notfound" };
    if (!third) return { name: "details", id };
    return third === "edit" ? { name: "edit", id } : { name: "notfound" };
}
