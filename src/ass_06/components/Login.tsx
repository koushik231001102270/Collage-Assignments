import React, { useState } from "react";
import { Title } from "../../components/Title";
import { errorText, primary } from "../ui";

interface LoginProps {
  onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!name.trim()) return setError("Enter your name to continue.");
    onLogin(name.trim());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <style>{".dir-input::placeholder{color:var(--subdued);opacity:.7}"}</style>
      <Title>Sign in to view your tasks</Title>
      <input
        className="dir-input" aria-label="Your name" placeholder="Your name"
        value={name} onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          font: "inherit", fontSize: "16px", padding: "14px 18px", border: "none", outline: "none",
          borderRadius: "20px", width: "100%", color: "var(--default)", userSelect: "text",
          background: focused ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
          transition: "all 0.2s ease-in-out",
        }}
      />
      {error && <span style={errorText}>{error}</span>}
      <div><button onClick={submit} style={primary}>Sign in</button></div>
    </div>
  );
};
