# Project Conventions

This covers how the code is organized and written. Read it together with `DESIGN.md`.

## Stack

- **React 19 + TypeScript (~6.0) + Vite 8.** No other runtime dependencies.
- **No UI libraries, no Tailwind, no CSS modules, no router, no icon packs.** Don't add packages.
- **All styling is inline `style={{…}}` objects** using the CSS variables from `src/index.css`. The only classes are the global `.text-underline` and element selectors like `h2` and `section p`, which are already styled.
- Multi-page Vite app. Each assignment is its own HTML entry.

## TypeScript rules (from `tsconfig.app.json`)

| Flag | What it means for your code |
|---|---|
| `verbatimModuleSyntax` | Type-only imports **must** use `import type { X }` or `import { type X }`. |
| `erasableSyntaxOnly` | **No `enum`, no `namespace`, no constructor parameter properties.** Use union string types like `type SortOrder = "desc" \| "asc"`. |
| `noUnusedLocals` / `noUnusedParameters` | Don't leave unused imports or variables. |
| `jsx: react-jsx` | Don't import `React` just for JSX. Import it only when you use `React.FC`, `React.CSSProperties` and similar. |

## Folder layout

```
index.html                   home page entry (lists assignments)
vite.config.ts               already registers every src/ass_0X/index.html as an input
src/
  index.css                  global tokens + base styles (do not edit)
  main.tsx, App.tsx          home page
  ass.json                   home page list: title, subtitle, role, href per assignment
  font/                      GoogleSans 400 (+600, unused)
  components/                SHARED layout primitives (do not edit, the home page uses them)
    Container.tsx  Header.tsx  Section.tsx  Title.tsx  Footer.tsx  CardItem.tsx
  ass_0X/
    index.html               already exists, links ../index.css and ./main.tsx
    main.tsx                 already exists, renders <App_0X/>
    App_0X.tsx               the assignment root. Holds state and composes the page
    <data>.ts                typed seed data (interface + exported array)
    components/              components local to this assignment
```

`src/ass_03` … `src/ass_07` already have `index.html`, `main.tsx` and a placeholder `App_0X.tsx`. For a new assignment, **replace `App_0X.tsx` and add a `components/` folder and a data file**. You don't need to touch `vite.config.ts`, `index.html`, `main.tsx` or `ass.json`.

| Folder | Assignment |
|---|---|
| `ass_02` | Student Information Management (done, see `REFERENCE_ASS_02.md`) |
| `ass_03` | Employee Directory |
| `ass_04` | Weather Dashboard |
| `ass_05` | Online Shopping Cart |
| `ass_06` | Task Manager |
| `ass_07` | Authentication System |

## Component patterns

1. **State lives in `App_0X`.** Data flows down through props and events flow up through callback props (`onChange`, `onAdd`, `onRemove`). Components below `App_0X` should be presentational, except for local UI state like `hovered`, `focused` or `photoFailed`.
2. **Pass explicit props, not whole objects,** into leaf cards: `name={s.name} roll={s.roll} …`. Lists receive the array.
3. **Data file:** `export interface Thing {…}` and `export const things: Thing[] = […]`. Give each item a stable `id: number` for `key`.
4. **Derived data is computed during render.** For example, `const sorted = [...items].sort(...)`. Never mutate props or state arrays.
5. **Local Header/Footer wrappers.** Each assignment has its own `components/Header.tsx` and `components/Footer.tsx`. They take props (`title`, `subtitle`, `backHref`, `year`, `author`) and wrap the shared `Header`, `Section` and `Footer`. Import the shared ones with an alias: `import { Header as PageHeader } from "../../components/Header"`.
6. **Back link:** `backHref="../../index.html"` works in both dev and build (the Vite `base` is `./`).
7. **Component style:** `export const Name: React.FC<Props> = ({ … }) => { … }` for components, and `function App_0X()` with `export default App_0X` for the root. Define `interface XProps` above the component.
8. **Reusable style fragments** go in `const` objects typed `React.CSSProperties` at the top of the file (for example `clampOneLine` or `meta`), spread into `style`.
9. Keep `getBorderRadius(index, total)` as a small local function in each component that needs it. Don't import it from another assignment.
10. **Accessibility basics:** `alt` on images, a real `<button>` for actions, `role`/`aria-*` on toggle groups, and `<label>` or `aria-label` on inputs.
11. **Persistence**, when an assignment needs it (cart, tasks, auth session): use `localStorage` wrapped in `try/catch`. Don't use a backend.

## Code style

- Double quotes, and semicolons in component files (match surrounding code).
- 2-space indent in `components/`, 4-space in `App_0X.tsx` (this matches the existing files).
- Keep comments sparse. The existing code has almost none.

## Shared components (source, for reference)

You can't edit these, so here's what they look like when you compose with them:

```tsx
// src/components/Container.tsx: page root
export const Container = ({ children }: { children?: React.ReactNode }) => (
  <main style={{ position: "relative", display: "flex", flexDirection: "column", gap: "40px",
    justifyContent: "flex-start", alignItems: "center", overflow: "hidden" }}>{children}</main>
)

// src/components/Header.tsx: empty top spacer
export const Header = () => (
  <header style={{ display: "flex", paddingInline: 16, paddingTop: 38, width: "100%", maxWidth: 640 }}></header>
)

// src/components/Section.tsx: a 640px column block
export const Section = ({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties }) => (
  <section style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%",
    paddingInline: "16px", maxWidth: "640px", ...style }}>{children}</section>
)

// src/components/Title.tsx: 12px section label
export const Title = ({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ color: "var(--subdued)", letterSpacing: ".04em", fontSize: "12px", lineHeight: "16px", ...style }}>{children}</div>
)

// src/components/Footer.tsx
export const Footer = ({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties }) => (
  <footer style={{ display: "flex", paddingBlock: "20px", paddingInline: "16px", paddingTop: "56px",
    alignItems: "center", width: "100%", maxWidth: "640px", ...style }}>{children}</footer>
)
```

`src/components/CardItem.tsx` exports `Card` (with `Card.Container`), a generic grouped link card with `title`, `subtitle`, `role`, `year` and `href`. The home page uses it. You can reuse it for simple text-only lists. When an assignment needs custom fields, build a local card that follows DESIGN.md §5 instead.

## Global CSS (already applied, from `src/index.css`)

```css
* { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
body { font-family: GoogleSans; background-color: var(--background); color: var(--subdued); }
h2 { font-weight: 400; letter-spacing: .01em; line-height: 24px; font-size: 16px; color: var(--default); }
section p { font-weight: 400; letter-spacing: .02em; line-height: 24px; font-size: 16px; color: var(--subdued); }
.text-underline { color: var(--default); text-decoration: underline; text-decoration-color: transparent;
  text-underline-offset: 1.2px; transition: text-decoration-color .2s ease-out; }
.text-underline:hover { text-decoration-color: var(--subdued); }
:root { --default: #e6ffe8; --subdued: #8ac28d; --background: #0a1f0c; --secondary: #162E1A; --border: #58835E; }
```

Note that `user-select: none` is global. For text inputs, add `userSelect: "text"` to the input's style so people can select what they typed.

## Verifying

Don't run the build yourself. Give the user these commands:

```bash
npm run dev
```

```bash
npm run build
```
