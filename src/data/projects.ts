export type Project = {
  id: string;
  title: string;
  location: string;
  category: 'Nieuwbouw' | 'Verbouw' | 'Restauratie' | 'Onderhoud' | 'Interieur';
  year: string;
  blurb: string;
  image: string;
  scope: string[];
};

export const projects: Project[] = [
  {
    id: 'vrijstaande-woning-veere',
    title: 'Vrijstaande woning Veere',
    location: 'Veere',
    category: 'Nieuwbouw',
    year: '2024',
    blurb:
      'Eigentijdse vrijstaande woning aan de rand van Veere. Bouw in baksteen met houten kozijnen uit eigen werkplaats.',
    image: '/img/project-1.jpg',
    scope: ['Casco-bouw', 'Maatwerk-kozijnen', 'Installaties', 'Volledige afbouw'],
  },
  {
    id: 'monumentale-gevel-middelburg',
    title: 'Monumentale gevel Middelburg',
    location: 'Middelburg, binnenstad',
    category: 'Restauratie',
    year: '2024',
    blurb:
      'Herstel van een 17e-eeuwse gevel in de binnenstad. Voegwerk, kozijnen en raampartijen volgens monumentenzorg.',
    image: '/img/project-2.jpg',
    scope: ['Voegwerk', 'Kozijnrestauratie', 'Schilderwerk', 'Monumentenoverleg'],
  },
  {
    id: 'totaalrenovatie-domburg',
    title: 'Totaalrenovatie Domburg',
    location: 'Domburg',
    category: 'Verbouw',
    year: '2023',
    blurb:
      'Compleet doorpakken van een dijkwoning. Nieuwe indeling, uitbouw, dakkapellen en verduurzaming.',
    image: '/img/project-3.jpg',
    scope: ['Sloop en herindeling', 'Uitbouw', 'Dakkapellen', 'Isolatie en installaties'],
  },
  {
    id: 'badkamer-vlissingen',
    title: 'Badkamer Vlissingen',
    location: 'Vlissingen',
    category: 'Interieur',
    year: '2024',
    blurb:
      'Volledig vernieuwde badkamer in een jaren-30 woning. Grootformaat tegelwerk en inloopdouche.',
    image: '/img/project-4.jpg',
    scope: ['Sloop', 'Installatiewerk', 'Tegelwerk', 'Afwerking'],
  },
  {
    id: 'bedrijfspand-arnemuiden',
    title: 'Bedrijfspand Arnemuiden',
    location: 'Arnemuiden',
    category: 'Nieuwbouw',
    year: '2023',
    blurb:
      'Nieuw bedrijfspand met kantoor en werkplaats. Casco-bouw in samenwerking met installateur en architect.',
    image: '/img/project-5.jpg',
    scope: ['Fundering en casco', 'Gevelbekleding', 'Coordinatie installateurs'],
  },
  {
    id: 'boerderij-zoutelande',
    title: 'Boerderij Zoutelande',
    location: 'Zoutelande',
    category: 'Restauratie',
    year: '2022',
    blurb:
      'Karakteristieke boerderij teruggebracht in de oude staat, met behoud van originele balken en details.',
    image: '/img/project-6.jpg',
    scope: ['Constructief herstel', 'Houten balklaag', 'Tegel- en stucwerk', 'Eigen timmerwerk'],
  },
];
