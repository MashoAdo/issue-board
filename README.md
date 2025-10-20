# Issue Board

A React-based Kanban-style issue board application built for engineering assessment.

## Tech Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **Vite** for build tooling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd issue-board
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and API
├── types/              # TypeScript type definitions
├── constants/          # App constants and configuration
└── data/               # Mock data and fixtures
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
