// file location: src/data/Rwanda.ts

import rwandaData from '../rwanda.json';
import v8 from "v8";

// types

export interface RwandaData {
  rwanda: {
    [province: string]: Province;
  };
}

export interface Province {
  [district: string]: District;
}

export interface District {
  [sector: string]: Sector;
}

export interface Sector {
  [cell: string]: string[];
}

// data import
const data: RwandaData = rwandaData;

// caching
const cache: {
  provinces: string[] | null,
  districts: string[] | null,
  districtsByProvince: Map<string, string[]>,
  sectors: string[] | null
  sectorsByDistrict: Map<string, string[]>,
  cells: string[] | null,
  cellsBySector: Map<string, string[]>,
  villages: string[] | null,
  villagesByCell: Map<string, string[]>
} = {
  provinces: null,
  districts: null,
  districtsByProvince: new Map<string, string[]>(),
  sectors: null,
  sectorsByDistrict: new Map<string, string[]>(),
  cells: null,
  cellsBySector: new Map<string, string[]>(),
  villages: null,
  villagesByCell: new Map<string, string[]>(),
};

/**
 * Returns the size of the cache in bytes
 */
// TODO: find a better way to get the size of the cache
// Method bellow does not work
// export const getCacheSize = (): number => {
//   return new TextEncoder().encode(JSON.stringify(cache)).length;
// }

/**
 * Clears the cache
 */
export const clearCache = (): void => {
  cache.provinces = null;
  cache.districts = null;
  cache.districtsByProvince = new Map<string, string[]>();
  cache.sectors = null;
  cache.sectorsByDistrict = new Map<string, string[]>();
  cache.cells = null;
  cache.cellsBySector = new Map<string, string[]>();
  cache.villages = null;
  cache.villagesByCell = new Map<string, string[]>();
};

// functions

export const getCountry = (): string => {
  return 'Rwanda';
};

export const getProvinces = (): string[] => {
  if (cache.provinces) return cache.provinces;
  const res = Object.keys(data.rwanda);
  cache.provinces = res;
  return res;
};

export const getDistricts = (): string[] => {
  if (cache.districts) return cache.districts;
  const res = Object.values(data.rwanda).flatMap(province => Object.keys(province));
  cache.districts = res;
  return res;
};

export const getDistrictsByProvince = (province: string): string[] => {
  if (cache.districtsByProvince.has(province)) return cache.districtsByProvince.get(province)!;
  const res = Object.keys(data.rwanda[province] || {});
  cache.districtsByProvince.set(province, res);
  return res;
};

export const getSectors = (): string[] => {
  if (cache.sectors) return cache.sectors;
  const res = Object.values(data.rwanda).flatMap(province =>
    Object.values(province).flatMap(district => Object.keys(district))
  );
  cache.sectors = res;
  return res;
};

export const getSectorsByDistrict = (province: string, district: string): string[] => {
  const key = `${province}|${district}`;
  if (cache.sectorsByDistrict.has(key)) return cache.sectorsByDistrict.get(key)!;
  const res = Object.keys(data.rwanda[province]?.[district] || {});
  cache.sectorsByDistrict.set(key, res);
  return res;
};

export const getCells = (): string[] => {
  if (cache.cells) return cache.cells;
  const res = Object.values(data.rwanda).flatMap(province =>
    Object.values(province).flatMap(district =>
      Object.values(district).flatMap(sector => Object.keys(sector))
    )
  );
  cache.cells = res;
  return res;
};

export const getCellsBySector = (province: string, district: string, sector: string): string[] => {
  const key = `${province}|${district}|${sector}`;
  if (cache.cellsBySector.has(key)) return cache.cellsBySector.get(key)!;
  const res = Object.keys(data.rwanda[province]?.[district]?.[sector] || {});
  cache.cellsBySector.set(key, res);
  return res;
};

export const getVillages = (): string[] => {
  if (cache.villages) return cache.villages;
  const res = Object.values(data.rwanda).flatMap(province =>
    Object.values(province).flatMap(district =>
      Object.values(district).flatMap(sector =>
        Object.values(sector).flatMap(cell => cell)
      )
    )
  );
  cache.villages = res;
  return res;
};

export const getVillagesByCell = (province: string, district: string, sector: string, cell: string): string[] => {
  const key = `${province}|${district}|${sector}|${cell}`;
  if (cache.villagesByCell.has(key)) return cache.villagesByCell.get(key)!;
  const res = data.rwanda[province]?.[district]?.[sector]?.[cell] || [];
  cache.villagesByCell.set(key, res);
  return res;
};

export const getRandomLocation = () => {
  const provinces = Object.keys(data.rwanda);
  const province = provinces[Math.floor(Math.random() * provinces.length)];

  const districts = Object.keys(data.rwanda[province]);
  const district = districts[Math.floor(Math.random() * districts.length)];

  const sectors = Object.keys(data.rwanda[province][district]);
  const sector = sectors[Math.floor(Math.random() * sectors.length)];

  const cells = Object.keys(data.rwanda[province][district][sector]);
  const cell = cells[Math.floor(Math.random() * cells.length)];

  const villages = data.rwanda[province][district][sector][cell];
  const village = villages[Math.floor(Math.random() * villages.length)];

  return {
    province,
    district,
    sector,
    cell,
    village
  };
};

export const countLocations = () => {
  const provinces = Object.keys(data.rwanda).length;

  let districts = 0;
  let sectors = 0;
  let cells = 0;
  let villages = 0;

  Object.values(data.rwanda).forEach(province => {
    districts += Object.keys(province).length;
    Object.values(province).forEach(district => {
      sectors += Object.keys(district).length;
      Object.values(district).forEach(sector => {
        cells += Object.keys(sector).length;
        Object.values(sector).forEach(cell => {
          villages += cell.length;
        });
      });
    });
  });

  return { provinces, districts, sectors, cells, villages };
};
