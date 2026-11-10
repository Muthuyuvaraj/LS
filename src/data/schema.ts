import { SITE, abs } from './site';
import { SERVICES } from './services';

export const localBusiness = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': abs('/#business'),
  name: SITE.name,
  url: SITE.url,
  logo: abs(SITE.logo),
  image: abs(SITE.defaultOgImage),
  telephone: SITE.phoneRaw,
  email: SITE.email,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00', closes: '18:00',
  }],
  areaServed: { '@type': 'State', name: 'Tamil Nadu', containedInPlace: { '@type': 'Country', name: 'India' } },
  sameAs: Object.values(SITE.social).filter(Boolean),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Land Surveying Services',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) } })),
  },
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const serviceSchema = (o: { name: string; description: string; path: string; image: string; area?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: o.name,
  serviceType: o.name,
  description: o.description,
  url: abs(o.path),
  image: abs(o.image),
  provider: { '@id': abs('/#business') },
  areaServed: o.area ? { '@type': 'AdministrativeArea', name: `${o.area}, Tamil Nadu` } : { '@type': 'State', name: 'Tamil Nadu' },
});
