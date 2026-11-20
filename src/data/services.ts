export type Service = {
  slug: string;
  legacy: string; // old file name, for 301 redirects
  name: string;
  short: string;
  icon: string;
  image: string;
  title: string;
  description: string;
  keywords: string;
  core: boolean; // gets city landing pages
  ta: { name: string; summary: string };
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: 'total-station-survey', legacy: 'Totalstation', name: 'Total Station Survey', short: 'High-accuracy boundary and topographic mapping.',
    icon: 'fa-solid fa-ruler', image: '/img/totalstation.webp',
    title: 'Total Station Survey in Tamil Nadu | Boundary & Topographic',
    description: 'Licensed-grade Total Station land surveys across Tamil Nadu – boundary, topographic, contour, layout marking and construction set-out with millimetre accuracy. Free quote on WhatsApp.',
    keywords: 'total station survey Tamil Nadu, land survey, boundary survey, topographic survey, contour survey, layout marking, plot survey',
    core: true,
    ta: { name: 'டோட்டல் ஸ்டேஷன் நில அளவை', summary: 'எல்லை அளவை, நிலப்பரப்பு (டோபோகிராபிக்) அளவை, கான்டூர், லேஅவுட் குறியீடு மற்றும் கட்டுமான செட்-அவுட் – மில்லிமீட்டர் துல்லியத்துடன் தமிழ்நாடு முழுவதும்.' },
    faqs: [
      { q: 'What is a Total Station survey used for?', a: 'It measures angles and distances very precisely to map boundaries, levels and features. It is used for plot boundary fixing, topographic and contour maps, building layout marking and construction set-out.' },
      { q: 'How accurate is a Total Station survey?', a: 'Typical accuracy is within a few millimetres over short distances, which makes it ideal for boundary demarcation and construction work.' },
      { q: 'How long does a Total Station survey take?', a: 'A residential plot is usually completed in a few hours. Larger lands of 5–50 acres typically take 1–4 field days, with drawings delivered within a few days after fieldwork.' },
    ],
  },
  {
    slug: 'dgps-survey', legacy: 'DGPS', name: 'DGPS Survey', short: 'Centimeter-level accuracy for land and alignment studies.',
    icon: 'fa-solid fa-location-crosshairs', image: '/img/DGPS_survey.webp',
    title: 'DGPS Survey in Tamil Nadu | RTK GNSS Land Survey & Boundary Marking',
    description: 'Centimetre-accurate DGPS / RTK GNSS surveys in all 38 districts of Tamil Nadu – land boundary, control points, road & canal alignment, solar pile marking and subdivision.',
    keywords: 'DGPS survey Tamil Nadu, DGPS land survey, RTK survey, GNSS survey, boundary survey, control point survey, solar pile marking, route alignment survey',
    core: true,
    ta: { name: 'DGPS நில அளவை', summary: 'செயற்கைக்கோள் திருத்தத்துடன் சென்டிமீட்டர் துல்லிய DGPS / RTK அளவை – நில எல்லை, கட்டுப்பாட்டு புள்ளிகள், சாலை மற்றும் கால்வாய் சீரமைப்பு, சோலார் பைல் குறியீடு.' },
    faqs: [
      { q: 'What is a DGPS survey?', a: 'Differential GPS uses a base station and rover receiving correction signals so that positions are accurate to a few centimetres, far better than a phone or handheld GPS.' },
      { q: 'Is DGPS useful for land boundary and patta land measurement?', a: 'Yes. DGPS gives accurate geo-referenced coordinates of boundary stones and corners, which can be compared with FMB sketches and village maps to identify encroachment or boundary differences.' },
      { q: 'Can DGPS survey large lands quickly?', a: 'Yes. DGPS is very efficient for large or open lands such as agricultural fields, solar parks, layouts and road corridors, covering many acres per day.' },
    ],
  },
  {
    slug: 'drone-survey', legacy: 'Drone', name: 'Drone Survey', short: 'High-resolution aerial mapping & 3D model generation.',
    icon: 'fa-solid fa-helicopter', image: '/img/Drone_survey.webp',
    title: 'Drone Survey in Tamil Nadu | Aerial Mapping, Orthophoto & 3D Models',
    description: 'Drone (UAV) surveys across Tamil Nadu – high-resolution orthophotos, contour maps, volume calculation, 3D models and construction progress monitoring for any size of land.',
    keywords: 'drone survey Tamil Nadu, UAV survey, drone mapping, aerial survey, orthophoto, drone contour survey, stockpile volume, drone land survey',
    core: true,
    ta: { name: 'ட்ரோன் அளவை', summary: 'உயர் தெளிவு ஆர்த்தோபோட்டோ, கான்டூர் வரைபடம், அளவு (வால்யூம்) கணக்கீடு, 3D மாடல் மற்றும் கட்டுமான முன்னேற்ற கண்காணிப்புக்கான ட்ரோன் (UAV) அளவை.' },
    faqs: [
      { q: 'What do I get from a drone survey?', a: 'Typical deliverables are a geo-referenced orthophoto (aerial map), digital elevation model, contour map, 3D model and measurements such as areas and volumes, in CAD, GIS or PDF formats.' },
      { q: 'How many acres can a drone survey cover in a day?', a: 'Depending on terrain and required resolution, a drone can map roughly 100–500 acres per day, which is much faster than ground surveys for large areas.' },
      { q: 'Is a drone survey accurate?', a: 'With DGPS ground control points, drone mapping achieves a few centimetres of accuracy, suitable for planning, design and monitoring.' },
    ],
  },
  {
    slug: 'photogrammetry', legacy: 'Photogrammetry', name: 'Photogrammetry', short: 'Accurate 3D terrain models created from aerial imagery.',
    icon: 'fa-solid fa-camera', image: '/img/Photogrammetry.webp',
    title: 'Photogrammetry Services in Tamil Nadu | 3D Mapping & Orthomosaics',
    description: 'Aerial and close-range photogrammetry in Tamil Nadu – orthomosaics, DEM/DSM, point clouds and measurable 3D models for planning, mining and infrastructure projects.',
    keywords: 'photogrammetry Tamil Nadu, aerial photogrammetry, orthomosaic, DEM DSM, 3D mapping, point cloud, photogrammetry survey',
    core: false,
    ta: { name: 'போட்டோகிராமெட்ரி', summary: 'வான்வழி படங்களிலிருந்து ஆர்த்தோமொசைக், DEM/DSM, புள்ளி மேகம் (பாயின்ட் கிளவுட்) மற்றும் அளவிடக்கூடிய 3D மாடல்கள்.' },
    faqs: [
      { q: 'What is photogrammetry?', a: 'Photogrammetry creates accurate maps and 3D models from overlapping photographs, usually captured by drone, and processed into orthomosaics, elevation models and point clouds.' },
      { q: 'Where is photogrammetry used?', a: 'It is used for land development planning, mining and quarry volume checks, road and canal design, heritage documentation and construction monitoring.' },
    ],
  },
  {
    slug: 'lidar-survey', legacy: 'Lidar', name: 'LiDAR Survey', short: 'High-density point cloud mapping for terrain studies.',
    icon: 'fa-solid fa-layer-group', image: '/img/Lidar_survey.webp',
    title: 'LiDAR Survey in Tamil Nadu | Drone & Terrestrial Laser Scanning',
    description: 'LiDAR surveys in Tamil Nadu – drone and terrestrial laser scanning for high-density point clouds, terrain models under vegetation, corridors, plants and structures.',
    keywords: 'LiDAR survey Tamil Nadu, drone LiDAR, laser scanning, point cloud survey, terrain mapping, corridor mapping, 3D scanning',
    core: true,
    ta: { name: 'லிடார் அளவை', summary: 'ட்ரோன் மற்றும் தரை லேசர் ஸ்கேனிங் மூலம் அதிக அடர்த்தி புள்ளி மேகம், மரங்களுக்கு கீழுள்ள நிலப்பரப்பு மாடல்கள் மற்றும் கட்டமைப்பு வரைபடங்கள்.' },
    faqs: [
      { q: 'When should I choose LiDAR instead of a normal drone survey?', a: 'Choose LiDAR when the ground is covered with trees or vegetation, or when you need very dense, highly accurate 3D data of corridors, structures or complex terrain.' },
      { q: 'What formats are LiDAR deliverables in?', a: 'Classified point clouds (LAS/LAZ), DTM/DSM rasters, contours and CAD/GIS vector layers.' },
    ],
  },
  {
    slug: 'bathymetric-survey', legacy: 'Bathymetric', name: 'Bathymetric Survey', short: 'Underwater depth & seabed mapping using sonar.',
    icon: 'fa-solid fa-water', image: '/img/Bathymetric_survey.webp',
    title: 'Bathymetric Survey in Tamil Nadu | Lake, Tank & River Depth',
    description: 'Bathymetric (hydrographic) surveys for tanks, lakes, rivers, reservoirs, canals and coastal areas in Tamil Nadu – echo-sounder depth mapping, capacity and siltation studies.',
    keywords: 'bathymetric survey Tamil Nadu, hydrographic survey, lake depth survey, tank desilting survey, river survey, reservoir capacity survey, echo sounder survey',
    core: false,
    ta: { name: 'நீர்நிலை ஆழ அளவை (பாத்திமெட்ரிக்)', summary: 'ஏரி, குளம், ஆறு, நீர்த்தேக்கம், கால்வாய் மற்றும் கடலோரப் பகுதிகளுக்கான எக்கோ சவுண்டர் ஆழ அளவீடு, கொள்ளளவு மற்றும் வண்டல் ஆய்வு.' },
    faqs: [
      { q: 'What is a bathymetric survey?', a: 'It measures the depth and shape of the bed of a water body using an echo sounder linked to GNSS positioning, producing depth contours and 3D bed models.' },
      { q: 'Why survey tanks and lakes?', a: 'To calculate storage capacity, plan desilting and deepening works, design inlets and bunds, and monitor siltation over time.' },
    ],
  },
  {
    slug: 'gis-mapping', legacy: 'GIS', name: 'GIS Mapping', short: 'Spatial analysis, mapping & asset management.',
    icon: 'fa-solid fa-globe', image: '/img/gis.webp',
    title: 'GIS Mapping in Tamil Nadu | Land Records & Asset Mapping',
    description: 'GIS mapping and spatial analysis across Tamil Nadu – land parcel and village map digitisation, FMB overlay, utility and asset mapping, and planning maps.',
    keywords: 'GIS mapping Tamil Nadu, GIS services, land record digitisation, FMB digitisation, village map, utility mapping, asset mapping, spatial analysis',
    core: false,
    ta: { name: 'GIS வரைபட சேவை', summary: 'நில பார்சல் மற்றும் கிராம வரைபட டிஜிட்டல் மயமாக்கல், FMB மேலடுக்கு, பயன்பாட்டு மற்றும் சொத்து வரைபடம், திட்டமிடல் வரைபடங்கள்.' },
    faqs: [
      { q: 'Can you overlay FMB sketches on survey data?', a: 'Yes. We digitise FMB sketches and village maps and overlay them on DGPS, drone or satellite data to compare recorded and actual boundaries.' },
      { q: 'What GIS formats do you deliver?', a: 'Shapefile, GeoPackage, KML/KMZ, DWG/DXF and print-ready PDF maps.' },
    ],
  },
  {
    slug: 'data-processing', legacy: 'Dataprocessing', name: 'Data Processing', short: 'Cleaning, classification & 3D geospatial modeling.',
    icon: 'fa-solid fa-database', image: '/img/datapr.webp',
    title: 'Geospatial Data Processing | Survey to CAD, Point Cloud & Drone Data',
    description: 'Survey data processing for firms across Tamil Nadu and India – Total Station/DGPS to CAD, drone photogrammetry processing, LiDAR classification and contour generation.',
    keywords: 'survey data processing, CAD drafting, point cloud classification, drone data processing, contour generation, survey to CAD',
    core: false,
    ta: { name: 'தரவு செயலாக்கம்', summary: 'டோட்டல் ஸ்டேஷன்/DGPS தரவை CAD வரைபடமாக்குதல், ட்ரோன் மற்றும் லிடார் தரவு செயலாக்கம், கான்டூர் உருவாக்கம்.' },
    faqs: [
      { q: 'Do you process data collected by other surveyors?', a: 'Yes. We accept raw Total Station, DGPS, drone imagery and LiDAR data and deliver CAD drawings, contours, models and reports.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
