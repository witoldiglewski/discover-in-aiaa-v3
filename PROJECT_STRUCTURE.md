# Project Structure

This document describes the organized file structure of the discover-in-aiaa project.

## Root Directory

```
discover-in-aiaa/
├── .claude/                    # Claude Code configuration
├── docs/                       # Documentation and development assets
│   └── screenshots/           # Development screenshots (37 files)
├── public/                     # Static assets served by Vite
│   └── toolbar-icons/         # Article editor toolbar icons (21 SVG files)
├── src/                        # Source code
│   ├── assets/                # Application assets
│   │   ├── icons/            # SVG icons (4 files: sparkle-alt, high-impact, medium-impact, low-impact)
│   │   └── images/           # Images (Gradient.png)
│   ├── components/            # React components
│   │   ├── ActionFooter.tsx
│   │   ├── ArticleOverlay.tsx
│   │   ├── ArticlesTable.tsx
│   │   ├── LoaderAnimation.tsx
│   │   ├── MainContent.tsx
│   │   ├── ProceduresTable.tsx
│   │   ├── ReviewArticleOverlay.tsx
│   │   ├── StepProgress.tsx
│   │   ├── Stepper.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── SummaryGrid.tsx
│   │   └── TopicsTable.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/                      # Playwright tests
├── .gitignore
├── index.html
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.*.json
└── vite.config.ts
```

## Asset Organization

### Source Assets (`src/assets/`)

Assets that require build-time processing (imports with `?react` for SVGs, bundled images):

- **icons/**: SVG icons imported as React components
  - Used by: ArticlesTable, ProceduresTable
  - Import path: `../assets/icons/[name].svg?react`

- **images/**: Images bundled by Vite
  - Used by: SummaryGrid (Gradient.png)
  - Import path: `../assets/images/[name].png`

### Public Assets (`public/`)

Assets served statically (accessible via URL path):

- **toolbar-icons/**: Article editor toolbar SVG icons
  - Used by: ArticleOverlay, ReviewArticleOverlay
  - URL path: `/toolbar-icons/[name].svg`

### Documentation (`docs/`)

- **screenshots/**: Development screenshots for tracking UI progress
  - All PNG files from the development process
  - Not served to users, only for internal reference

## Key Configuration Files

- **vite.config.ts**: Build configuration with React and SVGR plugins
- **tsconfig.*.json**: TypeScript configurations
- **playwright.config.ts**: E2E test configuration
- **.gitignore**: Includes `.playwright-mcp/` for test artifacts

## Notes

- SVG icons in `src/assets/icons/` use the `?react` import syntax via vite-plugin-svgr
- The `public/` directory is served as-is by Vite at the root URL path
- Development screenshots are organized in `docs/screenshots/` to keep the root clean
