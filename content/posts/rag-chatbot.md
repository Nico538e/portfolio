+++
title = "Hvordan jeg lavede en RAG-chatbot til mit portfolio"
date = 2026-04-19
draft = false
tags = ["AI", "Dify", "RAG", "Chatbot"]
categories = ["Udvikling"]
summary = "En kortfattet guide til at bygge en Retrieval-Augmented Generation chatbot med Dify, Netlify Functions og vanilla JavaScript."
+++

Jeg har lige implementeret en lille RAG-chatbot på mit portfolio. Her er hvordan jeg gjorde det.

## Hvad er RAG?

**RAG (Retrieval-Augmented Generation)** betyder at chatbotten kan svare baseret på indhold fra dit eget site - i stedet for kun at bruge sin træningsdata. Det gør svarene meget mere relevante.

## Arkitektur

Jeg brugte tre dele:

1. **Frontend**: Vanilla JavaScript + CSS (floating widget i hjørne) på GitHub Pages
2. **Backend**: Vercel API (sikrer API-nøgler)
3. **AI**: Dify Knowledge Base (håndterer RAG + svar-generering)

##How-to

### 1. Opret Knowledge Base i Dify

I Dify dashboard:
- Opret en ny **Knowledge Base**
- Aktivér **Web Crawler** og peg på dit portfolio
- Dify indekserer automatisk alle dine posts/projekter

### 2. Vercel API for proxy

Opret `api/chat.js` på Vercel:

```javascript
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { message } = req.body;
  const apiKey = process.env.DIFY_API_KEY;
  
  const response = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: {},
      query: message,
      conversation_id: '',
      user: 'visitor'
    })
  });
  
  const data = await response.json();
  return res.status(200).json({ answer: data.answer });
};
```

### 3. Frontend chatbot

I `static/js/chatbot.js`:

```javascript
async function sendToDify(message) {
  const response = await fetch('https://portfolio-jet-rho-19.vercel.app/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return data.answer;
}
```

(Erstat Vercel URL med din egen)

### 4. Miljøvariabler på Vercel

1. Gå til Vercel dashboard → dit projekt → Settings → Environment Variables
2. Tilføj:
   - **Name:** `DIFY_API_KEY`
   - **Value:** din Dify API key
3. Redeploy

## Vigtigste lessons

- **Sikkerhed først**: Hold API-nøgler på backend (Vercel), aldrig i browser
- **RAG er powerful**: Brugeren får svar baseret på *dit* indhold
- **Vercel API**: Super simpelt for serverless backend
- **Dify Knowledge Base**: Auto-indeksering af dit site

Det er det! En simpel, sikker, AI-drevet chatbot på få timers arbejde.
