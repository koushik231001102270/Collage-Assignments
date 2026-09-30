import React from "react";

interface DashboardProps {
  username: string;
  token: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  username,
  token,
  onLogout,
}) => {
  const tokenPreview = token.length > 28
    ? `${token.slice(0, 28)}…`
    : token;

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
          Welcome, {username}
        </span>
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "var(--subdued)",
          }}
        >
          protected dashboard
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div
            style={{
              background: "var(--secondary)",
              borderRadius: "20px 20px 4px 4px",
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "14px 18px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "var(--subdued)",
              }}
            >
              Authentication
            </span>
            <span style={{ fontSize: "16px", color: "var(--default)" }}>
              Valid
            </span>
          </div>

          <div
            style={{
              background: "var(--secondary)",
              borderRadius: "4px 4px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "14px 18px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "var(--subdued)",
              }}
            >
              Simulated JWT
            </span>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.5px",
                color: "var(--default)",
                opacity: 0.7,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={token}
            >
              {tokenPreview}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        style={{
          font: "inherit",
          fontSize: "12px",
          letterSpacing: ".04em",
          lineHeight: "16px",
          padding: "6px 14px",
          border: "none",
          borderRadius: "20px",
          background: "var(--secondary)",
          color: "var(--subdued)",
          transition: "all 0.2s ease-in-out",
          cursor: "default",
          alignSelf: "flex-start",
        }}
      >
        Logout
      </button>
    </div>
  );
};
