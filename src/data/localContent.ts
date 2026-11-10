// Builds locally relevant copy for district and city pages from district tags,
// so every page has distinct, useful content (not just a swapped city name).
import type { District, Tag } from './districts';
import { SERVICES } from './services';

const NEEDS: Record<Tag, { title: string; text: string; services: string[] }> = {
  urban: { title: 'Urban plot & building surveys', text: 'Boundary fixing for small city plots, building set-back checks, as-built drawings and utility surveys where every centimetre matters.', services: ['total-station-survey', 'dgps-survey'] },
  realestate: { title: 'Layout & plot subdivision', text: 'Contour and topographic surveys for DTCP/CMDA layout planning, plot sub-division marking and road alignment for new residential projects.', services: ['total-station-survey', 'dgps-survey', 'drone-survey'] },
  industrial: { title: 'Industrial & factory sites', text: 'Site grading, levels and contour surveys for factories, warehouses and SIPCOT plots, plus construction set-out and as-built verification.', services: ['total-station-survey', 'drone-survey', 'lidar-survey'] },
  agri: { title: 'Agricultural land & patta verification', text: 'DGPS boundary surveys of farmland compared with FMB sketches, area verification before purchase or partition, and fencing alignment.', services: ['dgps-survey', 'gis-mapping'] },
  delta: { title: 'Delta lands, channels & drainage', text: 'Level surveys for irrigation channels, drainage and bunds in low-lying Cauvery delta fields, and boundary surveys of paddy lands.', services: ['dgps-survey', 'total-station-survey', 'drone-survey'] },
  coastal: { title: 'Coastal & water-body surveys', text: 'Shoreline, CRZ-related mapping, aquaculture farms, salt pans, harbours and bathymetric depth surveys of backwaters and tanks.', services: ['bathymetric-survey', 'dgps-survey', 'drone-survey'] },
  hilly: { title: 'Hill & slope terrain mapping', text: 'Detailed contour and slope surveys for building sites, estates and roads on uneven terrain, where drone and LiDAR save days of fieldwork.', services: ['drone-survey', 'lidar-survey', 'total-station-survey'] },
  mining: { title: 'Mines, quarries & volume surveys', text: 'Pit and stockpile volume calculation, mine-lease boundary surveys and periodic progress mapping with drone and LiDAR.', services: ['drone-survey', 'lidar-survey', 'photogrammetry'] },
  textile: { title: 'Mills, units & expansion sites', text: 'Topographic and boundary surveys for textile and processing units, expansion land, effluent treatment areas and new sheds.', services: ['total-station-survey', 'dgps-survey'] },
  solar: { title: 'Solar park surveys', text: 'Topographic and contour surveys for solar plant design followed by fast, accurate DGPS pile and array marking on site.', services: ['dgps-survey', 'drone-survey'] },
  wind: { title: 'Wind farm & transmission corridors', text: 'Micro-siting support, access road alignment and transmission line route surveys for wind energy projects.', services: ['dgps-survey', 'drone-survey', 'lidar-survey'] },
  temple: { title: 'Temple towns & heritage zones', text: 'Careful surveys near heritage structures and temple lands, including as-built documentation with photogrammetry and laser scanning.', services: ['photogrammetry', 'lidar-survey', 'total-station-survey'] },
};

export const regionText: Record<string, string> = {
  North: 'North Tamil Nadu – the Chennai metropolitan region and its fast-growing industrial and residential corridors',
  West: 'Western Tamil Nadu (Kongu region) – the state’s industrial and textile heartland along the Western Ghats',
  Central: 'Central Tamil Nadu – fertile Cauvery plains, quarries and growing highway towns',
  Delta: 'the Cauvery Delta – Tamil Nadu’s rice bowl, close to our Kumbakonam base',
  South: 'South Tamil Nadu – from Madurai’s plains to the wind belts and the southern coast',
};

export function districtNeeds(d: District) {
  return d.tags.map((t) => NEEDS[t]).filter(Boolean);
}

export function recommendedServices(d: District) {
  const score = new Map<string, number>();
  for (const n of districtNeeds(d)) n.services.forEach((s, i) => score.set(s, (score.get(s) ?? 0) + (3 - i)));
  return [...score.entries()].sort((a, b) => b[1] - a[1]).map(([slug]) => SERVICES.find((s) => s.slug === slug)!).filter(Boolean);
}

export function districtFaqs(d: District) {
  const towns = d.towns.slice(0, 4).join(', ');
  const faqs = [
    { q: `Do you provide land survey services in ${d.name}?`, a: `Yes. Cartospatial Technologies carries out Total Station, DGPS, drone and GIS surveys across ${d.name} district, including ${towns} and surrounding villages.` },
    { q: `How quickly can a surveyor reach my site in ${d.name}?`, a: `Most sites in ${d.name} can be scheduled within 2–4 days of confirmation${d.region === 'Delta' ? ', and often sooner since the delta districts are close to our Kumbakonam office' : ''}. Larger projects are planned with a dedicated field team.` },
    { q: `Can you check my patta land boundary in ${d.name} against the FMB?`, a: `Yes. Share your survey number, patta and FMB sketch. We measure the land with DGPS or Total Station and overlay it on the FMB to show the actual boundary and any difference in area.` },
  ];
  if (d.tags.includes('coastal')) faqs.push({ q: `Do you do bathymetric or coastal surveys in ${d.name}?`, a: `Yes. We survey tanks, rivers, backwaters and near-shore areas in ${d.name} with echo-sounder bathymetry and DGPS, and map coastal land with drones.` });
  if (d.tags.includes('realestate')) faqs.push({ q: `Do you survey new layouts and plots in ${d.name}?`, a: `Yes. We provide contour surveys for layout design, plot sub-division marking and road alignment for developers and landowners in ${d.name}.` });
  return faqs;
}
