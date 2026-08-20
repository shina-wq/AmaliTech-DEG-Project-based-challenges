# SecureVault Dashboard

A file explorer UI for a fictional enterprise cloud storage company. Built for the AmaliTech DEG project-based challenge.

**Live demo:** https://amali-tech-deg-project-based-challe-gilt.vercel.app/
**Design file:** https://www.figma.com/design/UFsmlJumEwecmOt68yIX8M/SecureVault-Dashboard

## 1. Features

- Recursive folder tree, expand/collapse, any depth
- Click a file to see its details (name, type, size) in a properties panel
- Full keyboard navigation (arrow keys, Enter, Home/End)
- Search with wildcards (`*.pdf`, `Case_*`): matching files auto-expand their parent folders
- Recent Activity: remembers the last 5 files you opened
- Responsive: side panel on desktop, bottom drawer on mobile

## 2. Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Vitest + React Testing Library

## 3. Setup

Requires Node 20.19+ or 22.12+ (tested on v24).

```bash
git clone https://github.com/shina-wq/AmaliTech-DEG-Project-based-challenges.git
cd AmaliTech-DEG-Project-based-challenges/fullstack/secure-vault
npm install
npm run dev
```

Other commands:

```bash
npm run test     # run tests
npm run build    # type-check + production build
npm run lint      # eslint
```

## 4. Architecture
```
src/
├── components/
│   ├── explorer/    # tree view (FileExplorer, TreeNode)
│   ├── properties/  # side panel + mobile drawer
│   ├── layout/      # header
│   └── ui/          # small reusable pieces (Button, Badge, SearchInput...)
├── hooks/           # useTreeNavigation, useRecentActivity, useNow
├── utils/           # tree.ts, search.ts, file.ts, time.ts (plain functions)
└── types/           # TreeNode / FileNode / FolderNode
```

## 5. Recursive Strategy

The data is a tree (`FolderNode` can hold more `TreeNode`s, `FileNode` is always a leaf - see `types/tree.ts`). Two problems come from this shape, and I solved both outside the component tree:

1. **What's currently visible?** `getVisibleNodes()` in `utils/tree.ts` walks the tree and returns a flat array of only the nodes that should show right now, based on which folders are expanded. This flat list is also what keyboard navigation uses for "next/previous item". There's no need to know about tree structure at all once you have this array.
2. **Rendering.** `TreeNode.tsx` renders itself, then loops its own children and renders a `TreeNode` for each, recursion, not a manual depth loop. This is why it doesn't care if a folder is nested 2 levels or 20 (see `tree.deep.test.ts`, which checks 20 levels of nesting).

Keeping the "which nodes are visible" logic in a plain function, separate from the component that renders them, is what makes both the keyboard nav and the recursion simple.

## 6. Keyboard Navigation

Follows the W3C tree view pattern (`useTreeNavigation.ts`):

| Key | Action |
|---|---|
| `↓` / `↑` | Move focus to next/previous visible item |
| `→` | Expand a folder (focus stays), or move into first child if already open |
| `←` | Collapse a folder (focus stays), or move to parent if already closed |
| `Enter` | Open the focused file |
| `Home` / `End` | Jump to first / last visible item |

Only one item has `tabIndex={0}` at a time (roving tabindex), so pressing Tab once puts you in the tree, and arrow keys take over from there. This is the same pattern used in real component libraries.

## 7. Wildcard Feature: Recent Activity

The brief asked for one extra feature not in the requirements. I chose **Recent Activity**: the last 5 files you opened, shown at the bottom of the properties panel, click one to jump straight back to it.

**Why this one**: In a real file vault, the most common thing a user does is not browse once. It's come back to the same handful of files over and over (a case file, a spreadsheet they're mid-edit on, and so on). Recent Activity turns that from "find it in the tree again" into "click it in the list." It's a small change that saves the most repeated action in the app and therefore saves time and improves user experience.

**Honest limitation:** This is stored in `localStorage` (see `useRecentActivity.ts`), not on a server. That means it doesn't follow you across devices or browsers, and clearing site data wipes it. For a real product handling legal/financial files, this would need to be a real API endpoint tied to the user's account. `localStorage` is the right call for this challenge project but not a production-ready project.

## 8. Accessibility

- Tree follows the [W3C treeview pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/): `role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-selected`, `aria-level`
- Roving tabindex: one Tab stop for the whole tree, arrow keys move focus inside it
- All interactive elements are real `<button>`s, so they work with screen readers and keyboards out of the box, no extra ARIA needed
- Focus is visible (`focus-visible` rings) everywhere
- Empty folders and empty search results announce as text, not just blank space

## 9. Testing

```bash
npm run test
```

Covers:
- Keyboard navigation (all arrow/Enter/Home/End cases)
- Tree flattening and parent-mapping logic
- Deep nesting (20 levels) doesn't break anything
- TreeNode rendering (expand/collapse, empty folder state)
- Full app flow (select a file, see it in the properties panel)

## 10. Future Improvements

Things I'd do next if this became a real product:

- **Virtualize the tree.** Right now every visible row renders as a real DOM node. Fine for hundreds of files, but a vault with tens of thousands of files would get slow. Libraries like `react-window` fix this by only rendering rows currently on screen.
- **Move Recent Activity to a backend.** So it follows the user across devices, not just one browser.
- **Wire up the Upload button.** It's in the UI but doesn't do anything yet.
- **Drag-and-drop** files between folders.
- **Multi-select** (shift-click, ctrl-click) for bulk actions like delete or move.
- **Debounce the search input** so it doesn't re-filter the tree on every keystroke once the file list gets large.