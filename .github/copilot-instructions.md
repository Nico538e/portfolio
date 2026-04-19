# AI Coding Agent Instructions for Portfolio Site

## Project Overview
This is a Hugo-based static portfolio website using the Blowfish theme. The site showcases projects and blog posts in Danish, built as a static site generator that transforms Markdown content into HTML. Includes a floating chatbot widget for Q&A based on site content.

## Architecture
- **Content Structure**: Markdown files in `content/` with TOML front matter define pages/posts
- **Theme**: Blowfish (git submodule in `themes/blowfish/`) provides layouts and styling
- **Configuration**: Split across `hugo.toml` and `config/_default/` for modularity
- **Build Output**: Generated static files in `public/` directory
- **Chatbot**: Client-side widget in `layouts/partials/chatbot.html` with JS search logic in `static/js/chatbot.js`

## Key Workflows
- **Local Development**: Run `hugo server` to start development server with live reload
- **Build Site**: Execute `hugo` to generate static files in `public/`
- **New Content**: Use `hugo new posts/new-post.md` to create posts via archetypes
- **Theme Updates**: Pull latest Blowfish changes with `git submodule update --remote`
- **Chatbot Customization**: Edit `static/js/chatbot.js` for search logic or `static/css/chatbot.css` for styling

## Conventions & Patterns
- **Front Matter**: Use TOML format with fields like `title`, `date`, `draft`, `tags`, `categories`
- **Taxonomies**: Standard Hugo taxonomies (tags, categories, authors, series) configured in `config/_default/hugo.toml`
- **Language**: Content in Danish (`da`), config in English
- **Archetypes**: `archetypes/default.md` provides TOML template for new content
- **Assets**: Static files in `static/`, images in `assets/images/`
- **Chatbot Content**: Automatically indexed from all non-draft pages during Hugo build

## Configuration Files
- `hugo.toml`: Base config (title, baseURL, theme)
- `config/_default/params.toml`: Theme-specific parameters (colorScheme, homepage layout, etc.)
- `config/_default/hugo.toml`: Hugo settings (taxonomies, pagination, imaging)
- `config/_default/languages.en.toml`: Language settings

## Chatbot Component
- **Partial**: `layouts/partials/chatbot.html` - Renders widget UI + embeds content index
- **Logic**: `static/js/chatbot.js` - Keyword matching, result ranking, response generation
- **Styles**: `static/css/chatbot.css` - Widget appearance, animations, dark mode
- **Integration**: Included in `layouts/_default/baseof.html` before closing `</body>`
- **How it works**: Content pages are extracted during build and embedded as JSON, then searched client-side by keyword matching

## Dependencies
- Hugo (static site generator)
- Blowfish theme (via git submodule)
- No package managers; pure Hugo project (chatbot is vanilla JS)

## Common Patterns
- Homepage layout: Profile style showing recent posts/projects
- Post structure: Title, date, tags/categories, summary, content sections
- Navigation: Header/footer menus defined in `config/_default/menus.en.toml`
- Styling: Tailwind CSS via theme, customizable color schemes
- Chatbot search: Keyword-based with scoring (titles weighted 5x, summaries 3x, content 1x)

## Reference Files
- Post example: `content/posts/post1.md`
- Homepage: `content/_index.md`
- Chatbot documentation: `CHATBOT.md`