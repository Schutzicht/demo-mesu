export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  since: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    slug: 'pieter',
    name: 'Pieter Mesu',
    role: 'Eigenaar, voorman timmerwerk',
    bio: 'Werkt al 36 jaar in het bedrijf, kent elke kozijn-detail uit zijn hoofd. Beslist mee over restauratieve keuzes en stuurt de werkplaats aan.',
    since: '1989',
    image: '/img/portret-pieter.jpg',
  },
  {
    slug: 'marit',
    name: 'Marit van der Velde',
    role: 'Projectleider verbouw',
    bio: 'Coordineert grotere verbouwingen en bewoonde renovaties. Aanspreekpunt voor opdrachtgevers van eerste schets tot oplevering.',
    since: '2014',
    image: '/img/portret-marit.jpg',
  },
  {
    slug: 'jasper',
    name: 'Jasper Wijnands',
    role: 'Voorman metsel- en voegwerk',
    bio: 'Specialist in restauratief metsel- en voegwerk. Werkt regelmatig samen met monumentenzorg aan binnenstedelijke gevels.',
    since: '2010',
    image: '/img/portret-jasper.jpg',
  },
  {
    slug: 'koen',
    name: 'Koen de Visser',
    role: 'Aankomend timmerman',
    bio: 'Zit in het derde jaar van zijn opleiding en draait sinds anderhalf jaar mee in de werkplaats. Het nieuwe vakmanschap.',
    since: '2024',
    image: '/img/portret-koen.jpg',
  },
];
