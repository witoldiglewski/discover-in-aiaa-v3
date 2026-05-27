# Discover in AIAA - Multi-Version Setup

This repository contains two versions of the Discover automation opportunities prototype.

## Directory Structure

```
discover-in-aiaa/
├── v1/                 # Version 1 (Current/Stable)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts  (Port 5173)
├── v2/                 # Version 2 (Development)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts  (Port 5174)
├── shared/            # Shared components (optional)
├── docs/              # Documentation
└── tests/             # Shared tests
```

## Quick Start

### First Time Setup

```bash
# Install dependencies for both versions
npm run install:all
```

Or install individually:
```bash
npm run install:v1
npm run install:v2
```

### Running the Applications

**Run Version 1 only:**
```bash
npm run dev:v1
# Opens at http://localhost:5173
```

**Run Version 2 only:**
```bash
npm run dev:v2
# Opens at http://localhost:5174
```

**Run both versions simultaneously:**
```bash
npm run dev:both
# v1: http://localhost:5173
# v2: http://localhost:5174
```

## Development Workflow

### Working on Version 1
```bash
cd v1
npm run dev
```

### Working on Version 2
```bash
cd v2
npm run dev
```

### Building for Production

**Build both versions:**
```bash
npm run build:both
```

**Build individually:**
```bash
npm run build:v1
npm run build:v2
```

## Available Scripts (Root Level)

| Script | Description |
|--------|-------------|
| `npm run dev:v1` | Start v1 dev server (port 5173) |
| `npm run dev:v2` | Start v2 dev server (port 5174) |
| `npm run dev:both` | Start both dev servers simultaneously |
| `npm run build:v1` | Build v1 for production |
| `npm run build:v2` | Build v2 for production |
| `npm run build:both` | Build both versions |
| `npm run install:v1` | Install v1 dependencies |
| `npm run install:v2` | Install v2 dependencies |
| `npm run install:all` | Install dependencies for both versions |
| `npm run test:v1` | Run v1 tests |
| `npm run test:v2` | Run v2 tests |

## Version Differences

### Version 1 (v1/)
- **Port:** 5173
- **Status:** Stable/Current
- **Description:** Original implementation

### Version 2 (v2/)
- **Port:** 5174
- **Status:** Development
- **Description:** Started as copy of v1, will diverge with new features

## Sharing Code Between Versions

Place shared components, utilities, or assets in the `shared/` directory:

```
shared/
├── components/     # Shared React components
├── utils/          # Shared utility functions
├── types/          # Shared TypeScript types
└── assets/         # Shared assets
```

Import from v1 or v2:
```typescript
import { SharedComponent } from '../../shared/components/SharedComponent';
```

## Notes

- Each version has its own `node_modules` and dependencies
- Each version can be developed, tested, and deployed independently
- Git branches are not needed unless you want additional isolation
- Both versions can run simultaneously for side-by-side comparison

## Troubleshooting

**Port already in use:**
- Stop the other dev server
- Or change the port in `vite.config.ts`

**Dependencies out of sync:**
```bash
npm run install:all
```

**Build issues:**
```bash
cd v1 && rm -rf node_modules package-lock.json && npm install
cd ../v2 && rm -rf node_modules package-lock.json && npm install
```
