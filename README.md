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

## License

See [LICENSE.md](LICENSE.md)
