---
title: "Arbejde med kodeagenter i VS Code - Mine første erfaringer"
date: 2026-04-24
draft: false

tags: ["AI", "Udvikling", "VS Code", "Tooling"]
categories: ["Udvikling"]

summary: "Jeg har eksperimenteret med AI-drevne kodeagenter i VS Code og været overrasket over hvor produktive de gør min workflow. Her deler jeg mine første erfaringer og hvad jeg har lært."
---

# Arbejde med kodeagenter i VS Code - Mine første erfaringer

Efter at have brugt GitHub Copilot og AI-assistenter intensivt i VS Code de seneste uger, vil jeg dele nogle tanker om hvordan de har påvirket min udvikling.

## Hvad er en kodeagent?

En kodeagent er en AI-model, der kan arbejde autonomt på kodeopgaver. I modsætning til traditionel autocomplete eller simple code snippets, kan agenter:

- Læse og analysere eksisterende kode
- Lave større refactoriseringer
- Oprette nye filer og mapper
- Søge i hele projektet for kontekst
- Løse komplekse problemer selv

For mig har det været som at have en erfaren co-worker, der aldrig er træt og kan søge i dokumentation på millisekunder.

## Mine første oplevelser

### Automatisering af repetitivt arbejde

Da jeg skulle dokumentere mit chatbot-projekt, skulle jeg skrive en omfattende checklist. I stedet for at gøre det manuelt, gav jeg agenten nogle instrukser, og den strukturerede og fyldte alt ind baseret på mit projekt. Det ville have taget mig timer at gøre manuelt.

```
Min request: "Opret en detaljeret implementeringschecklist for chatbot-komponenten"
Agent-output: 20+ punkter struktureret i kategorier med alle relevante detaljer
Tid sparet: ~2 timer
```

### Multi-fil refactorering

Jeg skulle ændre naming convention i hele min codebase. Agenten kunne:

1. Søge efter alle relevante filer med grep
2. Forstå konteksten i hver fil
3. Lave præcise ændringer uden at ødelægge noget
4. Validere at ændringerne var konsistente

Det ville have været meget fejlpronent at gøre manuelt.

### Problembeskrivelse til løsning

Det bedste ved agenter er evnen til at gå fra problem til løsning uden konstant intervention. Jeg kan nu sige:

> "Jeg skal have en ny feature som gør X. Her er min arkitektur. Lav det der skal til."

Og agenten:
- Læser eksisterende struktur
- Finder relevante eksempler
- Implementerer konsistent med projektet
- Laver tests hvis nødvendigt

## Hvad jeg har lært

### 1. Kontekst er alt
Jo bedre jeg beskriver mit projekt (via instructions, readme, arkitektur), jo bedre fungerer agenten. Jeg har brugt tid på at skrive klare instruktioner i `.github/copilot-instructions.md` og det har gjort en massiv forskel.

### 2. Det kræver stadig menneskelige beslutninger
Agenten kan implementere, men kan ikke altid bestemme design-valg. Spørgsmål som "Skal vi bruge denne tilgang eller den anden?" kræver stadig menneskelig input.

### 3. Review er vigtig
Jeg kan ikke bare blindt acceptere al kode. Jeg skal:
- Review hvad agenten lavede
- Teste gründigt
- Sikre mig at det passer til min vision

Men selv med review går det meget hurtigere end at skrive alt selv.

### 4. Iterativ feedback virker godt
Agenten er ikke perfekt første gang. Jeg giver feedback:

> "Jeg vil gerne have at X se ud sådan her i stedet"

Og den justerer. Det er meget hurtigere end at rette selv.

## Praktiske tips jeg har lært

1. **Skriv gode instrukser**: Min `.github/copilot-instructions.md` har været game-changer
2. **Brug den til søgning**: Agenten kan søge i hele projektet for at finde relevante eksempler
3. **Lav små opgaver**: "Refaktor denne funktion" virker bedre end "Refaktor hele systemet"
4. **Dokumenter dine mønstre**: Jo mere jeg dokumenterer mine konventioner, jo bedre output
5. **Brug til strukturering**: Den er fantastisk til at organisere tanker til kode

## Udfordringer jeg har mødt

### Over-automation
Jeg skal være påpasselig med ikke at acceptere kode bare fordi det virker. Jeg skal forstå hvad den gør.

### Context overflow
Store projekter kan være svære at få agenten til at forstå helt. Jeg må nogle gange manuelt fremhæve den vigtige kontekst.

### Hallucinations
Nogle gange genererer agenten selv "falske" løsninger baseret på mønstre uden at det faktisk virker. Review er vigtig.

## Hvor har det hjulpet mest?

- **Dokumentation**: Hurtigere at få struktureret tekst
- **Boilerplate**: Repetitivt setup-kode
- **Testing**: Kan generere test-cases hurtigt
- **Refactoring**: Konsistente ændringer på tværs af filer
- **Debugging**: Kan analysere error-logs og lave hypoteser

## Hvor virker det mindre godt?

- **Kompleks algoritmer**: Kræver stadig menneskelig ræsonnering
- **Design-beslutninger**: Kan ikke tage arkitektur-valg
- **Domain-specific logik**: Hvis det er meget specielt for min branche

## Min vurdering

Kodeagenter har drastisk påvirket min produktivitet - jeg estimerer omkring **30-40% hurtigere udvikling** på repetitivt arbejde. Men det er ikke en erstatning for at tænke - det er et værktøj til at gøre det mindre kedelig.

Det bedste mindset er:

> "Agenten er min udvikler-assistent, ikke min erstatning."

Jeg bruger den til at håndtere de dele, der er mindre interessante, så jeg kan fokusere på design, problemløsning og at få den ultimative vision til at blive virkelighed.