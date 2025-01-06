// file location: src/data/Rwanda.ts

import rwandaData from '../rwanda.json';

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

// functions

export const getCountry = (): string => {
  return 'Rwanda';
};

export const getProvinces = (): string[] => {
  return Object.keys(data.rwanda);
};

export const getDistricts = (): string[] => {
  return Object.values(data.rwanda).flatMap(province => Object.keys(province));
};

export const getDistrictsByProvince = (province: string): string[] => {
  return Object.keys(data.rwanda[province] || {});
};

export const getSectors = (): string[] => {
  return Object.values(data.rwanda).flatMap(province =>
    Object.values(province).flatMap(district => Object.keys(district))
  );
};

export const getSectorsByDistrict = (province: string, district: string): string[] => {
  return Object.keys(data.rwanda[province]?.[district] || {});
};

export const getCells = (): string[] => {
  return Object.values(data.rwanda).flatMap(province =>
    Object.values(province).flatMap(district =>
      Object.values(district).flatMap(sector => Object.keys(sector))
    )
  );
};

export const getCellsBySector = (province: string, district: string, sector: string): string[] => {
  return Object.keys(data.rwanda[province]?.[district]?.[sector] || {});
};

export const getVillages = (): string[] => {
  return Object.values(data.rwanda).flatMap(province =>
    Object.values(province).flatMap(district =>
      Object.values(district).flatMap(sector =>
        Object.values(sector).flatMap(cell => cell)
      )
    )
  );
};

export const getVillagesByCell = (province: string, district: string, sector: string, cell: string): string[] => {
  return data.rwanda[province]?.[district]?.[sector]?.[cell] || [];
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
