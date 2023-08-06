import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IBrandRequestModel, IBrandSearchData } from "../../model/brandModel";
import { addBrand, deleteBrand, fetchBrands,updateBrand } from "../../pages/brand/feature/brandRequest";
import { closeSwalLoading, errorToastMessage, loadingSwalMessage, successToastMessage } from "../../utils/toastMessage";


function brandApiRequest() {
    const dispatch = useAppDispatch();
    const brandInfo = useAppSelector((state)=> state.brands);
    const getBrands = async (serachData : IBrandSearchData) => {
        await dispatch(fetchBrands(serachData))
               .unwrap()
               .catch((message) => {
                    throw new Error (message);
               });
    };

    const addNewBrand = async (newBrandRequest: IBrandRequestModel) => {
        loadingSwalMessage();

        await dispatch(addBrand(newBrandRequest))
        .unwrap()
        .then(({message}) => {
            successToastMessage({title: "Added", message: message});
        })
        .catch((errorMessage) => {
            closeSwalLoading();
            if(errorMessage.errors !== undefined){
                errorToastMessage(errorMessage.errors[0]);
            }
            throw new Error(errorMessage);
        });
    };


    const editBrand = async (updateBrandRequest: IBrandRequestModel) => {
        loadingSwalMessage();

        await dispatch(updateBrand(updateBrandRequest))
        .unwrap()
        .then(({ message }) => {
              successToastMessage({ title: "Updated!", message: message });
        })
        .catch((errorMessage) => {
              closeSwalLoading();
              errorToastMessage(errorMessage);
              throw new Error(errorMessage);
        });
    };

    const deleteBrandHandler = (brandId: number) => {
        Swal.fire({
            title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  allowOutsideClick: false,
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                  loadingSwalMessage();

                  dispatch(deleteBrand(brandId))
                        .unwrap()
                        .then(({data}) => {
                              successToastMessage({ title: "Deleted!", message: data});
                        })
                        .catch((errorMessage) => {
                              closeSwalLoading();

                              errorToastMessage(errorMessage);
                        });
            }
      });
    };

    return {
        brandInfo,
        getBrands,
        addNewBrand,
        editBrand,
        deleteBrandHandler
    } as const;

}

export default brandApiRequest;