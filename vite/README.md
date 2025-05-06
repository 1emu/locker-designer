# Kitchen Locker Designer

A modern, interactive React application for designing custom kitchen lockers. This project was built with React, TypeScript, and Vite.

## Features

- Interactive visualization of a custom kitchen locker
- Real-time updates as you change parameters
- Configurable dimensions, columns, shelves, and colors
- Shareable designs via URL parameters
- Mobile-friendly, responsive design
- Detailed specifications panel
- Clean, modular React components

## Live Demo

[View the live demo](#) (Replace with your deployed URL)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/kitchen-locker-designer.git
   cd kitchen-locker-designer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or with yarn
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

## Building for Production

To build the application for production:

```bash
npm run build
# or with yarn
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

This project can be easily deployed to GitHub Pages or Vercel:

### GitHub Pages

1. Add the `homepage` field to your `package.json`:

   ```json
   "homepage": "https://yourusername.github.io/kitchen-locker-designer"
   ```

2. Install gh-pages:

   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Vercel

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Customization

### Configuration

All locker configuration parameters are defined in `src/config/config.ts`. You can modify:

- Dimensions (min, max, default values)
- Column and shelf options
- Color palette
- Handle and door styles

### Adding New Features

The modular component structure makes it easy to add new features:

1. Update the `LockerState` interface in `src/types/types.ts`
2. Add configuration in `src/config/config.ts`
3. Create any new UI components needed
4. Update the `LockerDesigner` component to include the new controls
5. Update the visualization in `LockerVisualization.tsx`

## License

MIT

## Acknowledgments

- Original HTML/JS code by [Your Name]
- Converted to React+TypeScript by [Your Name]
