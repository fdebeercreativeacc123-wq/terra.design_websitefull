# Frank Sites Website

Production website for Frank Sites, built with React and Vite.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a prerendered production build in `dist/`.
- `npm run preview` previews the built site locally.
- `npm run lint` runs ESLint checks.

## Deployment (Vercel)

This project is static and deploys directly on Vercel with default Vite settings.

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## Notes

- `public/robots.txt` and `public/sitemap.xml` are included.
- `public/site.webmanifest` is included.
- Metadata and Open Graph tags are defined in `index.html`.
- Contact form submits via FormSubmit and redirects to `public/thanks.html`.
- SEO settings for React-rendered pages are centralized in `src/seo/siteSeo.js`.
