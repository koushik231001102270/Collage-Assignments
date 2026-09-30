# Design System

This is the visual language every assignment page must follow. It comes from the home page (`src/App.tsx`) and the shared components in `src/components/`. Match it exactly. Do not invent new colors, fonts, shadows or radii.

The look is a **quiet, dark-green, single-column list UI**: one narrow centered column, small type, flat tinted surfaces, grouped list cards with a soft corner rhythm, and no shadows, borders or bold text.

---

## 1. Color tokens

These are defined on `:root` in `src/index.css`. Always use the CSS variable, never the hex value.

| Token | Hex | Use |
|---|---|---|
| `var(--background)` | `#0a1f0c` | Page background. Also the fill for "sunken" elements inside a card, like an avatar well. |
| `var(--secondary)` | `#162E1A` | Surface fill for cards, list rows, inputs and inactive buttons. |
| `var(--default)` | `#e6ffe8` | Primary text: headings, names, key values. |
| `var(--subdued)` | `#8ac28d` | Body text, labels, meta text. This is the body's default text color. |
| `var(--border)` | `#58835E` | Thin 1px rings only, like around an avatar. Never a card border. |
| `rgba(255, 255, 255, 0.1)` | — | Hover or active fill for any card, row or button. Replaces `--secondary` on hover. |

Opacity is used for a third level of text: `opacity: 0.7` on `--subdued` (secondary descriptions) or on `--default` (secondary values).

**Status colors** aren't in the palette. If an assignment needs one (form error, "out of stock", "overdue"), use `#ffb4ab` for errors and nothing else. Keep it rare and apply it to 12px text only, never as a fill.

---

## 2. Typography

- **Font:** `GoogleSans` (Google Sans Flex), declared in `index.css` at **weight 400 only**. Never use `fontWeight` 500–900 or `<strong>`/`<b>` for emphasis. Show emphasis with color (`--default` vs `--subdued`) instead.
- Global `* { user-select: none; }` and `-webkit-font-smoothing: antialiased` are already set.

| Role | Size / line-height | Letter-spacing | Color | Notes |
|---|---|---|---|---|
| Page heading `<h2>` | 16px / 24px | `.01em` | `--default` | Styled globally, so just use `<h2>`. |
| Body `<p>` inside `<section>` | 16px / 24px | `.02em` | `--subdued` | Styled globally, so just use `<p>` inside a `Section`. |
| Section label (`Title` component) | 12px / 16px | `.04em` | `--subdued` | e.g. "Assignment", "Students — 8". |
| Card primary text | 16px | — | `--default` | Name or title. Truncate to 1–2 lines. |
| Card description | 12px | `0.5px` | `--subdued` + `opacity: 0.7` | Subtitle, roll number, etc. |
| Meta / tag text | 12px, `textTransform: "uppercase"` | `0.5px` | `--subdued` | e.g. "SEM 4 / 8", "ASSIGNMENT — 2". |
| Secondary meta value | 12px uppercase | `0.5px` | `--default` + `opacity: 0.7` | Second line under a meta tag. |
| Button / control text | 12px / 16px | `.04em` | `--subdued` (inactive) / `--default` (active) | |

**Text idioms**
- Separate a label from a count with an em dash and spaces: `Students — 8`, `assignment — 2`.
- Separate inline values with `&nbsp;·&nbsp;` (for example `CSE2024-018 · Computer Science`) or `&nbsp;/&nbsp;` for fractions and breadcrumbs (`4 / 8`, `All assignments / Assignment 2`).
- Labels are sentence case. Uppercase comes only from CSS on meta text.

---

## 3. Layout & spacing

Everything sits in **one centered column, 640px max, with a 16px side gutter**. There is no grid of cards and no multi-column layout. Lists stack vertically.

```
<Container>                  main: flex column, centered, gap 40px
  <Header/>                  empty spacer: paddingTop 38px
  <Section>                  intro: gap 24px
     div (paddingTop 16)     <h2> title + <p> subtitle
     div                     <p> with a .text-underline link
  </Section>
  <Section style={{gap:32}}> content
     row (marginTop 16)      <Title> label  ...  controls on the right
     <List/>                 grouped cards
  </Section>
  <Footer/>                  paddingTop 56px, paddingBottom 20px, "© 2026 Koushik"
</Container>
```

| Thing | Value |
|---|---|
| Column max-width | `640px` (Header, Section, Footer) |
| Side gutter | `paddingInline: 16px` |
| Gap between page blocks (`Container`) | `40px` |
| Gap inside an intro `Section` | `24px` (default) |
| Gap inside a content `Section` | `32px` (`style={{ gap: 32 }}`) |
| Content label row | `marginTop: 16` |
| Header top spacing | `paddingTop: 38` |
| Footer | `paddingTop: 56px`, `paddingBlock: 20px` |
| Gap between items in a grouped list | **`2px`** |
| Card padding | **`14px 18px`** |
| Gap between columns inside a card | `16px` |
| Gap between stacked text lines in a card | `6px` |
| Gap between a label and its control | `12px` |

Use only these spacing values: 2, 6, 12, 14, 16, 18, 24, 32, 38, 40, 56. Don't add others.

---

## 4. Shape: the grouped-list corner rhythm

This is the signature of the design. Items in a list touch each other with a 2px gap and share one big rounded outline. The outer corners are **20px** and the inner corners are **4px**.

```ts
function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";                // first
  if (index === totalItems - 1) return "4px 4px 20px 20px";   // last
  return "4px";                                               // middle
}
```

For **horizontal groups** like segmented buttons or tabs, rotate the rule:

```ts
if (index === 0) return "20px 4px 4px 20px";
if (index === totalItems - 1) return "4px 20px 20px 4px";
return "4px";
```

- A standalone card, input or button uses `20px` on all corners.
- Avatars and photos are circles (`borderRadius: "50%"`).
- The list wrapper is a plain flex column: `display: flex; flexDirection: column; gap: 2px; width: 100%`. It has no background, padding or radius of its own.
- The parent passes `index` and `total` to each item so the item can compute its radius. `src/components/CardItem.tsx` does this with `cloneElement`. `ass_02` passes them explicitly from `.map((item, index) => …)`.

---

## 5. Card anatomy

A card is one horizontal row with **left media (optional), center text that grows, and right meta**:

```
┌──────────────────────────────────────────────────────────┐
│ (●)  Primary text 16px --default              9.67       │  ← 16px --default
│      description 12px --subdued .7            SEM 4 / 8  │  ← 12px UPPERCASE --subdued
└──────────────────────────────────────────────────────────┘
 padding 14px 18px · gap 16px · background --secondary · radius per rhythm
```

```ts
{
  background: hovered ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
  borderRadius: getBorderRadius(index, total),
  display: "flex",
  alignItems: "center",           // "start" if text can wrap to 2 lines
  gap: "16px",
  padding: "14px 18px",
  transition: "all 0.2s ease-in-out",
  cursor: "default",
}
```

- **Center column:** `display: flex; flexDirection: column; gap: 6px; minWidth: 0; flex: 1`. Clamp or ellipsize text:
  - 1 line: `whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"`
  - 2 lines: `display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"`
- **Right column:** `flexShrink: 0; whiteSpace: nowrap; textAlign: right` (or `alignItems: flex-end`). The top line holds the key value or tag, and the bottom line holds a secondary meta value.
- **Media:** 44×44 circle, `background: var(--background)`, `border: 1px solid var(--border)`, `overflow: hidden`, with the image set to `objectFit: cover`. If the image fails to load, show the initials in the meta text style.
- **Hover** swaps the fill to `rgba(255,255,255,0.1)`. Track it with `useState` plus `onMouseEnter`/`onMouseLeave`. Hover never adds lift, scale, shadow or a border.

---

## 6. Controls (buttons, toggles, inputs)

Controls use the same surfaces and rhythm as cards. None of them get borders or shadows.

**Segmented control / toggle group** (sort order, filters, tabs):
```ts
{
  font: "inherit", fontSize: "12px", letterSpacing: ".04em", lineHeight: "16px",
  padding: "6px 14px",
  border: "none",
  borderRadius: /* horizontal rhythm */,
  background: active ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
  color: active ? "var(--default)" : "var(--subdued)",
  transition: "all 0.2s ease-in-out",
  cursor: "default",
}
```
Buttons sit in a flex row with `gap: 2px`. Put a small label to the left (12px, `.04em`, `--subdued`, `opacity 0.7`) with a `12px` gap. Use `role="radiogroup"`, `role="radio"` and `aria-checked` for single-choice groups.

**Single button** (Add, Remove, Submit): the same style as a segmented button with `borderRadius: "20px"`. For the one primary action on a screen, use `background: var(--default)` and `color: var(--background)`. Every other button stays secondary.

**Text input / select / textarea** (derived pattern for forms):
```ts
{
  font: "inherit", fontSize: "16px",
  padding: "14px 18px",
  border: "none", outline: "none",
  borderRadius: /* vertical rhythm when stacked, else "20px" */,
  background: focused ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
  color: "var(--default)",
  width: "100%",
  transition: "all 0.2s ease-in-out",
}
```
Stack form fields like a grouped list with a 2px gap and the corner rhythm. Put the field label above the group as a `Title`. Placeholder text should be `--subdued`. You can't do that with inline styles, so use `::placeholder` in a small `<style>` tag or accept the browser default.

**Links:** use `className="text-underline"`. It colors the link `--default` and fades the underline in on hover.

---

## 7. States

- **Empty state:** a single standalone card (`radius 20px`) with 16px `--subdued` text like "No tasks yet". Don't use illustrations.
- **Loading:** a card with `Loading…` in the same style. Don't use spinners.
- **Error:** 12px text in `#ffb4ab` under the related control or card.
- **Selected / active item:** use the hover fill `rgba(255,255,255,0.1)` persistently.

---

## 8. Don'ts

- No shadows, gradients, blur or glassmorphism.
- No borders on cards, inputs or buttons (`--border` is only for avatar rings).
- No font weights other than 400, and no font sizes other than 12px and 16px.
- No multi-column card grids. Use one column at 640px max.
- No colored backgrounds besides `--background`, `--secondary` and the white-10% hover.
- No emojis or icon libraries. Use text, and `←`, `·`, `/` and `—` are fine.
- No `cursor: pointer`. The design uses `cursor: default` everywhere, including on links and buttons.
- No animation beyond `transition: all 0.2s ease-in-out` on background and color.
- No horizontal scroll at 375px width. Truncate text with ellipsis instead.
