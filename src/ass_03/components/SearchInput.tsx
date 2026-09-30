import React, { useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <style>{".dir-input::placeholder{color:var(--subdued);opacity:.7}"}</style>
      <input
        className="dir-input"
        type="search"
        aria-label="Search employees"
        placeholder="Search by name, ID or phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          font: "inherit", fontSize: "16px", padding: "14px 18px",
          border: "none", outline: "none", borderRadius: "20px",
          background: focused ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
          color: "var(--default)", width: "100%", userSelect: "text",
          transition: "all 0.2s ease-in-out",
        }}
      />
    </>
  );
};
