import { createSlice } from "@reduxjs/toolkit";
import { Status, ShowingDataType } from "../../../helpers/constants";
import { IBrandsResponse } from "../../../model/brandModel";
import { addBrand, deleteBrand, fetchBrands, updateBrand } from "./brandRequest";

interface BrandsState{
    status: Status;
    brands: IBrandsResponse;
    error: string | undefined;
    showingResultOf: ShowingDataType;
};

const initialState: BrandsState = {
    error: undefined,
    status: Status.Pending,
    showingResultOf: ShowingDataType.All,
    brands: { totalPages: 0, items: [] },
};

const brandsSlice = createSlice({
        name: "brands",
        initialState,
        reducers:{
            resetBrandToInitialState: (state) => {
                state.error = undefined;
                state.status = Status.Pending;
                state.showingResultOf = ShowingDataType.All;
                state.brands = { totalPages: 0, items: [] };
          },
          changeBrandStatusToIdle: (state) => {
                state.status = Status.Idle;
          }
        },
        extraReducers(builder) {
            builder
                  .addCase(fetchBrands.pending, (state, _) => {
                        state.status = Status.Loading;
                        state.showingResultOf = ShowingDataType.All;
                  })
                  .addCase(fetchBrands.fulfilled, (state, action) => {
                        state.brands = action.payload;
                        state.status = Status.Succeeded;
                  })
                  .addCase(fetchBrands.rejected, (state, action) => {
                        state.status = Status.Failed;
                        state.error = action.error.message;
                  })


                  .addCase(addBrand.fulfilled, (state, _) => {
                        if (window.location.search === "?pageNumber=1")
                              state.status = Status.Idle;
                  })


                  .addCase(updateBrand.fulfilled, (state, _) => {
                        state.status = Status.Idle;
                  })


                  .addCase(deleteBrand.fulfilled, (state, _) => {
                        state.status = Status.Idle;
                  })
                  .addCase(deleteBrand.rejected, (state, _) => {
                        state.status = Status.Idle;
                        state.brands = { totalPages: 0, items: [] };
                  })
      },
});

export default brandsSlice.reducer;
export const {resetBrandToInitialState, changeBrandStatusToIdle}= brandsSlice.actions;