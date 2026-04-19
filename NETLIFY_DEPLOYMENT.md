# Netlify Deployment Guide

## Setup Dify Chatbot med Netlify Functions

Denne guide viser hvordan du deployer chatbotten sikkert med Netlify.

## Før du starter

1. Du skal have en **Netlify account** (gratis på netlify.com)
2. Din portfolio skal være på **GitHub**
3. Du skal have din **Dify API key**

## Step 1: Forbind GitHub med Netlify

1. Gå til [netlify.com](https://netlify.com)
2. Klik "Add new site" → "Import an existing project"
3. Vælg GitHub
4. Vælg din portfolio repository
5. Klik "Deploy"

## Step 2: Sæt Environment Variables

**Lokalt (for udvikling):**

1. Kopier `.env.example` til `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Åbn `.env.local` og tilføj dine værdier:
   ```
   DIFY_API_KEY=app-din-api-key
   DIFY_API_URL=https://api.dify.ai/v1
   ```

3. **VIGTIG:** `.env.local` er i `.gitignore` - den bliver IKKE uploaded til GitHub!

**På Netlify (for produktion):**

1. Gå til Netlify dashboard
2. Vælg dit site
3. Gå til "Site settings" → "Build & deploy" → "Environment"
4. Klik "Edit variables"
5. Tilføj samme variabler:
   - `DIFY_API_KEY` = din API key
   - `DIFY_API_URL` = https://api.dify.ai/v1

## Step 3: Test lokalt

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Eller med Homebrew
brew install netlify-cli

# Test lokalt
netlify dev
```

Server starter på http://localhost:8888

## Step 4: Deploy til produktion

Når du pusher til GitHub, deployer Netlify automatisk:

```bash
git add .
git commit -m "Add Netlify Functions for Dify chatbot"
git push origin main
```

Netlify bygger automatisk og deployer dit site!

## Hvad sker der når du chatter?

```
1. Bruger skriver spørgsmål i chatbot
   ↓
2. Frontend sender til /.netlify/functions/chat
   ↓
3. Netlify Function henter API key fra environment
   ↓
4. Function sender request til Dify (API key skjult!)
   ↓
5. Dify svarer
   ↓
6. Svar sendes tilbage til frontend
```

**API key er aldrig eksponeret i browserens Network tab!** ✅

## Fejlfinding

**Chatbot viser fejl?**
- Tjek Netlify Function logs: Site → Functions → chat
- Sørg for at `.env.local` eksisterer lokalt
- Sørg for at variables er sat på Netlify dashboard

**Hvad hvis Dify ikke svarer?**
- Tjek at din Dify Knowledge Base har dokumenter
- Prøv at crawle dit site igen i Dify dashboard

## Sikkerhed Checklist

✅ API key er i `.env.local` (ikke i Git)
✅ API key er på Netlify dashboard som secret variable
✅ Frontend sender kun til Netlify Function (ikke direkte til Dify)
✅ Function handler authorization

## Næste steps

1. Opsæt Dify Web Crawler til at crawle dit site automatisk
2. Tilføj flere dokumenter til Knowledge Base
3. Test chatbotten på produktion

---

**Spørgsmål?** Se Netlify docs eller Dify docs.
