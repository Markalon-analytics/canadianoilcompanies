# Canadian Oil Companies Directory

A production-ready Astro.js website featuring a corporate directory design with full Tailwind CSS styling.

## 🚀 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CTASection.astro       # Reusable call-to-action sections
│   │   ├── CompanyCard.astro      # Company profile cards
│   │   ├── Footer.astro           # Global footer component
│   │   ├── Header.astro           # Global header with branding
│   │   ├── Hero.astro             # Hero section with metrics
│   │   ├── Nav.astro              # Navigation menu
│   │   ├── SectionHeader.astro    # Section headers with labels
│   │   ├── ServiceCard.astro      # Service/feature cards
│   │   └── ValueCard.astro        # Value proposition cards
│   ├── layouts/
│   │   └── BaseLayout.astro       # Base layout with SEO
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── services.astro         # Services page
│   │   └── about.astro            # About page
│   └── styles/
│       └── globals.css            # Global styles and Tailwind imports
├── astro.config.mjs               # Astro configuration
├── tailwind.config.mjs            # Tailwind configuration
└── package.json
```

## 🎨 Design System

### Colors
- **Deep Navy**: `#0A2647` - Primary brand color
- **Petroleum Gold**: `#D4A846` - Secondary/accent color
- **Rich Amber**: `#E8A027` - Hover states
- **Off White**: `#F8F9FA` - Background
- **Charcoal**: `#2D3436` - Text
- **Light Gold**: `#F5E6D3` - Highlights

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## ✨ Features

- **Fully Responsive**: Mobile-first design with Tailwind breakpoints
- **SEO Optimized**: Using astro-seo for comprehensive meta tags and Open Graph
- **Sitemap**: Automatically generated sitemap for search engines
- **Reusable Components**: Modular component architecture
- **Clean Code**: Semantic HTML5 and modern CSS practices
- **Production Ready**: Optimized build output

## 📦 Integrations

- **@astrojs/tailwind**: Tailwind CSS integration
- **@astrojs/sitemap**: Automatic sitemap generation
- **astro-seo**: SEO component for meta tags and social sharing

## 🚢 Deployment

This project can be deployed to any static hosting service:

- **Netlify**: `npm run build` outputs to `./dist/`
- **Vercel**: Automatic Astro detection
- **GitHub Pages**: Configure with GitHub Actions
- **Cloudflare Pages**: Direct integration

## 📝 Customization

### Adding New Pages
1. Create a new `.astro` file in `src/pages/`
2. Import `BaseLayout` and desired components
3. Add the route to `Nav.astro`

### Modifying Colors
Update the color values in `tailwind.config.mjs` under `theme.extend.colors`

### Adding Components
Create new components in `src/components/` following the existing patterns

## 🔧 Configuration

### Site URL
Update the site URL in `astro.config.mjs` for proper canonical URLs and sitemap generation:

```js
export default defineConfig({
  site: 'https://your-domain.com',
  // ...
});
```

## 📄 License

This project is provided as-is for demonstration purposes.
