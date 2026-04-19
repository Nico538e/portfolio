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

1. **Frontend**: Vanilla JavaScript + CSS (floating widget i hjørne)
2. **Backend**: Netlify Functions (sikrer API-nøgler)
3. **AI**: Dify (håndterer RAG + svar-generering)

##How-to

### 1. Opret Knowledge Base i Dify

I Dify dashboard:
- Opret en ny **Knowledge Base**
- Aktivér **Web Crawler** og peg på dit portfolio
- Dify indekserer automatisk alle dine posts/projekter

### 2. Netlify Function for API

Opret `netlify/functions/chat.js`:

```javascript
exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
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
  return {
    statusCode: 200,
    body: JSON.stringify({ answer: data.answer })
  };
};
```

### 3. Frontend chatbot

I `static/js/chatbot.js`:

```javascript
async function sendToDify(message) {
  const response = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return data.answer;
}
```

### 4. Miljøvariabler

**Lokalt** (`.env.local`):
```
DIFY_API_KEY=app-din-api-nøgle-her
DIFY_API_URL=https://api.dify.ai/v1
```

**På Netlify**: Sæt samme variabler i dashboard → Site settings → Build & deploy → Environment

## Vigtigste lessons

- **Sikkerhed først**: Hold API-nøgler på backend, aldrig i browser
- **RAG er powerful**: Brugeren får svar baseret på *dit* indhold
- **Netlify Functions**: Super simpelt for serverless backend
- **Dify er let**: Kræver næsten ingen konfiguration

Det er det! En simpel, sikker, AI-drevet chatbot på få timers arbejde.
