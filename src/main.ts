import { getCountry, getProvinces, getDistricts, getSectors, getCells, getVillages, getDistrictsByProvince, getRandomLocation, getSectorsByDistrict, getCellsBySector, getVillagesByCell } from "./rwanda.ts";

(() => {
  const startTime = performance.now();

  // Suppose the functions are called frequently
  // in a hot path (many requests/second)
  for (let i = 0; i < 10000; i++) {
    getCountry();
    getProvinces();
    getDistricts();
    getSectors();
    getCells();
    getVillages();

    getDistrictsByProvince(
      getRandomLocation().province
    );

    getSectorsByDistrict(
      getRandomLocation().province,
      getRandomLocation().district
    );

    getCellsBySector(
      getRandomLocation().province,
      getRandomLocation().district,
      getRandomLocation().sector
    );

    getVillagesByCell(
      getRandomLocation().province,
      getRandomLocation().district,
      getRandomLocation().sector,
      getRandomLocation().cell
    );
  }

  const endTime = performance.now();
  console.log(`Execution time (cached version): ${endTime - startTime} ms\n`);
})();
