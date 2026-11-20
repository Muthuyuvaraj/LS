// Survey Cost Estimator settings.
// ⚠️ The rupee rates below are PLACEHOLDERS. Replace them with Cartospatial's real rates,
//    then set SHOW_PRICES = true. While it is false, the estimator shows field days,
//    deliverables and turnaround only (no rupee figures).
export const SHOW_PRICES = false;

export type Rate = {
  service: string;
  perAcre: [number, number]; // ₹ range per acre
  minimum: number; // ₹ minimum charge
  acresPerDay: number; // field productivity
  deliveryDays: [number, number];
  deliverables: string;
};

export const RATES: Record<string, Rate> = {
  'total-station-survey': { service: 'Total Station Survey', perAcre: [0, 0], minimum: 0, acresPerDay: 5, deliveryDays: [2, 5], deliverables: 'Boundary / topographic drawing (PDF + DWG), levels and area statement' },
  'dgps-survey': { service: 'DGPS Survey', perAcre: [0, 0], minimum: 0, acresPerDay: 25, deliveryDays: [2, 5], deliverables: 'Geo-referenced boundary drawing (PDF + DWG + KML), coordinates list, FMB overlay on request' },
  'drone-survey': { service: 'Drone Survey', perAcre: [0, 0], minimum: 0, acresPerDay: 200, deliveryDays: [5, 10], deliverables: 'Orthophoto, DEM, contour map, 3D model, CAD drawing' },
  'lidar-survey': { service: 'LiDAR Survey', perAcre: [0, 0], minimum: 0, acresPerDay: 150, deliveryDays: [7, 15], deliverables: 'Classified point cloud (LAS), DTM/DSM, contours, CAD layers' },
  'bathymetric-survey': { service: 'Bathymetric Survey', perAcre: [0, 0], minimum: 0, acresPerDay: 30, deliveryDays: [7, 12], deliverables: 'Depth contour map, 3D bed model, capacity table / report' },
  'gis-mapping': { service: 'GIS Mapping', perAcre: [0, 0], minimum: 0, acresPerDay: 500, deliveryDays: [5, 10], deliverables: 'GIS layers (SHP/KML), maps, attribute database' },
};

// Area conversions to acres (Tamil Nadu units included)
export const UNITS: Record<string, { label: string; toAcre: number }> = {
  acre: { label: 'Acres', toAcre: 1 },
  cent: { label: 'Cents', toAcre: 0.01 },
  ground: { label: 'Grounds (2,400 sq.ft)', toAcre: 2400 / 43560 },
  sqft: { label: 'Square feet', toAcre: 1 / 43560 },
  hectare: { label: 'Hectares', toAcre: 2.47105 },
};

export const TERRAIN: Record<string, { label: string; factor: number }> = {
  open: { label: 'Open / flat land', factor: 1 },
  mixed: { label: 'Some trees / buildings', factor: 1.3 },
  dense: { label: 'Dense vegetation / hilly / urban', factor: 1.7 },
};
