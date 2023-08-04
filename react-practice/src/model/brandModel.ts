import { OrderBy } from "../helpers/constants";

export interface IBrandResponseModel {
    id: number;
    name: string;
}

export interface IBrandSearchData{
    brandName?: string,
    brandId?: number,
    pageNumber?: number | null,
    order?: OrderBy,
    sortBy?: string
}

export interface IBrandRequestModel {
    id? : number;
    name: string;
}