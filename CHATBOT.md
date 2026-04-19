# Site Chatbot Guide

## Overview
A floating chatbot widget that answers questions based on your site's content. It's built entirely with vanilla JavaScript and embedded content, requiring no external APIs or dependencies.

## Features
- **Floating Widget**: Fixed position in bottom-right corner
- **Client-Side Processing**: All Q&A happens locally in the browser
- **Responsive Design**: Works on mobile and desktop
- **Dark Mode Support**: Automatically adapts to system preferences
- **Content Search**: Keyword-based matching across all site pages
- **Smart Filtering**: Returns top 3 most relevant pages for any query

## Files Created

### Backend (Hugo Templates)
- **`layouts/partials/chatbot.html`**: Main chatbot component
  - Renders the UI widget
  - Embeds site content as JSON in the page
  - Includes CSS and JS references

- **`layouts/_default/baseof.html`**: Override to include chatbot
  - Adds `{{- partial "chatbot.html" . -}}` before closing `</body>`

### Frontend (JavaScript & CSS)
- **`static/js/chatbot.js`**: Core chatbot logic
  - `findRelevantContent()`: Keyword matching algorithm
  - `generateAnswer()`: Contextual response generation
  - Event handlers for UI interaction

- **`static/css/chatbot.css`**: Styling and animations
  - Floating button with pulsing glow effect
  - Smooth slide-in animation
  - Responsive mobile layout
  - Dark mode styles

## How It Works

1. **Content Indexing**: When Hugo builds the site, all pages (posts, projects, about) are extracted
2. **Embedding**: The content index is embedded as JSON in every page's HTML
3. **Query Processing**: User query is split into keywords
4. **Matching**: Keywords are matched against titles, content, and summaries
5. **Scoring**: Results ranked by relevance (title matches score highest)
6. **Response**: Top result excerpt is returned with links to other matches

## Customization

### Change Bot Colors
Edit `static/css/chatbot.css`:
```css
#chatbot-toggle {
  background: linear-gradient(to right, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### Change Widget Position
Edit `layouts/partials/chatbot.html`:
```html
<div id="chatbot-widget" class="fixed bottom-4 left-4"> <!-- Change to left-4, top-4, etc. -->
```

### Improve Search Accuracy
Edit `static/js/chatbot.js` - Adjust scoring weights:
```javascript
// In findRelevantContent():
if (doc.title.toLowerCase().includes(term)) {
  score += 10; // Increase from 5 for title emphasis
}
```

### Add More Context to Answers
Edit `generateAnswer()` function to include more text:
```javascript
if (topResult.content) {
  const excerpt = topResult.content.substring(0, 400).trim(); // Increase from 200
  answer += excerpt + (topResult.content.length > 400 ? "..." : "");
}
```

## Keyboard Shortcuts
- **Enter**: Send message
- **Escape**: Close chatbot window
- **Tab**: Focus input field

## Limitations & Future Improvements

### Current Limitations
- Keyword-based (no AI/NLP)
- Works only with indexed pages
- No conversation history
- Single language

### Possible Enhancements
1. Integrate with a semantic search library (e.g., `hnswlib.js`)
2. Add persistence using localStorage
3. Support multiple languages via `i18n`
4. Add typing indicator while searching
5. Implement follow-up questions
6. Connect to external API for AI responses

## Troubleshooting

**Q: Chatbot doesn't appear**
- Ensure `layouts/partials/chatbot.html` is included in `layouts/_default/baseof.html`
- Check browser console for errors (F12 → Console)
- Verify CSS file is loading: check Network tab

**Q: Content index is empty**
- Check that content pages have `.Title` and `.Plain` fields
- Ensure pages are not marked as draft: `draft = false`
- Run `hugo --minify` and check `/public/index.html` for `chatbot-content-index`

**Q: Styling broken on mobile**
- Check `static/css/chatbot.css` `@media (max-width: 480px)` section
- Test with browser DevTools mobile view

## Performance Notes
- Content index is embedded inline (no extra HTTP requests)
- Search happens instantly in-browser
- Minimal JavaScript (~5KB minified)
- CSS animations use GPU acceleration
