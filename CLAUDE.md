@AGENTS.md

## Permissions

- **CSS and JS edits do not require confirmation.** Make styling, layout, and JS/JSX changes directly without asking. Only pause and confirm for serious actions: deleting files or directories, changing routing structure, modifying shared config files (`next.config.js`, `package.json`, `globals.css` root variables), or anything that affects the whole app globally.

## Styling rules

- **Never add extra CSS classes just to apply a color.** Colors come from the CSS custom properties defined in `src/app/globals.css` (`:root`). Use inheritance from the parent container or element selectors (e.g. `.card p`) to apply color context. Do not add wrapper classes like `.heading` or `.body` solely for a color override.
- Typography classes (`heading-1`, `body-1`, `label-2`, etc.) are the only classes that should appear on text elements. No extra styling classes alongside them.

## Header logo switching

- The Header uses `logo-light.svg` (white wordmark) over dark backgrounds and `logo-dark.svg` (black wordmark) over light backgrounds.
- Both logo variants are always rendered; a CSS cross-fade controlled by `data-theme` on `<header>` handles the switch.
- **Every page section that scrolls behind the fixed header must declare `data-header-theme="dark"` or `data-header-theme="light"`** on its outermost element. Use `"dark"` for sections with dark fills (e.g. `var(--color-3)`, `var(--color-4)`) and `"light"` for sections with light fills (e.g. `var(--color-5)`, `var(--color-6)`).
- The Header detects the active section via a passive scroll listener that checks `getBoundingClientRect()` at `y = 40px` (vertical midpoint of the 80px header). No context or prop drilling is needed.

## Link hover animation

- **Every interactive link must animate its text on hover using the `useScramble` hook** — matching the behavior in `src/components/ui/Button.jsx` exactly.
- Pattern: import `useScramble` from `@/hooks/useScramble`, call `play()` on `onMouseEnter`, `reset()` on `onMouseLeave`.
- Use the **width-lock pattern**: render an invisible copy of the original text (`visibility: hidden`) to hold the element's natural width, then overlay the animated `display` text with `position: absolute`. This prevents layout shift during the scramble.
- The scramble resolves uppercase characters left-to-right. Pass the link label as the `original` argument to `useScramble`.
