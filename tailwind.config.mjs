/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0A2647',
        'petroleum-gold': '#D4A846',
        'rich-amber': '#E8A027',
        'off-white': '#F8F9FA',
        'charcoal': '#2D3436',
        'light-gold': '#F5E6D3',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
