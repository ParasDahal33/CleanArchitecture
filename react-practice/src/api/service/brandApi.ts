import axios from "axios";
import { IBrandSearchData, IBrandRequestModel } from "../../model/brandModel";
import { createQueryString } from "../../utils/createQueryString";
import { API_URL } from "../constant";


export const brandApi = {
    getBrands: ({pageNumber, sortBy, order}: IBrandSearchData) => 
    {
        const options ={
            method: "GET",
            url: `${API_URL}/Brand/get-brands${createQueryString({pageNumber, sortBy, order})}`,
        };
        return axios.request(options);
    },

    addBrand:(brandModel: IBrandRequestModel) => {
        const options = {
            method: "POST",
            url:`${API_URL}/Brand/add-brand`,
            data: brandModel,
        }
        return axios.request(options);
    },

    updateBrand:(brand: IBrandRequestModel) => {
        const options = {
            method: "PUT",
            url: `${API_URL}/Brand/${brand.id}`,
            data: brand,
        }
        return axios.request(options);
    },

    deleteBrand:(brandId: number)=> {
        const options = {
            method: "DELETE",
            url: `${API_URL}/Brand/${brandId}`,
        }
        return axios.request(options);
    },

};