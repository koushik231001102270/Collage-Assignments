export interface User {
    id: number;
    username: string;
    password: string;
    role: "admin" | "student" | "demo";
}

export interface SessionUser {
    username: string;
    role: User["role"];
}

interface JwtPayload {
    sub: string;
    role: User["role"];
    iat: number;
    exp: number;
    type: string;
}

export interface PasswordStrength {
    label: "Weak" | "Medium" | "Strong";
    score: number;
}

export const seedUsers: User[] = [
    { id: 1, username: "student01", password: "Student@123", role: "student" },
    { id: 2, username: "admin01", password: "Admin@123", role: "admin" },
    { id: 3, username: "demo", password: "Demo@123", role: "demo" },
];

export const ADMIN_CREDENTIALS = {
    username: "admin01",
    password: "Admin@123",
};

export const USERS_KEY = "ass07_users";
export const TOKEN_KEY = "ass07_token";
export const REMEMBER_KEY = "ass07_remember";
export const USERNAME_KEY = "ass07_username";

function encodeBase64Url(value: string) {
    return btoa(value)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (padded.length % 4)) % 4);
    return atob(padded + padding);
}

function simulatedSignature(header: string, payload: string) {
    return encodeBase64Url(`ASSIGNMENT_7_SIMULATION:${header}.${payload}`);
}

export function createSimulatedJwt(username: string, role: User["role"]) {
    const now = Math.floor(Date.now() / 1000);
    const payload: JwtPayload = {
        sub: username,
        role,
        iat: now,
        exp: now + 60 * 60,
        type: "SIMULATED_JWT",
    };

    const header = encodeBase64Url(
        JSON.stringify({ alg: "SIMULATION", typ: "JWT" })
    );
    const encodedPayload = encodeBase64Url(JSON.stringify(payload));
    const signature = simulatedSignature(header, encodedPayload);

    return `${header}.${encodedPayload}.${signature}`;
}

export function validateSimulatedJwt(token: string | null): SessionUser | null {
    if (!token) return null;

    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const [header, encodedPayload, signature] = parts;
        if (simulatedSignature(header, encodedPayload) !== signature) {
            return null;
        }

        const payload = JSON.parse(
            decodeBase64Url(encodedPayload)
        ) as JwtPayload;

        const validRoles: User["role"][] = ["admin", "student", "demo"];

        if (
            payload.type !== "SIMULATED_JWT" ||
            typeof payload.sub !== "string" ||
            !validRoles.includes(payload.role) ||
            typeof payload.exp !== "number" ||
            payload.exp <= Math.floor(Date.now() / 1000)
        ) {
            return null;
        }

        return {
            username: payload.sub,
            role: payload.role,
        };
    } catch {
        return null;
    }
}

export function getPasswordStrength(password: string): PasswordStrength | null {
    if (!password) return null;

    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { label: "Weak", score };
    if (score <= 4) return { label: "Medium", score };
    return { label: "Strong", score };
}

export function loadUsers(): User[] {
    try {
        const raw = localStorage.getItem(USERS_KEY);

        if (!raw) {
            localStorage.setItem(
                USERS_KEY,
                JSON.stringify(seedUsers)
            );

            return seedUsers;
        }

        const parsed = JSON.parse(raw) as unknown;

        const validRoles: User["role"][] = [
            "admin",
            "student",
            "demo",
        ];

        const validUsers =
            Array.isArray(parsed) &&
            parsed.length > 0 &&
            parsed.every((user) => {
                if (
                    typeof user !== "object" ||
                    user === null
                ) {
                    return false;
                }

                const item = user as Record<
                    string,
                    unknown
                >;

                return (
                    typeof item.id === "number" &&
                    typeof item.username === "string" &&
                    typeof item.password === "string" &&
                    typeof item.role === "string" &&
                    validRoles.includes(
                        item.role as User["role"]
                    )
                );
            });

        if (!validUsers) {
            localStorage.setItem(
                USERS_KEY,
                JSON.stringify(seedUsers)
            );

            return seedUsers;
        }

        return parsed as User[];
    } catch {
        try {
            localStorage.setItem(
                USERS_KEY,
                JSON.stringify(seedUsers)
            );
        } catch {
            // localStorage may be unavailable
        }

        return seedUsers;
    }
}

export function saveSession(
    username: string,
    token: string,
    remember: boolean
) {
    try {
        if (remember) {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(REMEMBER_KEY, "true");
            localStorage.setItem(USERNAME_KEY, username);
            sessionStorage.removeItem(TOKEN_KEY);
            return;
        }

        sessionStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(REMEMBER_KEY, "false");
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
    } catch {
        sessionStorage.setItem(TOKEN_KEY, token);
    }
}

export function getStoredToken() {
    try {
        const rememberedToken = localStorage.getItem(TOKEN_KEY);
        const sessionToken = sessionStorage.getItem(TOKEN_KEY);
        return rememberedToken ?? sessionToken;
    } catch {
        return null;
    }
}

export function clearSession() {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REMEMBER_KEY);
        localStorage.removeItem(USERNAME_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
    } catch {
        sessionStorage.removeItem(TOKEN_KEY);
    }
}

export function getRememberedUsername() {
    try {
        return localStorage.getItem(USERNAME_KEY) ?? "";
    } catch {
        return "";
    }
}
