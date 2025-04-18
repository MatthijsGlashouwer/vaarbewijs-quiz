# Vaarbewijs Quiz App

Een interactieve quiz-applicatie voor het oefenen van het Klein Vaarbewijs 1 examen.

## Functies

- Interactieve quiz met 25 vragen
- Visuele illustraties bij relevante vragen om begrip te verbeteren
- Geanimeerde SVG-visualisaties voor betere uitleg van vaarregels en navigatie
- Timer die de 45 minuten examenduur simuleert
- Automatisch opslaan van voortgang (je kunt de quiz later hervatten)
- Voortgangsindicator om te zien hoeveel vragen al beantwoord zijn
- Gedetailleerde resultaten per categorie
- Mogelijkheid om antwoorden te bekijken en te leren van fouten
- Responsive design voor desktop en mobiel gebruik

## Technologie

Deze applicatie is gebouwd met:

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Statisch getypeerde JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Interactieve SVG-animaties voor dynamische visualisaties
- LocalStorage API voor het bewaren van voortgang

## Lokaal starten

Om de applicatie lokaal te draaien:

```bash
# Installeer dependencies
npm install
# of
yarn install
# of
bun install

# Start de ontwikkelserver
npm run dev
# of 
yarn dev
# of
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser om de applicatie te zien.

## Voortgang opslaan

De app slaat automatisch je voortgang op in de browser's localStorage. Dit betekent dat:

- Je kunt de browser sluiten en later terugkomen om verder te gaan
- Je voortgang bewaard blijft zelfs als de pagina wordt vernieuwd
- Je quiz-antwoorden, timer en huidige vraag worden onthouden
- Je kunt kiezen of je een nieuwe quiz wilt starten of doorgaan met je vorige sessie
- Er een optie is om je voortgang handmatig te wissen

Je voortgang wordt alleen opgeslagen op het apparaat dat je gebruikt. Als je een ander apparaat of browser gebruikt, begin je met een nieuwe quiz.

## Afbeeldingen toevoegen

De app ondersteunt afbeeldingen bij vragen om het leren te bevorderen. Om nieuwe afbeeldingen toe te voegen:

1. Plaats de afbeeldingen in de `public/images` map
2. Voeg het image-object toe aan de vraag in `src/app/data/questions.ts`:

```typescript
{
  // andere vraag-eigenschappen
  image: {
    src: "/images/jouw-afbeelding.svg", // of .jpg, .png
    alt: "Beschrijvende alt-tekst voor toegankelijkheid",
    width: 400, // optioneel
    height: 300 // optioneel
  }
}
```

## Animaties gebruiken

De app ondersteunt SVG-animaties om complexe vaarsituaties beter te visualiseren:

1. Maak een SVG-bestand met specifieke CSS klassen voor animatie:
   - Gebruik `class="vessel"` of `class="ship"` voor scheepsbewegingen
   - Gebruik `class="signal"` of `class="light"` voor knipperende signalen
   - Gebruik `class="water"` of `class="wave"` voor wateranimaties

2. Plaats het SVG-bestand in de `public/images` map

3. Voeg het toe aan een vraag zoals je met andere afbeeldingen zou doen

De animaties worden automatisch gedetecteerd en toegepast op basis van het bestandstype en de inhoud. Gebruikers kunnen animaties pauzeren en hervatten met de knop in de hoek van de afbeelding.

```typescript
// Voorbeeld van een animatie in een vraag
{
  // andere vraag-eigenschappen
  image: {
    src: "/images/animated-vessel-crossing.svg",
    alt: "Animatie van twee schepen die elkaar kruisen",
    width: 500,
    height: 400
  }
}
```

## Deployen naar Vercel

De eenvoudigste manier om deze app te deployen is met [Vercel](https://vercel.com), het platform van de makers van Next.js.

1. Push je code naar een Git repository (GitHub, GitLab, BitBucket)
2. Importeer het project in Vercel: [https://vercel.com/new](https://vercel.com/new)
3. Vercel detecteert automatisch dat het een Next.js app is en stelt de juiste configuratie in
4. Klik op "Deploy" en je app is live!

## Doorontwikkelen

Ideeën voor uitbreidingen:

- ✅ Afbeeldingen toevoegen bij relevante vragen
- ✅ Voortgang opslaan (met localStorage)
- ✅ Animaties toevoegen voor betere visualisaties
- Meerdere examens toevoegen
- Optie voor Klein Vaarbewijs 2 vragen
- Examenmode vs. oefenmode

## Licentie

Dit project is open-source software.
