import React from "react";
import { pill } from "../ui";

interface NavBarProps {
  active: string;
  user: string;
  onNavigate: (path: string) => void;
  onSignOut: () => void;
}

const links = [
  { label: "Dashboard", path: "/" },
  { label: "Tasks", path: "/tasks" },
  { label: "Add task", path: "/tasks/new" },
  { label: "Completed", path: "/completed" },
];

function getBorderRadius(index: number, totalItems: number) {
  if (index === 0) return "20px 4px 4px 20px";
  if (index === totalItems - 1) return "4px 20px 20px 4px";
  return "4px";
}

export const NavBar: React.FC<NavBarProps> = ({ active, user, onNavigate, onSignOut }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
      <nav aria-label="Main" style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
        {links.map((link, index) => {
          const isActive = link.path === active;
          return (
            <button
              key={link.path}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(link.path)}
              style={{
                ...pill,
                borderRadius: getBorderRadius(index, links.length),
                background: isActive ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
                color: isActive ? "var(--default)" : "var(--subdued)",
              }}
            >
              {link.label}
            </button>
          );
        })}
      </nav>
      <button onClick={onSignOut} style={pill}>Sign out — {user}</button>
    </div>
  );
};
