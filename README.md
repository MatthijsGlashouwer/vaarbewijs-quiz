# Vaarbewijs Quiz App

Een interactieve quiz-applicatie voor het oefenen van het Klein Vaarbewijs 1 examen.

## Functies

- Interactieve quiz met 25 vragen
- Timer die de 45 minuten examenduur simuleert
- Voortgangsindicator om te zien hoeveel vragen al beantwoord zijn
- Gedetailleerde resultaten per categorie
- Mogelijkheid om antwoorden te bekijken en te leren van fouten
- Responsive design voor desktop en mobiel gebruik

## Technologie

Deze applicatie is gebouwd met:

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Statisch getypeerde JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

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

## Deployen naar Vercel

De eenvoudigste manier om deze app te deployen is met [Vercel](https://vercel.com), het platform van de makers van Next.js.

1. Push je code naar een Git repository (GitHub, GitLab, BitBucket)
2. Importeer het project in Vercel: [https://vercel.com/new](https://vercel.com/new)
3. Vercel detecteert automatisch dat het een Next.js app is en stelt de juiste configuratie in
4. Klik op "Deploy" en je app is live!

## Doorontwikkelen

Ideeën voor uitbreidingen:

- Meerdere examens toevoegen
- Optie voor Klein Vaarbewijs 2 vragen
- Voortgang opslaan (met localStorage)
- Examenmode vs. oefenmode
- Afbeeldingen toevoegen bij relevante vragen

## Licentie

Dit project is open-source software.
