# Bright Side Tattoos

A modern, full-stack web application for Bright Side Tattoos - a tattoo studio in downtown Omaha, Nebraska. Built with Next.js 15, Payload CMS 3, and PostgreSQL.

## Overview

This application serves as the complete digital presence for Bright Side Tattoos, featuring:

- **Artist Portfolios** - Individual showcase pages for each tattoo artist with galleries and profiles
- **Content Management** - Powerful CMS with intuitive admin panel at `/admin`
- **Blog & News** - Share studio updates, aftercare tips, and artist spotlights
- **Interactive Map** - Location block with embedded Google Maps and directions
- **Responsive Design** - Optimized experience across all devices
- **Dark Mode** - Theme toggle for comfortable browsing

## Key Features

### For Clients
- Browse artist portfolios with image galleries
- Read blog posts and studio news
- Book appointments through integrated forms
- Find the studio with interactive map
- Search content across the site

### For Staff & Artists
- Manage portfolios through admin panel
- Create and schedule blog posts
- Upload and organize media library
- Configure navigation and site settings
- Preview content before publishing
- Role-based access control (Admin/Artist)

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide Icons

**Backend**
- Payload CMS 3
- PostgreSQL database
- Drizzle ORM
- NextAuth.js authentication

**Infrastructure**
- Vercel hosting
- Vercel Blob storage
- GitHub Actions CI/CD

## Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rogerthemarquis/bright-side.git
   cd bright-side
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URI=postgresql://user:password@localhost:5432/bright-side
   PAYLOAD_SECRET=your-random-secret-here
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
   ```

4. **Run database migrations**
   ```bash
   pnpm payload migrate
   ```

5. **Generate TypeScript types**
   ```bash
   pnpm run generate:types
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` for the website and `http://localhost:3000/admin` for the CMS.

## Project Structure

```
bright-side/
├── src/
│   ├── app/
│   │   ├── (frontend)/        # Public website
│   │   │   ├── portfolios/    # Artist portfolio pages
│   │   │   ├── posts/         # Blog posts
│   │   │   └── [slug]/        # Dynamic pages
│   │   └── (payload)/         # Admin panel
│   ├── blocks/                # Content blocks
│   │   ├── Archive/           # Post listings
│   │   ├── CallToAction/      # CTA sections
│   │   ├── Content/           # Rich text
│   │   ├── FormBlock/         # Contact forms
│   │   ├── MapSection/        # Location map
│   │   └── MediaBlock/        # Images/videos
│   ├── collections/           # Data collections
│   │   ├── Categories/        # Post categories
│   │   ├── Media/             # File uploads
│   │   ├── Pages/             # Site pages
│   │   ├── Portfolios/        # Artist portfolios
│   │   ├── Posts/             # Blog posts
│   │   └── Users/             # Admin users
│   ├── components/            # React components
│   │   ├── Header/            # Navigation
│   │   ├── Footer/            # Footer
│   │   └── ui/                # UI primitives
│   └── payload.config.ts      # CMS configuration
└── migrations/                # Database migrations
```

## Content Management

### Creating Artist Portfolios

1. Go to `/admin` → **Collections** → **Portfolios**
2. Click **Create New**
3. Fill in portfolio details:
   - **Title** - Artist's name
   - **Artist** - Select user account
   - **Profile Tab** - Photo, name, specialty, bio
   - **Gallery Tab** - Select images from media library
   - **Appointment Form** - Optional booking link
4. **Save** as draft or **Publish** to make live

### Managing Navigation

The navigation supports two types of items:

1. **Link** - Standard page links (internal or external)
2. **Artists Dropdown** - Auto-populated list of all published artist portfolios

Configure at **Globals** → **Header** → **Nav Items**

### Adding Blog Posts

1. **Collections** → **Posts** → **Create New**
2. Add title, hero image, and content
3. Assign categories
4. Use **Live Preview** to see changes
5. **Publish** when ready

### Location Map Block

Add to any page via the layout builder:
- Get embed URL from Google Maps → Share → Embed
- Configure title, description, and directions link
- Displays as responsive full-width section

## Development Workflow

### Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Run production server

# Database
pnpm payload migrate:create # Create new migration
pnpm payload migrate        # Run pending migrations

# Types & Code
pnpm run generate:types     # Generate TypeScript types
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
```

### Working with PostgreSQL

This project uses PostgreSQL with manual migrations (`push: false` in config). When you modify collections or fields:

1. **Make schema changes** in Payload config files
2. **Create migration**: `pnpm payload migrate:create`
3. **Review SQL** in `migrations/` folder
4. **Apply migration**: `pnpm payload migrate`
5. **Generate types**: `pnpm run generate:types`

### Database Management

**Important**: Always create migrations for schema changes to prevent data loss.

**Local development**:
- Use a local PostgreSQL instance for faster development
- Schema changes are validated before creating migrations

**Production**:
- Run migrations before deploying new code
- Never modify database schema manually

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables

3. **Environment Variables**
   ```env
   DATABASE_URI=postgresql://production-url
   PAYLOAD_SECRET=production-secret
   BLOB_READ_WRITE_TOKEN=vercel-blob-token
   NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
   ```

4. **Initial Deployment**
   - Vercel builds and deploys automatically
   - Run migrations: `pnpm payload migrate`

### Continuous Deployment

Every push to `main`:
- Builds the application
- Runs type checking
- Deploys to production

Pull requests get preview deployments automatically.

## Customization

### Theming

Edit `src/app/(frontend)/globals.css`:

```css
:root {
  --primary: 210 100% 50%;    /* Brand blue */
  --secondary: 45 100% 51%;   /* Accent yellow */
  --accent: 210 40% 96%;      /* Light gray */
}

.dark {
  --background: 222.2 84% 4.9%;
}
```

### Adding Collections

1. Create file in `src/collections/YourCollection/`
2. Define schema with fields
3. Add to `payload.config.ts`
4. Create migration: `pnpm payload migrate:create`
5. Generate types: `pnpm run generate:types`

### Adding Blocks

1. Create `src/blocks/YourBlock/config.ts`
2. Create `src/blocks/YourBlock/Component.tsx`
3. Register in `src/blocks/RenderBlocks.tsx`
4. Add to page/post blocks configuration

## Features

### Layout Builder
Pages and posts use drag-and-drop blocks:
- Hero sections
- Rich text content
- Media galleries
- Call-to-action sections
- Archive listings
- Contact forms
- Location maps

### SEO & Performance
- Meta tags and Open Graph
- Sitemap generation
- Image optimization (WebP, lazy loading)
- On-demand revalidation
- Dark/light mode support

### Access Control
- **Admin** - Full access to all content and settings
- **Artist** - Manage own portfolio and content
- Role-based permissions per collection

## Troubleshooting

**Port 3000 already in use:**
```bash
npx kill-port 3000
pnpm dev
```

**Database connection errors:**
- Verify `DATABASE_URI` in `.env`
- Ensure PostgreSQL is running
- Check SSL configuration for remote databases

**Module not found:**
```bash
rm -rf node_modules .next
pnpm install
pnpm dev
```

**Migration issues:**
```bash
# View migration status
pnpm payload migrate:status

# Create new migration
pnpm payload migrate:create

# Reset database (caution: destroys data)
pnpm payload migrate:refresh
```

## Resources

- **Payload CMS**: [payloadcms.com/docs](https://payloadcms.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **PostgreSQL**: [postgresql.org/docs](https://postgresql.org/docs)

## Studio Location

**Bright Side Tattoos**  
1200 N 12th St Ste 180  
Omaha, NE 68102

[Get Directions →](https://www.google.com/maps/dir/?api=1&destination=1200+N+12th+St+Ste+180,+Omaha,+NE+68102)

## License

This project is proprietary software for Bright Side Tattoos. All rights reserved.

---

Built with ❤️ for the Bright Side Tattoos community
