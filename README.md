# Discover in AIAA - Zendesk Prototype

A production-quality Zendesk prototype for AI Agents automation UI, built with React, TypeScript, Vite, Garden, and Zendesk-UI components.

## Tech Stack

- **React 18** with **TypeScript** - Type-safe component development
- **Vite** - Fast build tool and dev server
- **Garden** (@zendeskgarden/react-*) - Zendesk's open-source design system
- **Zendesk-UI** (@zendesk-ui/*) - Private Zendesk components for product navigation
- **Playwright** - End-to-end testing
- **styled-components** - Component styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- jFrog Artifactory authentication (for @zendesk-ui packages)

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

Start the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

### Testing

Run Playwright tests:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

## Project Structure

```
discover-in-aiaa/
├── src/
│   ├── components/
│   │   ├── GlobalNav.tsx      # Navigation shell (Header, Nav, Subnav)
│   │   └── MainContent.tsx    # Main content area
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── tests/
│   └── prototype.spec.ts      # Playwright tests
├── index.html
├── vite.config.ts
├── playwright.config.ts
└── package.json
```

## Key Features

- **Global Navigation** - Full Zendesk navigation with Header, Nav, Subnav, and Main
- **Product Tray** - Product switcher with all Zendesk products
- **Navigation Items** - 9 nav items with proper 20px icons from @zendesk-ui/assets
- **Subnavigation** - Collapsible subnav for AI Agents section
- **Profile Menu** - User profile with dropdown menu
- **Garden Components** - Button, Typography, Avatar components in main content
- **Type Safety** - Full TypeScript support
- **Testing** - Playwright tests for navigation and interactions

## Architecture

The prototype follows Zendesk's Global navigation patterns:

1. **ThemeProvider** (Garden) wraps the entire app
2. **Product** (Zendesk-UI) is the root navigation component
3. **Header** contains product tray, search, help, and profile
4. **Nav** contains main navigation items (icon-based)
5. **Subnav** contains secondary navigation (collapsible)
6. **Main** contains the page content (Garden components)

## Development Notes

- Always use `--legacy-peer-deps` when installing packages
- SVG icons require `?react` suffix when importing (via vite-plugin-svgr)
- Navigation uses 20px icons from `@zendesk-ui/assets`
- Main content uses 16px icons from `@zendeskgarden/svg-icons`
- Garden components must be inside `<Main>`, not in navigation areas

## License

Private - Zendesk Internal Use Only
