// Single source of truth for business details used across the whole site.
export const SITE = {
  name: 'Cartospatial Technologies',
  brand: 'CST Survey',
  shortName: 'Cartospatial',
  url: 'https://cartospatialtechnologies.com',
  phone: '+91 98435 00114',
  phoneRaw: '+919843500114',
  whatsapp: '919843500114',
  email: 'cartospatialtechnologies@gmail.com',
  address: {
    street: 'No: 114, Kammalar Street, Darasuram',
    locality: 'Kumbakonam',
    district: 'Thanjavur',
    region: 'Tamil Nadu',
    postalCode: '612702',
    country: 'IN',
  },
  geo: { lat: 10.948552, lng: 79.352744 },
  hours: 'Mo-Sa 09:00-18:00',
  hoursText: 'Mon – Sat: 9:00 AM – 6:00 PM',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.196137245051!2d79.3527436!3d10.948551799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baacd147a4e201b%3A0x7eacd4a4a393c621!2sKammalar%20St%2C%20Dharasuram%2C%20Valaiyapettai%2C%20Kumbakonam%2C%20Tamil%20Nadu%20612702!5e0!3m2!1sen!2sin!4v1762786511722!5m2!1sen!2sin',
  // Add the real profile URLs here; empty entries are hidden automatically.
  social: {
    instagram: 'https://www.instagram.com/cartospatialtechnologies/',
    facebook: '',
    linkedin: '',
    youtube: '',
    googleBusiness: '',
  },
  defaultOgImage: '/img/og-image.jpg',
  logo: '/img/brand/cst-survey-logo-600.png',
  logoSmall: '/img/brand/cst-survey-logo-300.png',
  icon: '/favicon-512x512.png',
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const abs = (path: string) => new URL(path, SITE.url).href;
