# Prompt Template

**How to use:** attach or paste `DESIGN.md`, `CONVENTIONS.md` and `REFERENCE_ASS_02.md` into the other LLM. Then paste the prompt below, filling in the three `{{…}}` placeholders. You can optionally add a demo link or a screenshot of the expected result.

---

```text
You are building one assignment page inside an existing React 19 + TypeScript + Vite project.

I've attached three files. Follow them strictly:
- DESIGN.md: the visual design system (colors, type, spacing, card and control styles). Do not deviate.
- CONVENTIONS.md: folder layout, TypeScript rules, component patterns, and shared components you must reuse.
- REFERENCE_ASS_02.md: a finished assignment in this exact style. Mirror its structure, file split and code style.

ASSIGNMENT NUMBER: {{03}}
TARGET FOLDER: src/ass_{{03}}/   (index.html and main.tsx already exist. Replace App_{{03}}.tsx.)

ASSIGNMENT DESCRIPTION:
"""
{{paste the assignment description here}}
"""

Requirements for your answer:
1. Implement every component and feature the description asks for, using the component names it gives.
   Add local components/Header.tsx and components/Footer.tsx wrappers like the reference does (props-driven,
   breadcrumb says "Assignment {{N}}").
2. Put state in App_{{03}}.tsx and pass data down through props. Put seed data in a typed .ts file with 6–8
   realistic items.
3. Use only inline styles with the CSS variables. No new packages, no CSS files, no Tailwind, no icons.
4. Follow DESIGN.md exactly: a 640px single column, grouped list cards (2px gap, 20px/4px corner rhythm,
   14px 18px padding, var(--secondary) fill, rgba(255,255,255,0.1) hover), 12px/16px type only, weight 400
   only, no shadows or borders.
5. TypeScript: use `import type` for type-only imports, no enums, no unused variables.
6. Don't modify anything in src/components/, src/index.css, vite.config.ts or ass.json.
7. Output every new or changed file as a complete file with its path as a heading. Don't use diffs or "…rest
   unchanged". Then list the files and briefly explain how each requirement is satisfied.
8. Make sure it works at 375px width with no horizontal scroll.
```

---

## Layout hints for the remaining assignments

Optionally add the matching row to the prompt so the other LLM maps features onto the design the same way.

| # | Assignment | Suggested mapping onto the design system |
|---|---|---|
| 03 | Employee Directory | Same as ass_02. Card: avatar · name + "ID · role" · department + "EXP n yrs". A segmented filter by department and/or a search input (a standalone 20px input) in the label row. |
| 04 | Weather Dashboard | A search input + button row. The current weather is a standalone 20px card (city 16px, temperature on the right, condition as meta). The forecast is a grouped list (day · condition · high/low). Use static seed data or a keyless API such as Open-Meteo, with Loading and error states per DESIGN.md §7. |
| 05 | Online Shopping Cart | Two grouped lists: Products (name + price, with a small "Add" pill on the right) and Cart (name + "qty × price", with −/+ segmented pills). The total is a standalone card at the bottom, with one primary "Checkout" button. Save to `localStorage`. |
| 06 | Task Manager | An input + "Add" pill. A segmented filter (All / Active / Done). A grouped task list (title, with a meta due date or status on the right) where clicking a row toggles done (done = `--subdued` at opacity .7) and a small "Remove" pill deletes. An empty-state card. Save to `localStorage`. |
| 07 | Authentication System | A segmented "Sign in / Sign up" toggle. Fields stacked as a grouped input list (2px gap, corner rhythm) with a `Title` label above. One primary submit button. 12px `#ffb4ab` error text. After login, a profile card with "Sign out". Use fake users in `localStorage`, never a real backend. |
