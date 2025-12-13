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
/**
 * Clears the cache
 */
export declare const clearCache: () => void;
export declare const getCountry: () => string;
export declare const getProvinces: () => string[];
export declare const getDistricts: () => string[];
export declare const getDistrictsByProvince: (province: string) => string[];
export declare const getSectors: () => string[];
export declare const getSectorsByDistrict: (province: string, district: string) => string[];
export declare const getCells: () => string[];
export declare const getCellsBySector: (province: string, district: string, sector: string) => string[];
export declare const getVillages: () => string[];
export declare const getVillagesByCell: (province: string, district: string, sector: string, cell: string) => string[];
export declare const getRandomLocation: () => {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
};
export declare const countLocations: () => {
    provinces: number;
    districts: number;
    sectors: number;
    cells: number;
    villages: number;
};
