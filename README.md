# ildarakhmetov.com

Source code for my personal website at [ildarakhmetov.com](https://ildarakhmetov.com/).

This repo is public as part of "building in public" - feel free to browse the code or use it as inspiration for your own site!

## Tech Stack

Built with [Deno](https://deno.com/) and [Lume](https://lume.land/) static site generator:

- **Deno** - Modern JavaScript/TypeScript runtime
- **Lume** - Static site generator
- **Vento** - Templating engine
- **Tailwind CSS** - Styling
- **BibTeX** - Academic publications management

## What's Inside

- 📝 Blog with markdown posts
- 📚 Publications page (parsed from BibTeX)
- 💻 Programming projects showcase
- 🏃 Running log
- 🌍 Travel log
- 👨‍🏫 Teaching materials

## Project Structure

```
├── _config.ts          # Lume configuration
├── _data/              # YAML data files
├── _includes/          # Vento templates
├── _lib/               # Custom utilities (e.g., BibTeX parser)
├── assets/             # Static assets (images, etc.)
├── blog/               # Blog posts (markdown)
├── *.vto               # Page templates
├── styles.css          # Tailwind CSS styles
└── deno.json           # Deno configuration and tasks
```

## Blog Thumbnail Convention

- In blog post front matter, `thumbnail` should reference the original source image in `assets/img/blog/...`.
- The `/blog/` cards automatically generate optimized variants from this source (`avif`, `webp`, `jpg`) at responsive widths.
- Keep using the same `thumbnail` field; no extra thumbnail files are required in post metadata.

## License

See [LICENSE.md](LICENSE.md)
