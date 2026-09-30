import { useState } from "react";

interface SearchBarProps {
  value: string;
  loading: boolean;
  onSearch: (city: string) => void;
}

export const SearchBar = ({
  value,
  loading,
  onSearch,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const submit = () => {
    onSearch(inputValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2px",
          width: "100%",
        }}
      >
        <input
          aria-label="City name"
          value={inputValue}
          onChange={(event) =>
            setInputValue(event.target.value)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit();
            }
          }}
          placeholder="Enter city"
          style={{
            font: "inherit",
            fontSize: "16px",
            lineHeight: "24px",
            padding: "14px 18px",
            border: "none",
            outline: "none",
            borderRadius: "20px 4px 4px 20px",
            background: focused
              ? "rgba(255, 255, 255, 0.1)"
              : "var(--secondary)",
            color: "var(--default)",
            width: "100%",
            minWidth: 0,
            userSelect: "text",
            transition: "all 0.2s ease-in-out",
          }}
        />

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          style={{
            font: "inherit",
            fontSize: "12px",
            letterSpacing: ".04em",
            lineHeight: "16px",
            padding: "6px 14px",
            border: "none",
            borderRadius: "4px 20px 20px 4px",
            background: loading
              ? "var(--secondary)"
              : "var(--default)",
            color: loading
              ? "var(--subdued)"
              : "var(--background)",
            transition: "all 0.2s ease-in-out",
            cursor: "default",
            flexShrink: 0,
          }}
        >
          {loading ? "Loading…" : "Search"}
        </button>
      </div>
    </div>
  );
};