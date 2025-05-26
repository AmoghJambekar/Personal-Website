---
title: "My Personal Website Documented"
date: "2025-05-26T12:00:00-04:00"
description: "How I built my personal website"
tags: ["docs", "tech", "guides"]
---
I built this personal website recently in about a week with no previous knowledge of TailwindCSS and Astro and a very basic knowledge of HTML/CSS/JS and System Design.
<br><br>
Here's how I did it.
<br><br>
## Intro 
This website was made to document my personal and professional life on something that I could call my own. A lot of times, the elements that I used for my website are often split up into different sites. <br><br>

For example, blogs are usually made on Substack, Medium or Blogger, photos are usually shown on Flikr or Dropbox and the whole process becomes a mess. <br><br>

When I designed this website, I knew I wanted to: <br /> 
a. Show off my experience, projects and education as one does on a personal website<br />
b. Show my hobbies somewhere <br />
c. Show that I had a life and document my own life on this blog <br />
d. Create a spot where I can upload photos from functions without needing to send them to people individually or keep commissioned photos in a place of my own and protect them behind a password if need be <br />
<br>
I approached it through Youtube, AI, and a lot of pseudocode so I could understand exactly what I wanted to do.
<br><br>
Eventually, I was able to build this site, and this documentation is to show you how you could make it too.
<br><br>

## Tech Stack
### Framework
- Astro.js
- TypeScript
- MDX for content
<br><br>
### Styling
- Tailwind CSS
- Tailwind Typography Plugin
- PostCSS
- Autoprefixer
<br><br>
### Extras
- Zod for content validation
- rehype-pretty-code for syntax highlighting
- remark-gfm for GitHub Flavored Markdown
- remark-breaks for line break support
<br><br>
## Project Structure

```
/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route-based pages
│   ├── content/       # MDX content for blog
│   ├── layouts/       # Page layout templates
│   └── scripts/       # Utility scripts
├── public/            # Static assets
├── styles/           # Global styles
├── .astro/           # Build output
└── .vscode/          # VS Code settings
```
<br><br>
The architecture of the website uses MDX for content management, which allows for markdown with React components. Tailwind CSS is used for styling, with the typography plugin specifically for content formatting. Type safety is ensured through TypeScript and Zod for content validation. The project uses a file-based routing system through Astro's conventions, where pages in the `src/pages` directory automatically generate routes, and blog posts are managed through MDX files in the content directory.
<br><br>
## Key Features

### Blog System
- MDX-based blog posts with syntax highlighting
- Automatic post listing and categorization
- Tags and dates for each post
- Navigation bar at the bottom for post navigation
- Rich content support with React components
<br><br>
### Navbar
- Responsive navbar
- Dark mode toggle (with LED glow, that's pretty cool)
- Smooth transitions
- Mobile-friendly design
<br><br>
### Photos Page
- Password protection
- Image gallery
- Lazy loading
- Responsive grid layout
<br><br>
### Main Page
- Interactive dropdowns
- Hero section
- About section
- Project showcase
- Contact information
<br><br>
## Development Notes

During development, I encountered a bunch of different challenges which ended up making me into a better developer. The content organization was initially tricky, but I found a clean solution using Astro's content collections. Styling was another area that required attention, which I solved by implementing Tailwind with the typography plugin for consistent content styling. Type safety was a priority, so I added Zod for runtime type checking of content.
<br><br>
The learning curve was steep in some areas, particularly with Astro's content collections and MDX integration. I spent time researching the best practices for content management and styling. The combination of TypeScript and Zod for type safety was a new experience that proved valuable. Modern static site generation techniques were also something I had to learn and implement effectively.
<br><br>
## What's Next

To be honest, I am happy with the way this site turned out and will only be looking towards optimization rather than adding new components. I want to improve loading on the photos page and ensure it looks good, but not much else.
<br><br>
Some refactoring goals include improving component reusability and optimizing the build process. The content management system could use some enhancements, and the type definitions could be more robust. These improvements will make the codebase more maintainable and easier to work with.
<br><br>
## Conclusion

This project has been a great learning experience in modern web development. The combination of Astro.js, MDX, Tailwind CSS, and TypeScript has provided a solid foundation for building a performant and maintainable website. The focus on developer experience and content management has resulted in a system that's both powerful and easy to use.
<br><br>
The website is continuously evolving, and I'm open to suggestions and contributions from the community. Feel free to reach out with any questions or ideas for improvement. You can find the live site at [amoghj.netlify.app](https://amoghj.netlify.app) and the source code [here](https://amoghj.netlify.app).
<br><br>
Thank you for reading this documentation and I hope you like the site!

