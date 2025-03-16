# Vaarbewijs Quiz - Deployment Instructies

Deze instructies helpen je om de Vaarbewijs Quiz app te deployen op Vercel.

## Waarom Vercel?

Vercel is een cloud platform dat geoptimaliseerd is voor frontend frameworks zoals Next.js. Het biedt:
- Eenvoudige deployment via Git
- Automatische build en preview voor elke commit
- Gratis hosting voor persoonlijke projecten
- Geoptimaliseerde global CDN
- Ingebouwde analytics

## Stap 1: Maak een Vercel account

Ga naar [vercel.com](https://vercel.com) en maak een account aan. Je kunt inloggen met:
- GitHub
- GitLab
- BitBucket
- Of een email + wachtwoord

## Stap 2: Push code naar een Git repository

Zorg ervoor dat je je code in een Git repository hebt:

```bash
# Init Git repository (als dit nog niet gedaan is)
git init

# Voeg alle bestanden toe
git add .

# Commit de bestanden
git commit -m "Initial commit"

# Voeg een remote toe (bijvoorbeeld GitHub)
git remote add origin git@github.com:username/vaarbewijs-quiz.git

# Push de code
git push -u origin main
```

## Stap 3: Import je project in Vercel

1. Log in op [vercel.com](https://vercel.com)
2. Klik op "Add New..." en kies "Project"
3. Connect je Git provider en selecteer de repository
4. Vercel detecteert automatisch dat het een Next.js project is

## Stap 4: Configureer deployment settings

Bij de importeerstap kun je enkele instellingen aanpassen:
- **Project Name**: Kies een unieke naam (bijvoorbeeld "vaarbewijs-quiz")
- **Framework Preset**: Next.js (automatisch gedetecteerd)
- **Root Directory**: ./ (standaard)
- **Build Command**: npm run build (standaard)
- **Output Directory**: .next (standaard)
- **Install Command**: npm install (standaard)

## Stap 5: Deploy

Klik op "Deploy" en Vercel zal:
1. Je repository clonen
2. De dependencies installeren
3. De applicatie bouwen
4. De app deployen naar hun global CDN

## Stap 6: Domein configureren (optioneel)

Na deployment kun je:
1. Een custom domein toevoegen via de "Domains" tab
2. De gratis vercel.app subdomain gebruiken (bijvoorbeeld: vaarbewijs-quiz.vercel.app)

## Automatische Deployments

Telkens wanneer je nieuwe code pushed naar je repository, zal Vercel automatisch:
1. Een nieuwe deployment starten
2. Een preview link genereren voor die specifieke commit
3. De main branch automatisch naar productie deployen

## Omgevingsvariabelen (optioneel)

Als je later omgevingsvariabelen nodig hebt:
1. Ga naar "Settings" > "Environment Variables"
2. Voeg je variabelen toe
3. Bepaal per variabele of deze beschikbaar is in Development, Preview en/of Production

## Vercel CLI (optioneel)

Je kunt ook de Vercel CLI gebruiken voor lokale ontwikkeling en deployment:

```bash
# Installeren
npm i -g vercel

# Inloggen
vercel login

# Lokaal ontwikkelen met productie omgevingsvariabelen
vercel dev

# Deployen naar preview
vercel

# Deployen naar productie
vercel --prod
``` 