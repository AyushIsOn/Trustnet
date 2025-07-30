# MetallicPaint Animation Demo

This project demonstrates the React Bits MetallicPaint animation component in a React + TypeScript + Tailwind CSS application.

## Features

- ✨ **MetallicPaint Animation**: Beautiful liquid metallic animation effect on text and images
- ⚡ **Vite + React**: Fast development with Hot Module Replacement
- 🎨 **Tailwind CSS**: Utility-first CSS framework for styling
- 📝 **TypeScript**: Type-safe development experience
- 🔧 **React Bits Integration**: Component management via jsrepo

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

## Using the MetallicPaint Component

The demo includes:
- Sample text generation with metallic effect
- Image upload functionality for custom effects
- Configurable animation parameters

### Example Usage

```tsx
import MetallicPaint, { parseLogoImage } from './components/Animations/MetallicPaint/MetallicPaint'

// With sample image data
<MetallicPaint 
  imageData={imageData}
  params={{
    patternScale: 2,
    refraction: 0.015,
    edge: 1,
    patternBlur: 0.005,
    liquid: 0.07,
    speed: 0.3,
  }}
/>
```

## React Bits Components

This project uses [React Bits](https://reactbits.dev) components managed via jsrepo:

- **Add more components**: `npx jsrepo add ComponentName`
- **Browse available components**: `npx jsrepo add`
- **Configuration**: See `jsrepo.json`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Bits** for animations
- **jsrepo** for component management
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
