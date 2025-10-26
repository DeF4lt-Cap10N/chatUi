# Chat Application

A modern chat interface built with React, TypeScript, Tailwind CSS, and Zustand.

## Features

-  Collapsible sidebar with navigation
-  Real-time chat interface
-  File attachment support (drag & drop, paste, upload)
-  Quick action cards
-  State management with Zustand
-  Fully responsive design

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd inteliq-chat-app
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Deploy

The build output will be in the `dist` folder. You can deploy it to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Project Structure
```
src/
├── components/       # React components
├── store/           # Zustand store
├── types/           # TypeScript types
├── App.tsx          # Main app component
└── index.tsx        # Entry point
```

## Notes

- Camera icon is not functional (design only)
- Search functionality is optional
- View All button is a placeholder
