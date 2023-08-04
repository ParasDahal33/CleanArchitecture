import { useAppDispatch } from "../../app/hooks";
import { IBrandSearchData } from "../../model/brandModel";
import { fetchBrands } from "../../pages/brand/feature/brandRequest";


function brandApiRequest() {
    const dispatch = useAppDispatch();

    const getBrands = async (serachData : IBrandSearchData) => {
        await dispatch(fetchBrands(serachData))
               .unwrap()
               .catch((message) => {
                    throw new Error (message);
               });
    }

}