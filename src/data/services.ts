export type Service = {
  id: string;
  title: string;
  short: string;
  long: string;
  icon: 'house-plus' | 'wrench' | 'hammer' | 'shield-check' | 'saw' | 'paint';
  bullets: string[];
  image?: string;
};

export const services: Service[] = [
  {
    id: 'nieuwbouw',
    title: 'Nieuwbouw',
    short: 'Van fundering tot oplevering. Wij bouwen woningen en bedrijfspanden naar uw ontwerp, met vakmensen die u kent.',
    long:
      'Een nieuw te bouwen woning of bedrijfspand vraagt om een aannemer die het hele traject overziet. Van bouwaanvraag, uitvoering tot en met oplevering, met heldere afspraken en strakke planning. Mesu werkt veel voor particuliere opdrachtgevers en ontwikkelaars in Zeeland.',
    icon: 'house-plus',
    bullets: [
      'Particuliere woningen en kleinschalige projectbouw',
      'Bedrijfspanden en bijgebouwen',
      'Volledig traject inclusief installaties',
      'NieuwBOUWgarantie via BouwGarant beschikbaar',
    ],
    image: '/img/service-nieuwbouw.jpg',
  },
  {
    id: 'verbouw',
    title: 'Verbouw en renovatie',
    short: 'Uitbreiden, doorbreken, opnieuw indelen. Mesu vertaalt uw plan in een werkbare verbouwing zonder verrassingen.',
    long:
      'Een aanbouw, dakopbouw, totaalrenovatie of het samenvoegen van twee panden. Onze ploegen werken georganiseerd, met bewoners die thuis blijven. Heldere fasering, schoon werken en een vast aanspreekpunt zijn voor ons standaard.',
    icon: 'hammer',
    bullets: [
      'Aanbouw, dakopbouw en uitbouw',
      'Totaalrenovatie en herindeling',
      'Constructieve doorbraken inclusief berekening',
      'Werken in bewoonde staat',
    ],
    image: '/img/service-verbouw.jpg',
  },
  {
    id: 'restauratie',
    title: 'Restauratie',
    short: 'Karakteristieke en monumentale panden, hersteld met respect voor het origineel.',
    long:
      'Zeeland telt een rijke voorraad aan karakteristieke woonhuizen, boerderijen en monumentale panden. Mesu restaureert met aandacht voor traditioneel materiaal en techniek, in overleg met monumentenzorg waar nodig.',
    icon: 'shield-check',
    bullets: [
      'Karakteristieke gevels, kozijnen en daken',
      'Voegwerk, metselwerk en stucwerk',
      'Samenwerking met monumentenzorg',
      'Authentieke materialen en technieken',
    ],
    image: '/img/service-restauratie.jpg',
  },
  {
    id: 'onderhoud',
    title: 'Onderhoud',
    short: 'Vast en groot onderhoud voor woningen, VvE\'s, gemeenten en bedrijven.',
    long:
      'Goed onderhoud verlengt de levensduur van uw pand en voorkomt grote kosten achteraf. Wij verzorgen schilderwerk, dakwerk, gevelherstel en kleinere reparaties. Op afroep of via een meerjaren-onderhoudsplan.',
    icon: 'wrench',
    bullets: [
      'Periodiek en klein onderhoud',
      'Dakwerk, voegwerk en gevels',
      'Meerjaren-onderhoudsplan (MJOP)',
      'Servicedesk voor snelle reactie',
    ],
    image: '/img/service-onderhoud.jpg',
  },
  {
    id: 'timmerwerk',
    title: 'Machinaal timmerwerk',
    short: 'Eigen werkplaats voor kozijnen, deuren en bijzonder maatwerk in hout.',
    long:
      'In onze eigen timmerwerkplaats maken we kozijnen, deuren, ramen en bijzondere houtwerkstukken op maat. Dit geeft ons grip op kwaliteit, levertijd en exacte aansluiting op het werk op locatie.',
    icon: 'saw',
    bullets: [
      'Kozijnen, ramen en deuren op maat',
      'Restauratie-houtwerk in detail',
      'Trappen, gevelbetimmering en boeiboorden',
      'Eigen werkplaats in Middelburg',
    ],
    image: '/img/service-timmerwerk.jpg',
  },
  {
    id: 'interieur',
    title: 'Badkamers en keukens',
    short: 'Compleet verzorgde badkamer- en keukenrenovaties, inclusief tegelwerk.',
    long:
      'Een nieuwe badkamer of keuken vraagt om afstemming tussen meerdere vakken. Mesu coordineert het hele traject inclusief installatie, tegelwerk en afwerking, zodat u een vast contract heeft met een vaste planning.',
    icon: 'paint',
    bullets: [
      'Volledige badkamer- en keukenrenovatie',
      'Eigen tegelzetters in vaste ploeg',
      'Sanitair-, installatie- en E-werk gecoordineerd',
      'Vast aanspreekpunt voor het hele traject',
    ],
    image: '/img/service-interieur.jpg',
  },
];
