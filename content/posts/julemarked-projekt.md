---
title: "Julemarked-projektet: booking, overblik og et scope der kan nås"
date: 2026-05-20
draft: false

tags: ["Webudvikling", "Systemdesign", "Studie", "AI"]
categories: ["Studie"]

summary: "Jeg skriver om vores julemarked-projekt, hvad problemet er, hvilke teknologier jeg overvejer, og hvordan jeg prøver at holde scope lille nok til, at vi faktisk kan få noget brugbart bygget."
---

# Julemarked-projektet: booking, overblik og et scope der kan nås

I min gruppe vil jeg kaste mig over et projekt, der handler om at gøre tilmelding og administration af stadepladser på et julemarked mere overskueligt.

Udgangspunktet er ret jordnært: i dag virker meget af processen til at foregå gennem e-mailkorrespondance og manuelle noter. Det fungerer nok i praksis, men det gør også, at information let kan blive spredt ud over flere steder, og at én person ender med at sidde med det meste af overblikket.

## Hvad problemet er

Det konkrete problem er, at tilmeldinger, ønsker til placering og overblik over stadeholdere ikke er samlet ét sted.

Det betyder, at det kan være svært at:

- holde styr på hvem der har tilmeldt sig
- se hvilke stande der er ledige
- samle ønsker til placering
- give Lise et hurtigt administrativt overblik
- gøre processen mere ens for både stadeholdere og arrangør

For mig er det interessant, fordi det er et klassisk eksempel på et lille system, der kan gøre en stor forskel, hvis det rammer hverdagen rigtigt.

## Hvad vi vil bygge

Jeg ser projektet som en enkel løsning med to primære dele:

1. En offentlig side, hvor stadeholdere kan tilmelde sig og sende deres ønsker
2. En admin-side, hvor arrangøren kan se tilmeldingerne, følge status og få overblik over pladserne

Derudover giver det mening at gemme data i en database, så man ikke mister overblikket, når der kommer flere tilmeldinger.

Jeg synes især, at det vigtige er at gøre løsningen praktisk. Det behøver ikke være stort for at være nyttigt.

## Mit MVP-scope

Hvis vi vil have noget, der faktisk kan nås, synes jeg MVP’en skal være meget stramt defineret.

Det vigtigste er:

- en bookingformular til stadeholdere
- en adminvisning til overblik over tilmeldinger
- et simpelt datasæt med navn, kontaktoplysninger, ønsker og status
- en måde at se, om en plads er optaget eller ej

Det, jeg bevidst ville vente med, er:

- login-system
- betalingsløsning
- avanceret sikkerhed
- komplekse workflows
- fuldautomatisk pladsfordeling

Den slags kan hurtigt gøre et lille projekt tungt, før vi overhovedet har bevist, at kerneideen virker.

## Overvejelser om teknologi

Jeg prøver at vælge teknologi ud fra, hvad der hjælper os hurtigst fra idé til fungerende prototype.

### Frontend

Til frontend ville jeg gå efter noget, der er hurtigt at bygge admin-flader og formularer i.

Det vigtigste for mig er ikke at vælge den mest fancy løsning, men en løsning hvor vi kan:

- bygge hurtigt
- holde koden overskuelig
- lave gode UI-komponenter til både formular og administration
- iterere uden at skulle omskrive alt for meget

Jeg hælder derfor mod en moderne JavaScript-stack, hvor vi kan bygge både public side og admin-flade i samme projekt, frem for at splitte det op i flere tunge løsninger.

### Database

Her hælder jeg mod Supabase eller noget tilsvarende, fordi det giver et relativt simpelt setup til:

- lagring af data
- tabeller og relationer
- hurtig prototyping
- senere mulighed for at udvide, hvis projektet vokser

Det passer godt til et projekt, hvor vi har brug for strukturerede data, men ikke nødvendigvis et tungt backend-setup fra dag ét.

### Backend

Backend-delen behøver ikke være stor, men den skal være tydelig.

Jeg ser den primært som et lag, der:

- modtager formular-data
- gemmer tilmeldinger
- henter data til admin-siden
- sørger for, at data er i et format, vi kan arbejde videre med

Hvis vi kan holde backend enkel, bliver det også lettere at forstå projektet som helhed.

## Hvor AI kan hjælpe

Jeg vil gerne bruge AI som en hjælp i processen, men ikke som den, der bestemmer løsningen.

Det jeg især kan se AI bruges til, er:

- at hjælpe med kodegenerering af gentagne dele
- at strukturere vores idéer til mere konkrete opgaver
- at foreslå datamodeller og edge cases
- at hjælpe os med test og små forbedringer

For mig er det vigtigt, at AI understøtter vores arbejde, men ikke gør os passive. Vi skal stadig forstå det, vi bygger.

## Hvorfor scope er så vigtigt

Det største læringspunkt for mig i sådan et projekt er næsten altid scope.

Det er fristende at bygge "bare lige" lidt ekstra:

- bedre sortering
- mere elegant pladsfordeling
- automatisk e-mailflow
- login for forskellige brugerroller
- statistik og dashboards

Men hvis vi lægger for meget ovenpå, risikerer vi at ende med et projekt, der virker ambitiøst på papiret, men ikke bliver færdigt i praksis.

Jeg vil derfor hellere have et lille projekt, der fungerer ordentligt, end et stort projekt med mange idéer og halvt færdige dele.

## Mine vigtigste overvejelser

Det, jeg især tager med mig ind i projektet, er:

- at løsningen skal passe til den måde, folk allerede arbejder på
- at vi skal prioritere den vigtigste brugerrejse først
- at teknologien skal understøtte enkelhed, ikke skabe mere kompleksitet
- at data skal være nemt at overskue og nemt at opdatere

Hvis vi rammer rigtigt, kan projektet blive et lille men meget brugbart værktøj.

## Refleksion

Jeg kan godt lide projekter som det her, fordi de ligger tæt på virkeligheden.

Det handler ikke bare om at bygge en funktion, men om at forstå en konkret arbejdsgang og finde ud af, hvor digitalisering faktisk giver mening. For mig er det netop dér, webudvikling bliver mest interessant: når teknologien ikke bare er et mål i sig selv, men et værktøj til at gøre noget virkeligt lettere.

## Næste skridt

De næste skridt for mig er at få mere afklaret:

- hvilke oplysninger vi præcist skal samle
- hvordan admin-siden skal se ud
- hvordan data skal gemmes
- hvad vi helt konkret vil nå i første version

Når det er på plads, bliver det meget lettere at bygge noget, der både er realistisk og brugbart.
