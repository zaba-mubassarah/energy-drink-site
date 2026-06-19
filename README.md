# Nitro Energy Drink Site

A high-performance, animated landing page for Nitro energy drinks built with React, Vite, GSAP, and Tailwind CSS. Features smooth scroll-triggered animations, a dynamic product lineup, and a bold dark theme with neon accents.

🔗 [Live Demo](https://energy-drink-site.vercel.app/)

## Features

- **Scroll-triggered animations** using GSAP ScrollTrigger for immersive storytelling
- **Dynamic product lineup** with featured can rotation and drop-shadow effects
- **Responsive design** optimized for desktop, tablet, and mobile
- **Custom typography** with Sakana/Sakina font family
- **Dark theme** with neon yellow/green accent palette
- **Smooth transitions** and visual effects powered by CSS filters and gradients

## Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **GSAP 3** - Animation engine with ScrollTrigger plugin
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zaba-mubassarah/energy-drink-site.git

# Navigate to project directory
cd energy-drink-site

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

### Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Lint

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
energy-drink-site/
├── public/
│   ├── Can.png
│   ├── CanFive.png
│   ├── CanFour.png
│   ├── CanOne.png
│   ├── CanTwo.png
│   ├── secondSection.png
│   └── fonts/
├── src/
│   ├── App.jsx          # Main app component with scroll animations
│   ├── App.css          # Component styles and animations
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## Key Components

### Scrolling Can Animation
The main can image follows a GSAP timeline tied to scroll progress, scaling and rotating as the user scrolls through the page.

### Product Lineup
Five product cards displayed in a responsive grid, with the featured center can rotated 90° and enhanced with a larger drop shadow.

### Section Themes
- **Section One (Home)** - Hero with large Nitro title and call-to-action buttons
- **Section Two (Shop)** - Split layout with black & white product image and brand text
- **Section Three (About)** - Product lineup with radial gradient backgrounds

## Customization

### Colors
Primary accent colors are defined in Tailwind classes and CSS:
- Neon yellow: `#d8ff00` / `#E0E600`
- Background dark: `#050507` / `#070709`

### Can Images
Replace images in the `public/` directory:
- `Can.png` - Featured can (Nitro Green)
- `CanOne.png` - Nitro CNG
- `CanTwo.png` - Nitro Red
- `CanFour.png` - Nitro Sky
- `CanFive.png` - Nitro Blue

### Animation Timing
Adjust GSAP timeline positions in `src/App.jsx` (lines 169-184) to change animation sequencing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and not licensed for public use.

## Credits

Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [GSAP](https://gsap.com/), and [Tailwind CSS](https://tailwindcss.com/).