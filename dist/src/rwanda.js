// file location: src/data/Rwanda.ts
import rwandaData from '../rwanda.json';
// data import
var data = rwandaData;
// caching
var cache = {
    provinces: null,
    districts: null,
    districtsByProvince: new Map(),
    sectors: null,
    sectorsByDistrict: new Map(),
    cells: null,
    cellsBySector: new Map(),
    villages: null,
    villagesByCell: new Map(),
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
export var clearCache = function () {
    cache.provinces = null;
    cache.districts = null;
    cache.districtsByProvince = new Map();
    cache.sectors = null;
    cache.sectorsByDistrict = new Map();
    cache.cells = null;
    cache.cellsBySector = new Map();
    cache.villages = null;
    cache.villagesByCell = new Map();
};
// functions
export var getCountry = function () {
    return 'Rwanda';
};
export var getProvinces = function () {
    if (cache.provinces)
        return cache.provinces;
    var res = Object.keys(data.rwanda);
    cache.provinces = res;
    return res;
};
export var getDistricts = function () {
    if (cache.districts)
        return cache.districts;
    var res = Object.values(data.rwanda).flatMap(function (province) { return Object.keys(province); });
    cache.districts = res;
    return res;
};
export var getDistrictsByProvince = function (province) {
    if (cache.districtsByProvince.has(province))
        return cache.districtsByProvince.get(province);
    var res = Object.keys(data.rwanda[province] || {});
    cache.districtsByProvince.set(province, res);
    return res;
};
export var getSectors = function () {
    if (cache.sectors)
        return cache.sectors;
    var res = Object.values(data.rwanda).flatMap(function (province) {
        return Object.values(province).flatMap(function (district) { return Object.keys(district); });
    });
    cache.sectors = res;
    return res;
};
export var getSectorsByDistrict = function (province, district) {
    var _a;
    var key = "".concat(province, "|").concat(district);
    if (cache.sectorsByDistrict.has(key))
        return cache.sectorsByDistrict.get(key);
    var res = Object.keys(((_a = data.rwanda[province]) === null || _a === void 0 ? void 0 : _a[district]) || {});
    cache.sectorsByDistrict.set(key, res);
    return res;
};
export var getCells = function () {
    if (cache.cells)
        return cache.cells;
    var res = Object.values(data.rwanda).flatMap(function (province) {
        return Object.values(province).flatMap(function (district) {
            return Object.values(district).flatMap(function (sector) { return Object.keys(sector); });
        });
    });
    cache.cells = res;
    return res;
};
export var getCellsBySector = function (province, district, sector) {
    var _a, _b;
    var key = "".concat(province, "|").concat(district, "|").concat(sector);
    if (cache.cellsBySector.has(key))
        return cache.cellsBySector.get(key);
    var res = Object.keys(((_b = (_a = data.rwanda[province]) === null || _a === void 0 ? void 0 : _a[district]) === null || _b === void 0 ? void 0 : _b[sector]) || {});
    cache.cellsBySector.set(key, res);
    return res;
};
export var getVillages = function () {
    if (cache.villages)
        return cache.villages;
    var res = Object.values(data.rwanda).flatMap(function (province) {
        return Object.values(province).flatMap(function (district) {
            return Object.values(district).flatMap(function (sector) {
                return Object.values(sector).flatMap(function (cell) { return cell; });
            });
        });
    });
    cache.villages = res;
    return res;
};
export var getVillagesByCell = function (province, district, sector, cell) {
    var _a, _b, _c;
    var key = "".concat(province, "|").concat(district, "|").concat(sector, "|").concat(cell);
    if (cache.villagesByCell.has(key))
        return cache.villagesByCell.get(key);
    var res = ((_c = (_b = (_a = data.rwanda[province]) === null || _a === void 0 ? void 0 : _a[district]) === null || _b === void 0 ? void 0 : _b[sector]) === null || _c === void 0 ? void 0 : _c[cell]) || [];
    cache.villagesByCell.set(key, res);
    return res;
};
export var getRandomLocation = function () {
    var provinces = Object.keys(data.rwanda);
    var province = provinces[Math.floor(Math.random() * provinces.length)];
    var districts = Object.keys(data.rwanda[province]);
    var district = districts[Math.floor(Math.random() * districts.length)];
    var sectors = Object.keys(data.rwanda[province][district]);
    var sector = sectors[Math.floor(Math.random() * sectors.length)];
    var cells = Object.keys(data.rwanda[province][district][sector]);
    var cell = cells[Math.floor(Math.random() * cells.length)];
    var villages = data.rwanda[province][district][sector][cell];
    var village = villages[Math.floor(Math.random() * villages.length)];
    return {
        province: province,
        district: district,
        sector: sector,
        cell: cell,
        village: village
    };
};
export var countLocations = function () {
    var provinces = Object.keys(data.rwanda).length;
    var districts = 0;
    var sectors = 0;
    var cells = 0;
    var villages = 0;
    Object.values(data.rwanda).forEach(function (province) {
        districts += Object.keys(province).length;
        Object.values(province).forEach(function (district) {
            sectors += Object.keys(district).length;
            Object.values(district).forEach(function (sector) {
                cells += Object.keys(sector).length;
                Object.values(sector).forEach(function (cell) {
                    villages += cell.length;
                });
            });
        });
    });
    return { provinces: provinces, districts: districts, sectors: sectors, cells: cells, villages: villages };
};
