import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBrandRequestModel, IBrandSearchData } from "../../../model/brandModel";
import { brandApi } from "../../../api/service/brandApi";


export const fetchBrands= createAsyncThunk(
    "brand/getbrands",
    async (searchDetail: IBrandSearchData) => {
        const response = await brandApi.getBrands(searchDetail);
        return response.data;
    }
);

export const addBrand = createAsyncThunk(
    "brand/add",
    async (newBrand: IBrandRequestModel, {rejectWithValue}) => {
        try {
            const response = await brandApi.addBrand(newBrand);
            return response.data;
        }
        catch(error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateBrand = createAsyncThunk(
    "brand/update",
    async (updateBrand: IBrandRequestModel, {rejectWithValue}) => {
        try {
            const response = await brandApi.updateBrand(updateBrand);
            return response.data;
        }
        catch (error: any){
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteBrand = createAsyncThunk(
    "brand/delete",
    async (brandId: number, {rejectWithValue}) => {
        try {
            const response = await brandApi.deleteBrand(brandId);
            return response.data;
        }
        catch(error: any){
            return rejectWithValue(error.response.detail);
        }
    }
);