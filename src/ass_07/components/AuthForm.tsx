import React from "react";
import { ADMIN_CREDENTIALS, getPasswordStrength } from "../auth";

interface AuthFormProps {
  username: string;
  password: string;
  remember: boolean;
  error: string | null;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (value: boolean) => void;
  onSubmit: () => void;
}

const fieldStyle = (focused: boolean): React.CSSProperties => ({
  font: "inherit",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "14px 18px",
  border: "none",
  outline: "none",
  background: focused ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
  color: "var(--default)",
  width: "100%",
  userSelect: "text",
  transition: "all 0.2s ease-in-out",
});

function getFieldRadius(index: number, total: number) {
  if (total === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === total - 1) return "4px 4px 20px 20px";
  return "4px";
}

export const AuthForm: React.FC<AuthFormProps> = ({
  username,
  password,
  remember,
  error,
  onUsernameChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
}) => {
  const [usernameFocused, setUsernameFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const strength = getPasswordStrength(password);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div
        style={{
          background: "var(--secondary)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "14px 18px",
        }}
      >
        <span style={{ fontSize: "16px", color: "var(--default)" }}>
          Predefined admin account
        </span>
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.5px",
            color: "var(--subdued)",
            opacity: 0.7,
          }}
        >
          This assignment uses predefined credentials. No user registration is provided.
        </span>
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.5px",
            color: "var(--default)",
          }}
        >
          {ADMIN_CREDENTIALS.username}&nbsp;·&nbsp;{ADMIN_CREDENTIALS.password}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <input
            aria-label="Username"
            autoComplete="username"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            placeholder="Username"
            style={{
              ...fieldStyle(usernameFocused),
              borderRadius: getFieldRadius(0, 2),
            }}
          />

          <input
            aria-label="Password"
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Password"
            style={{
              ...fieldStyle(passwordFocused),
              borderRadius: getFieldRadius(1, 2),
            }}
          />
        </div>

        {strength ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "var(--subdued)",
              }}
            >
              Password strength
            </span>
            <span style={{ fontSize: "16px", color: "var(--default)" }}>
              {strength.label}
            </span>
          </div>
        ) : null}

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "default",
          }}
        >
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => onRememberChange(event.target.checked)}
            style={{ accentColor: "var(--default)" }}
          />
          <span
            style={{
              fontSize: "12px",
              letterSpacing: ".04em",
              color: "var(--subdued)",
            }}
          >
            Remember user
          </span>
        </label>

        {error ? (
          <p style={{ color: "#ffb4ab", fontSize: "12px", lineHeight: "16px" }}>
            {error}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        style={{
          font: "inherit",
          fontSize: "12px",
          letterSpacing: ".04em",
          lineHeight: "16px",
          padding: "6px 14px",
          border: "none",
          borderRadius: "20px",
          background: "var(--default)",
          color: "var(--background)",
          transition: "all 0.2s ease-in-out",
          cursor: "default",
          alignSelf: "flex-start",
        }}
      >
        Login
      </button>
    </div>
  );
};
