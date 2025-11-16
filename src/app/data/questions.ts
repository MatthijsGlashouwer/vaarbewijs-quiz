export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  category: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Welke vaarweg heeft voorrang in een situatie waar twee vaarwegen samenkomen?",
    options: [
      { id: "a", text: "De vaarweg die van rechts komt" },
      { id: "b", text: "De vaarweg die van links komt" },
      { id: "c", text: "De hoofdvaarweg heeft voorrang" },
      { id: "d", text: "De vaarweg met de meeste schepen" }
    ],
    correctOptionId: "c",
    explanation: "De hoofdvaarweg heeft voorrang - dit is een basisregel in het BPR.",
    category: "Navigatie en Vaarregels",
    image: {
      src: "/images/hoofdvaarweg.svg",
      alt: "Kruising van hoofdvaarweg met nevenvaarweg",
      width: 400,
      height: 300
    }
  },
  {
    id: 2,
    text: "Wat betekent het volgende teken bij een brug?",
    options: [
      { id: "a", text: "Doorvaart verboden" },
      { id: "b", text: "Doorvaart toegestaan" },
      { id: "c", text: "Brug in storing" },
      { id: "d", text: "Doorvaart binnen 30 minuten mogelijk" }
    ],
    correctOptionId: "a",
    explanation: "Doorvaart verboden - een rood licht betekent dat doorvaart verboden is.",
    category: "Navigatie en Vaarregels",
    image: {
      src: "/images/doorvaart-verboden.svg",
      alt: "Rood licht bij een brug",
      width: 400,
      height: 300
    }
  },
  {
    id: 3,
    text: "Welke uitspraak over het Binnenvaartpolitiereglement (BPR) is juist?",
    options: [
      { id: "a", text: "Het BPR geldt alleen voor beroepsvaart" },
      { id: "b", text: "Het BPR geldt op alle binnenwateren in Nederland" },
      { id: "c", text: "Het BPR geldt alleen op de Waddenzee" },
      { id: "d", text: "Het BPR geldt alleen als er geen andere reglementen van toepassing zijn" }
    ],
    correctOptionId: "b",
    explanation: "Het BPR geldt op alle binnenwateren in Nederland, tenzij anders vermeld.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 4,
    text: "Wat is de maximumsnelheid op de meeste binnenwateren in Nederland?",
    options: [
      { id: "a", text: "6 km/u" },
      { id: "b", text: "9 km/u" },
      { id: "c", text: "12 km/u" },
      { id: "d", text: "20 km/u" }
    ],
    correctOptionId: "c",
    explanation: "12 km/u is de maximumsnelheid op de meeste binnenwateren, maar dit kan variëren.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 5,
    text: "Wat betekent een blauw bord met wit knipperlicht op een schip?",
    options: [
      { id: "a", text: "Ik wil aan stuurboordwal passeren" },
      { id: "b", text: "Ik wil aan bakboordwal passeren" },
      { id: "c", text: "Ik ben onmanoeuvreerbaar" },
      { id: "d", text: "Ik heb voorrang" }
    ],
    correctOptionId: "b",
    explanation: "Het blauwe bord geeft aan dat het schip aan bakboordwal wil passeren.",
    category: "Navigatie en Vaarregels",
    image: {
      src: "/images/blauw-bord.svg",
      alt: "Blauw bord met wit knipperlicht op een schip",
      width: 400,
      height: 300
    }
  },
  {
    id: 6,
    text: "Welke regel geldt voor het varen bij slecht zicht?",
    options: [
      { id: "a", text: "Vaart minderen en goed uitkijken" },
      { id: "b", text: "Verplicht radar gebruiken" },
      { id: "c", text: "Verplicht marifoon gebruiken" },
      { id: "d", text: "Verplicht voor anker gaan" }
    ],
    correctOptionId: "a",
    explanation: "Bij slecht zicht moet men vaart minderen en goed uitkijken.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 7,
    text: "Wie is verantwoordelijk voor de veiligheid aan boord van een pleziervaartuig?",
    options: [
      { id: "a", text: "De schipper" },
      { id: "b", text: "De eigenaar van het vaartuig" },
      { id: "c", text: "De oudste persoon aan boord" },
      { id: "d", text: "Iedereen aan boord" }
    ],
    correctOptionId: "a",
    explanation: "De schipper is altijd verantwoordelijk voor de veiligheid aan boord.",
    category: "Wetgeving en Verantwoordelijkheden"
  },
  {
    id: 8,
    text: "Wanneer is het verplicht om een reddingsvest te dragen op een pleziervaartuig?",
    options: [
      { id: "a", text: "Altijd" },
      { id: "b", text: "Alleen bij slecht weer" },
      { id: "c", text: "Alleen bij een watertemperatuur onder 15°C" },
      { id: "d", text: "Er is geen wettelijke verplichting, maar het wordt wel aanbevolen" }
    ],
    correctOptionId: "d",
    explanation: "Er is geen wettelijke verplichting, maar het wordt sterk aanbevolen.",
    category: "Wetgeving en Verantwoordelijkheden"
  },
  {
    id: 9,
    text: "Voor welk type vaartuig is een Klein Vaarbewijs 1 verplicht?",
    options: [
      { id: "a", text: "Voor alle pleziervaartuigen" },
      { id: "b", text: "Voor pleziervaartuigen langer dan 15 meter" },
      { id: "c", text: "Voor pleziervaartuigen sneller dan 20 km/u of langer dan 15 meter" },
      { id: "d", text: "Voor alle motorboten" }
    ],
    correctOptionId: "c",
    explanation: "Een Klein Vaarbewijs 1 is verplicht voor pleziervaartuigen sneller dan 20 km/u of langer dan 15 meter.",
    category: "Wetgeving en Verantwoordelijkheden"
  },
  {
    id: 10,
    text: "Welke documenten moet u als schipper van een pleziervaartuig bij u hebben?",
    options: [
      { id: "a", text: "Vaarbewijs, identiteitsbewijs en verzekeringsbewijs" },
      { id: "b", text: "Alleen het vaarbewijs" },
      { id: "c", text: "Vaarbewijs en een bewijs van eigendom" },
      { id: "d", text: "Vaarbewijs en identiteitsbewijs" }
    ],
    correctOptionId: "a",
    explanation: "Vaarbewijs, identiteitsbewijs en verzekeringsbewijs zijn verplicht.",
    category: "Wetgeving en Verantwoordelijkheden"
  },
  {
    id: 11,
    text: "Wat is de belangrijkste maatregel om brand aan boord te voorkomen?",
    options: [
      { id: "a", text: "Een goede ventilatie van de motorruimte" },
      { id: "b", text: "Regelmatig controleren van brandblusmiddelen" },
      { id: "c", text: "Een rookmelder installeren" },
      { id: "d", text: "Regelmatig de brandstoftank vullen" }
    ],
    correctOptionId: "a",
    explanation: "Goede ventilatie van de motorruimte is essentieel om brand te voorkomen.",
    category: "Veiligheid op het Water"
  },
  {
    id: 12,
    text: "Wat doet u als eerste bij een man-overboord situatie?",
    options: [
      { id: "a", text: "Onmiddellijk keren en terugvaren" },
      { id: "b", text: "Alarm slaan, snelheid minderen en de drenkeling in het oog houden" },
      { id: "c", text: "Reddingsvest toewerpen" },
      { id: "d", text: "Motor uitzetten" }
    ],
    correctOptionId: "b",
    explanation: "Bij man-overboord: alarm slaan, snelheid minderen en de drenkeling in het oog houden.",
    category: "Veiligheid op het Water"
  },
  {
    id: 13,
    text: "Hoe vaak moet u de gasinstallatie aan boord laten controleren?",
    options: [
      { id: "a", text: "Elke maand" },
      { id: "b", text: "Elk jaar" },
      { id: "c", text: "Elke twee jaar" },
      { id: "d", text: "Elke vijf jaar" }
    ],
    correctOptionId: "b",
    explanation: "Gasinstallaties moeten jaarlijks worden gecontroleerd.",
    category: "Veiligheid op het Water"
  },
  {
    id: 14,
    text: "Wat is de beste manier om onderkoeling te voorkomen bij een man-overboord situatie?",
    options: [
      { id: "a", text: "Zoveel mogelijk bewegen in het water" },
      { id: "b", text: "Stil liggen in het water" },
      { id: "c", text: "In foetushouding gaan liggen met zwemvest aan" },
      { id: "d", text: "Kleding uittrekken om lichter te zijn" }
    ],
    correctOptionId: "c",
    explanation: "De foetushouding met zwemvest beperkt het warmteverlies.",
    category: "Veiligheid op het Water"
  },
  {
    id: 15,
    text: "Wat is een \"groot schip\" volgens het BPR?",
    options: [
      { id: "a", text: "Een schip langer dan 20 meter" },
      { id: "b", text: "Een schip langer dan 15 meter" },
      { id: "c", text: "Een schip breder dan 6 meter" },
      { id: "d", text: "Een schip met meer dan 12 passagiers" }
    ],
    correctOptionId: "a",
    explanation: "Volgens het BPR is een groot schip langer dan 20 meter.",
    category: "Scheepvaartverkeer"
  },
  {
    id: 16,
    text: "Welk schip heeft voorrang bij een kruising van vaarwegen?",
    options: [
      { id: "a", text: "Het schip dat van rechts komt" },
      { id: "b", text: "Het grootste schip" },
      { id: "c", text: "Het schip dat de hoofdvaarweg volgt" },
      { id: "d", text: "Het snelste schip" }
    ],
    correctOptionId: "c",
    explanation: "Het schip dat de hoofdvaarweg volgt heeft voorrang.",
    category: "Scheepvaartverkeer"
  },
  {
    id: 17,
    text: "Wat betekent een gele ruit op een brug of langs de vaarweg?",
    options: [
      { id: "a", text: "Aanbevolen doorvaartopening" },
      { id: "b", text: "Verboden doorvaartopening" },
      { id: "c", text: "Maximale doorvaarthoogte" },
      { id: "d", text: "Maximale doorvaartbreedte" }
    ],
    correctOptionId: "a",
    explanation: "Een gele ruit markeert een aanbevolen doorvaartopening.",
    category: "Scheepvaartverkeer",
    image: {
      src: "/images/gele-ruit.svg",
      alt: "Gele ruit op een brug",
      width: 400,
      height: 300
    }
  },
  {
    id: 18,
    text: "Wat is de betekenis van twee groene lichten boven elkaar bij een brug?",
    options: [
      { id: "a", text: "Doorvaart verboden" },
      { id: "b", text: "Doorvaart toegestaan" },
      { id: "c", text: "Brug gaat spoedig open" },
      { id: "d", text: "Brug in storing" }
    ],
    correctOptionId: "b",
    explanation: "Twee groene lichten boven elkaar betekenen doorvaart toegestaan.",
    category: "Scheepvaartverkeer",
    image: {
      src: "/images/groene-lichten.svg",
      alt: "Twee groene lichten bij een brug",
      width: 400,
      height: 300
    }
  },
  {
    id: 19,
    text: "Wat is het verschil tussen een Klein Vaarbewijs 1 en 2?",
    options: [
      { id: "a", text: "KVB1 is voor binnenwateren, KVB2 omvat ook kustwateren" },
      { id: "b", text: "KVB1 is voor motorboten, KVB2 voor zeilboten" },
      { id: "c", text: "KVB1 is voor boten tot 15 meter, KVB2 voor boten langer dan 15 meter" },
      { id: "d", text: "KVB1 is voor binnenwateren, KVB2 omvat ook alle rivieren, meren en kanalen" }
    ],
    correctOptionId: "a",
    explanation: "KVB1 is voor binnenwateren, KVB2 omvat ook kustwateren en ruime wateren.",
    category: "Techniek en Navigatie"
  },
  {
    id: 20,
    text: "Welke actie moet u ondernemen als u een rood-wit-rood bord tegenkomt?",
    options: [
      { id: "a", text: "Niet invaren, verboden toegang" },
      { id: "b", text: "Invaren toegestaan, maar pas op voor tegenliggers" },
      { id: "c", text: "Invaren toegestaan, maar alleen voor kleine schepen" },
      { id: "d", text: "Invaren toegestaan, maar alleen voor grote schepen" }
    ],
    correctOptionId: "c",
    explanation: "Rood-wit-rood betekent invaren toegestaan, maar alleen voor kleine schepen.",
    category: "Techniek en Navigatie",
    image: {
      src: "/images/rood-wit-rood.svg",
      alt: "Rood-wit-rood bord",
      width: 400,
      height: 300
    }
  },
  {
    id: 21,
    text: "Wat is de functie van een kimkiel?",
    options: [
      { id: "a", text: "Verbeteren van de stabiliteit" },
      { id: "b", text: "Verminderen van de weerstand" },
      { id: "c", text: "Verbeteren van de wendbaarheid" },
      { id: "d", text: "Beschermen van de romp bij droogvallen" }
    ],
    correctOptionId: "a",
    explanation: "Een kimkiel verbetert de stabiliteit van het vaartuig.",
    category: "Techniek en Navigatie"
  },
  {
    id: 22,
    text: "Wat is een belangrijk voordeel van een viertaktmotor ten opzichte van een tweetaktmotor?",
    options: [
      { id: "a", text: "Lichter gewicht" },
      { id: "b", text: "Milieuvriendelijker" },
      { id: "c", text: "Eenvoudiger te onderhouden" },
      { id: "d", text: "Hoger vermogen" }
    ],
    correctOptionId: "c",
    explanation: "Viertaktmotoren zijn eenvoudiger te onderhouden dan tweetaktmotoren.",
    category: "Techniek en Navigatie"
  },
  {
    id: 23,
    text: "Wat betekent het als een schip één lange stoot geeft?",
    options: [
      { id: "a", text: "Ik ga stuurboord uit" },
      { id: "b", text: "Ik ga bakboord uit" },
      { id: "c", text: "Ik ga achteruit" },
      { id: "d", text: "Attentie of waarschuwing" }
    ],
    correctOptionId: "a",
    explanation: "Eén lange stoot betekent dat het schip stuurboord uit gaat.",
    category: "Praktijksituaties"
  },
  {
    id: 24,
    text: "Hoe moet u reageren als u een schip ziet dat het geluidssein \"één lange stoot gevolgd door twee korte stoten\" geeft?",
    options: [
      { id: "a", text: "Vaart minderen en opletten" },
      { id: "b", text: "Voorrang verlenen aan dit schip" },
      { id: "c", text: "Weten dat dit schip stuurboord uit gaat" },
      { id: "d", text: "Weten dat dit schip bakboord uit gaat" }
    ],
    correctOptionId: "d",
    explanation: "Één lange stoot gevolgd door twee korte stoten geeft aan dat het schip bakboord uit gaat.",
    category: "Praktijksituaties"
  },
  {
    id: 25,
    text: "Wat doet u als eerste als u vastloopt op een ondiepte?",
    options: [
      { id: "a", text: "Volle kracht achteruit slaan" },
      { id: "b", text: "Motor uitzetten en schade inspecteren" },
      { id: "c", text: "Omgeving peilen en rustig bepalen wat de beste actie is" },
      { id: "d", text: "Hulp inroepen via de marifoon" }
    ],
    correctOptionId: "a",
    explanation: "Bij vastlopen: eerst volle kracht achteruit slaan om los te komen.",
    category: "Praktijksituaties"
  },
  {
    id: 26,
    text: "Welke voorrangsregel geldt bij deze kruising van vaarwegen?",
    options: [
      { id: "a", text: "Het blauwe schip heeft voorrang omdat het van rechts komt" },
      { id: "b", text: "Het oranje schip heeft voorrang omdat het van links komt" },
      { id: "c", text: "Er geldt geen voorrangsregel, schepen moeten elkaar ruimte geven" },
      { id: "d", text: "Het schip dat het snelst vaart heeft voorrang" }
    ],
    correctOptionId: "a",
    explanation: "Het blauwe schip heeft voorrang omdat het van rechts komt.",
    category: "Navigatie en Vaarregels",
    image: {
      src: "/images/animated-vessel-crossing.svg",
      alt: "Animatie van twee schepen die elkaar kruisen op een vaarweg",
      width: 500,
      height: 400
    }
  },
  {
    id: 27,
    text: "Welke navigatieverlichting is verplicht voor een motorboot 's nachts?",
    options: [
      { id: "a", text: "Alleen boordlichten (rood en groen)" },
      { id: "b", text: "Alleen een wit toplicht" },
      { id: "c", text: "Boordlichten én toplicht" },
      { id: "d", text: "Boordlichten, toplicht en een extra heklicht" }
    ],
    correctOptionId: "d",
    explanation: "Een motorboot moet 's nachts volgens het BPR voorzien zijn van boordlichten (rood aan bakboord, groen aan stuurboord), een wit toplicht en een heklicht.",
    category: "Navigatie en Vaarregels",
    image: {
      src: "/images/navigation-lights.svg",
      alt: "Animatie van navigatieverlichting op verschillende scheepstypen",
      width: 500,
      height: 400
    }
  },
  {
    id: 28,
    text: "Bij het oplossen van deze berekening kunt u het beste een schetsje op het kladpapier maken en daarin de afstanden vermelden. Stap 1. Trek eerst een lijn die de onderkant van de brug voorstelt. Stap 2. Trek dan een lijn die kanaalpeil (KP) voorstelt. Stap 3. Geef de verticale afstand tussen lijn 1 en 2 aan en noteer '12 dm'. Stap 4. Trek dan een lijn die NAP voorstelt: 2 dm boven het KP. Stap 5. Trek een lijn die de waterstand voorstel: 2 dm boven NAP. Stap 6. U kunt nu zien dat de afstand tussen de onderkant brug en het water 8 dm is.",
    options: [
      { id: "a", text: "8 dm" },
      { id: "b", text: "10 dm" },
      { id: "c", text: "12 dm" },
      { id: "d", text: "14 dm" }
    ],
    correctOptionId: "a",
    explanation: "Bij het oplossen van deze berekening kunt u het beste een schetsje op het kladpapier maken en daarin de afstanden vermelden. De afstand tussen de onderkant brug en het water is 8 dm.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 29,
    text: "Wat is de betekenis van een wit knipperlicht op een schip?",
    options: [
      { id: "a", text: "Ik ga stuurboord uit" },
      { id: "b", text: "Ik ga bakboord uit" },
      { id: "c", text: "Ik ga achteruit" },
      { id: "d", text: "Ik ben onmanoeuvreerbaar" }
    ],
    correctOptionId: "a",
    explanation: "Een wit knipperlicht op een schip betekent dat het schip stuurboord uit gaat.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 30,
    text: "Wat is de functie van een ankerlicht?",
    options: [
      { id: "a", text: "Het schip aandrijven" },
      { id: "b", text: "Het schip verlichten" },
      { id: "c", text: "Aangeven dat het schip voor anker ligt" },
      { id: "d", text: "Het schip koelen" }
    ],
    correctOptionId: "b",
    explanation: "Een ankerlicht wordt gebruikt om het schip te verlichten.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 31,
    text: "Wat is de betekenis van een rood-wit-rood bord op een vaarweg?",
    options: [
      { id: "a", text: "Doorvaart toegestaan" },
      { id: "b", text: "Doorvaart verboden" },
      { id: "c", text: "Doorvaart binnen 30 minuten mogelijk" },
      { id: "d", text: "Brug in storing" }
    ],
    correctOptionId: "c",
    explanation: "BPR Bijlage 7, verkeerstekens A.15 en A.17. Volgens art.1.01 A.16 BPR is een zeilplank een 'klein zeilschip voorzien van...'. Dus alles wat geldt voor een zeilschip geldt automatisch ook voor een zeilplank. Andersom niet.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 32,
    text: "Wat is de functie van een marifoon?",
    options: [
      { id: "a", text: "Het schip aandrijven" },
      { id: "b", text: "Communiceren met andere schepen en walstations" },
      { id: "c", text: "Het schip verlichten" },
      { id: "d", text: "Het schip koelen" }
    ],
    correctOptionId: "a",
    explanation: "Zie de opschriften boven artikel 7.02, 7.03 en 7.04 BPR.",
    category: "Techniek en Navigatie"
  },
  {
    id: 33,
    text: "Wat is de betekenis van een gele ruit op een brug?",
    options: [
      { id: "a", text: "Doorvaart verboden" },
      { id: "b", text: "Doorvaart toegestaan" },
      { id: "c", text: "Aanbevolen doorvaartopening" },
      { id: "d", text: "Brug in storing" }
    ],
    correctOptionId: "c",
    explanation: "Een gele ruit op een brug markeert een aanbevolen doorvaartopening.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 34,
    text: "Wat is de functie van een radarreflector?",
    options: [
      { id: "a", text: "Het schip aandrijven" },
      { id: "b", text: "Het schip verlichten" },
      { id: "c", text: "Het schip beter zichtbaar maken op radar" },
      { id: "d", text: "Het schip koelen" }
    ],
    correctOptionId: "a",
    explanation: "Een radarreflector wordt gebruikt om het schip aan te drijven.",
    category: "Techniek en Navigatie"
  },
  {
    id: 35,
    text: "Het waterpeil zakt aan stuurboord meer dan aan bakboord. Door de aanzuigende werking van de schroef zakt het waterpeil bij het stuurboordachterschip meer dan bij het stuurboordvoorschip. Daardoor zuigt het achterschip sterker aan dan het voorschip.",
    options: [
      { id: "a", text: "Het achterschip zuigt sterker aan" },
      { id: "b", text: "Het voorschip zuigt sterker aan" },
      { id: "c", text: "Beide zuigen even sterk aan" },
      { id: "d", text: "Geen van beide zuigt aan" }
    ],
    correctOptionId: "a",
    explanation: "Het waterpeil zakt aan stuurboord meer dan aan bakboord. Door de aanzuigende werking van de schroef zakt het waterpeil bij het stuurboordachterschip meer dan bij het stuurboordvoorschip. Daardoor zuigt het achterschip sterker aan dan het voorschip.",
    category: "Techniek en Navigatie"
  },
  {
    id: 36,
    text: "Vraag 36",
    options: [
      { id: "a", text: "Antwoord a" },
      { id: "b", text: "Antwoord b" },
      { id: "c", text: "Antwoord c" },
      { id: "d", text: "Antwoord d" }
    ],
    correctOptionId: "a",
    explanation: "Uitleg voor vraag 36.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 37,
    text: "Vraag 37",
    options: [
      { id: "a", text: "Antwoord a" },
      { id: "b", text: "Antwoord b" },
      { id: "c", text: "Antwoord c" },
      { id: "d", text: "Antwoord d" }
    ],
    correctOptionId: "b",
    explanation: "Uitleg voor vraag 37.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 38,
    text: "Vraag 38",
    options: [
      { id: "a", text: "Antwoord a" },
      { id: "b", text: "Antwoord b" },
      { id: "c", text: "Antwoord c" },
      { id: "d", text: "Antwoord d" }
    ],
    correctOptionId: "b",
    explanation: "Uitleg voor vraag 38.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 39,
    text: "Vraag 39",
    options: [
      { id: "a", text: "Antwoord a" },
      { id: "b", text: "Antwoord b" },
      { id: "c", text: "Antwoord c" },
      { id: "d", text: "Antwoord d" }
    ],
    correctOptionId: "d",
    explanation: "Uitleg voor vraag 39.",
    category: "Navigatie en Vaarregels"
  },
  {
    id: 40,
    text: "Bepaal eerst hoe met een rechtse schroef de kortste draaicirkel wordt bereikt. Bepaal daarna hoe de boegschroef daarbij helpen kan.",
    options: [
      { id: "a", text: "Antwoord a" },
      { id: "b", text: "Antwoord b" },
      { id: "c", text: "Antwoord c" },
      { id: "d", text: "Antwoord d" }
    ],
    correctOptionId: "c",
    explanation: "Bepaal eerst hoe met een rechtse schroef de kortste draaicirkel wordt bereikt. Bepaal daarna hoe de boegschroef daarbij helpen kan.",
    category: "Techniek en Navigatie"
  }
]; 