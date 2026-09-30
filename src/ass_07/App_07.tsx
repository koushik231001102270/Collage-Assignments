import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { Title } from "../components/Title";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthForm } from "./components/AuthForm";
import { Dashboard } from "./components/Dashboard";
import {
    clearSession,
    createSimulatedJwt,
    getRememberedUsername,
    getStoredToken,
    loadUsers,
    validateSimulatedJwt,
    saveSession,
} from "./auth";

function getRoute() {
    return window.location.hash === "#dashboard" ? "dashboard" : "login";
}

function navigate(route: "login" | "dashboard") {
    window.location.hash = route;
}

function App_07() {
    const [route, setRoute] = useState<"login" | "dashboard">(getRoute);
    const [username, setUsername] = useState(getRememberedUsername());
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sessionUsername, setSessionUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

useEffect(() => {
    loadUsers();

    const storedToken = getStoredToken();
    const session = validateSimulatedJwt(storedToken);

    if (session) {
        setSessionUsername(session.username);
        setToken(storedToken);
        setRoute("dashboard");

        if (window.location.hash !== "#dashboard") {
            navigate("dashboard");
        }
    } else {
        if (storedToken) {
            clearSession();
        }

        setSessionUsername(null);
        setToken(null);
        setRoute("login");

        if (window.location.hash !== "#login") {
            navigate("login");
        }
    }

    const handleHashChange = () => {
        const nextRoute = getRoute();

        if (nextRoute === "dashboard") {
            const currentToken = getStoredToken();
            const currentSession =
                validateSimulatedJwt(currentToken);

            if (currentSession) {
                setSessionUsername(
                    currentSession.username
                );
                setToken(currentToken);
                setError(null);
                setRoute("dashboard");
                return;
            }

            clearSession();
            setSessionUsername(null);
            setToken(null);
            setRoute("login");
            setError(
                "Your session is invalid or expired. Please log in again."
            );

            if (window.location.hash !== "#login") {
                navigate("login");
            }

            return;
        }

        setRoute("login");
    };

    window.addEventListener(
        "hashchange",
        handleHashChange
    );

    return () => {
        window.removeEventListener(
            "hashchange",
            handleHashChange
        );
    };
}, []);

    const handleLogin = () => {
        setError(null);

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        const user = loadUsers().find(
            (item) =>
                item.username.toLowerCase() === username.trim().toLowerCase() &&
                item.password === password
        );

        if (!user) {
            setError("Invalid username or password. Use the predefined account shown above.");
            return;
        }

        const simulatedToken = createSimulatedJwt(user.username, user.role);
        saveSession(user.username, simulatedToken, remember);

        const validatedSession = validateSimulatedJwt(simulatedToken);
        if (!validatedSession) {
            setError("Token validation failed. Please try again.");
            return;
        }

        setSessionUsername(validatedSession.username);
        setToken(simulatedToken);
        setPassword("");
        navigate("dashboard");
    };

    const handleLogout = () => {
        clearSession();
        setSessionUsername(null);
        setToken(null);
        setPassword("");
        setError(null);
        navigate("login");
    };

    return (
        <Container>
            <Header
                title="Authentication System"
                subtitle="Login with predefined credentials, remember the user, validate a simulated JWT, and protect the dashboard."
                backHref="../../index.html"
            />

            <Section style={{ gap: 32 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 12,
                        marginTop: 16,
                    }}
                >
                    <Title>{route === "dashboard" ? "Dashboard" : "Login"}</Title>

                    {route === "dashboard" ? (
                        <span
                            style={{
                                fontSize: "12px",
                                letterSpacing: ".04em",
                                color: "var(--subdued)",
                            }}
                        >
                            protected route
                        </span>
                    ) : null}
                </div>

                {route === "login" ? (
                    <AuthForm
                        username={username}
                        password={password}
                        remember={remember}
                        error={error}
                        onUsernameChange={setUsername}
                        onPasswordChange={setPassword}
                        onRememberChange={setRemember}
                        onSubmit={handleLogin}
                    />
                ) : sessionUsername && token ? (
                    <Dashboard
                        username={sessionUsername}
                        token={token}
                        onLogout={handleLogout}
                    />
                ) : null}
            </Section>

            <Footer year={2026} author="Koushik" />
        </Container>
    );
}

export default App_07;
