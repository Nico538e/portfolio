---
title: "Mit forsøg på LLM API-opgaven med rubric og AI-vurdering"
date: 2026-04-27
draft: false

tags: ["AI", "LLM", "API", "Webudvikling", "Studie"]
categories: ["Udvikling"]

summary: "Jeg byggede et forsøg på opgaven om at lave en AI-drevet vurderingsapp, hvor en rubric og et LLM-API bruges til at give en vejledende evaluering af en opgave."
---

# Mit forsøg på LLM API-opgaven med rubric og AI-vurdering

Til denne opgave skulle jeg bygge en lille AI-drevet applikation, som kan give en første vurdering af en opgave ud fra en rubric og et kald til et eksternt LLM-API.

Det var en god øvelse, fordi opgaven ikke bare handlede om at få en model til at svare. Den handlede også om at designe et lille system, hvor promptdesign, backend og struktureret output spiller sammen.

## Hvad opgaven gik ud på

Opgaven beskriver, at man skal:

- udlede en rubric fra et vurderingsoplæg
- lave en systemprompt og en userprompt
- bygge en backend, der kalder et LLM-API
- returnere struktureret feedback
- teste løsningen på en eksempelopgave

Jeg tog udgangspunkt i de krav og byggede en løsning, hvor vurderingen bliver præsenteret som vejledende, ikke som en “sand” bedømmelse.

## Min tilgang

Jeg prøvede at holde løsningen enkel og tydelig:

1. Først omsatte jeg kravene til en rubric med klare kriterier
2. Derefter formulerede jeg prompts, så modellen fik en tydelig rolle
3. Så byggede jeg en backend, der sender opgavetekst og rubric videre til modellen
4. Til sidst fik jeg svaret tilbage som struktureret feedback

Det vigtigste for mig var at gøre resultatet brugbart og let at læse, så man hurtigt kan se styrker, svagheder og forbedringsforslag.

## Rubric

Rubricen er kernen i løsningen.

I stedet for at bede modellen om at “vurdere frit”, prøvede jeg at gøre kriterierne mere konkrete, så vurderingen tager udgangspunkt i noget stabilt og gentageligt.

Det gør to ting bedre:

- det bliver tydeligere, hvad modellen skal kigge efter
- det bliver nemmere at sammenligne vurderinger på tværs af opgaver

## Promptdesign

Jeg brugte prompten til at styre modellen mod et mere struktureret svar.

Det var især vigtigt for mig at:

- fortælle modellen, at den skal være vejledende
- holde den tæt på rubricen
- bede om et output, der er nemt at bruge videre i applikationen

Det er også her, jeg syntes opgaven blev interessant. Små ændringer i prompten kan gøre en stor forskel på, hvor brugbar vurderingen bliver.

## Backend og API-kald

Backenden fungerer som bindeled mellem brugerens input og LLM’et.

Jeg brugte den til at:

- modtage opgaveteksten
- samle data til requesten
- sende kaldet til API’et
- håndtere svaret
- returnere et struktureret resultat

Det var en god påmindelse om, at AI-funktioner i praksis ofte handler lige så meget om dataflow og format som om selve modellen.

## Resultat

Jeg fik bygget og deployet løsningen på Render:

- [https://praktikvurderingapp.onrender.com](https://praktikvurderingapp.onrender.com)

Det gjorde det nemt at teste appen som et rigtigt lille produkt i stedet for kun som en lokal prototype.

## Det jeg lærte

Det vigtigste jeg tog med mig fra opgaven var:

- en god rubric gør modellen mere målrettet
- promptdesign har stor betydning for kvaliteten af svaret
- struktureret output er meget mere brugbart end en løs tekstblok
- AI bør bruges som støtte, ikke som facit

Jeg fik også en bedre forståelse for, hvordan man kan bygge en løsning, hvor en sprogmodel indgår som en del af et større system i stedet for at stå alene.

## Refleksion

En af de store ting ved opgaven er, at man bliver tvunget til at tænke kritisk over AI.

En model kan være god til at samle, formulere og strukturere feedback, men den kan stadig tage fejl eller overvurdere noget. Derfor er det vigtigt, at løsningen tydeligt bliver præsenteret som en vejledende vurdering.

Det er efter min mening også det mest realistiske ved at arbejde med LLM API’er: man skal designe systemet, så modellen bliver nyttig, men stadig kontrolleret.

## Næste skridt

Hvis jeg skulle videreudvikle løsningen, ville jeg overveje:

- bedre fejlhåndtering ved API-fejl og timeout
- en frontend, hvor man kan indsætte opgaver mere elegant
- mulighed for at sammenligne flere forskellige rubrics
- gemme tidligere vurderinger, så man kan se udvikling over tid

Alt i alt var det en rigtig god opgave, fordi den kombinerede AI, backend og refleksion på en måde, der føles meget tæt på noget, man kunne bygge i praksis.
