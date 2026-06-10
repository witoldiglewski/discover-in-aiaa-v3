# Discover in AIAA - Version 3 (Agent Launch Page)

A Zendesk prototype featuring an agent launch page with Messaging and Email agent options.

## What's Different in V3

V3 uses the **same header and main navigation as V1** but introduces a completely new main content area:

### Main Content Changes
- **Centered layout** with agent launch cards
- **Purple sparkle icon** at the top
- **Title**: "Launch your AI agent in minutes"
- **Description**: Information about how AI agents work
- **Two agent cards**:
  - **Messaging agent** (bubble icon)
  - **Email agent** (paper plane icon)
- **Background gradient** for visual appeal
- **Glassmorphic card design** with blur effects

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** - Build tool (Port 5175)
- **Garden** (@zendeskgarden/react-*) - Zendesk's design system
- **Zendesk-UI** (@zendesk-ui/*) - Navigation components
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

Open http://localhost:5175 in your browser.

### Build

```bash
npm run build
```

## Component Structure

```
v3/
├── src/
│   ├── components/
│   │   ├── GlobalNav.tsx       # Same as V1 (Header, Nav, Subnav)
│   │   └── MainContent.tsx     # NEW: Agent launch cards
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── package.json
└── vite.config.ts              # Port 5175
```

## Design Reference

The V3 design is based on Figma:
- File: Discover in AIAA
- Node: 1194:103413
- Features centered content with two agent cards in a glassmorphic design

## Key Features

- **Same navigation as V1**: Header with product tray, search, help, and profile
- **Same nav items as V1**: Overview, AI Agents, Conversations, Settings, Tools, People, Database, Apps, Growth
- **NEW Main Content**:
  - Centered layout for agent selection
  - Two agent cards (Messaging, Email)
  - Glassmorphic design with backdrop blur
  - Purple gradient background effect
  - Garden Button components with pill shape

## Port Assignment

- V1: http://localhost:5173
- V2: http://localhost:5174
- **V3: http://localhost:5175**

## License

Private - Zendesk Internal Use Only
