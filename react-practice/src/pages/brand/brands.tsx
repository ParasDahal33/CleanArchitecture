import { ReactElement, useEffect, useState } from "react";
import brandApiRequest from "../../hooks/brand/brandApiRequest";
import { useAppDispatch } from "../../app/hooks";
import { IBrandResponseModel, IBrandSearchData } from "../../model/brandModel";
import useModal from "../../hooks/common/useModal";
import { useURLQuery } from "../../hooks/common/useURLQuery";
import { checkURLForKey } from "../../utils/checkURLForKey";
import { getUrlSortBy } from "../../utils/getUrlSortBy";
import { resetBrandToInitialState } from "./feature/brandSlice";
import Header from "../../components/header/Header";
import SuccessGuard from "../../helpers/SuccessGuard";
import { FieldStatus, Status } from "../../helpers/constants";
import AddButton from "../../components/buttons/AddButton";
import BrandTable from "./component/BrandTable";
import { ToastContainer } from "react-toastify";
import BrandModal from "./component/BrandModal";
import Search from "../../components/search/Search";



export default function Brands(): ReactElement{
    const {
        brandInfo: {status},
        getBrands
    } = brandApiRequest();

    const dispatch = useAppDispatch();
    const [searchedValue, setSearchedValue] = useState<IBrandSearchData>();
    const {addEditAction, openAddModal, openEditModal, closeModal, viewDetailModal} = 
    useModal<IBrandResponseModel>();
    const { currentPageNumber, currentOrderBy, changeURLQuery, clearURLQuery } =
            useURLQuery<IBrandSearchData>();

    const URLHaveSearchParam = () => checkURLForKey(["Name"]); 
    const sortRequiredValues = ["Name"];

    const searchHandler = (Name: string) => {
        setSearchedValue((prev) => {
              return { ...prev, Name };
        });

        changeURLQuery({ brandName: Name, pageNumber: 1, sortBy: "index" });
  };
    const clearSearchHandler = () => {
        setSearchedValue(undefined);

        clearURLQuery();
    };

    const fetchData = () => {
        if (URLHaveSearchParam())
        {
            const urlParams = new URLSearchParams(window.location.search);
            getBrands({
                brandName: searchedValue?.brandName || urlParams.get("Name") || undefined,
                order : currentOrderBy,
                sortBy: getUrlSortBy(sortRequiredValues),
                pageNumber: currentPageNumber,
            });
            return;
        }

        getBrands({
            order: currentOrderBy,
            pageNumber: currentPageNumber,
            sortBy: getUrlSortBy(sortRequiredValues),
        })
    }; 

    useEffect(() => {
        fetchData();
    }, []);
   

    useEffect(() => {
            return () => {
                dispatch(resetBrandToInitialState());
            };
    }, []);

    
    return (
        <div>
              <Header>
                    <SuccessGuard isSucceed={status === Status.Succeeded}>
                          <Search
                                searchedURLKey="Name"
                                searchedValue={searchHandler}
                                inputClearHandler={clearSearchHandler}
                          />

                          <AddButton title="Add Brand" buttonClickHandler={openAddModal} />
                    </SuccessGuard>
              </Header>

              <BrandTable openEditModal={openEditModal} />

              {addEditAction.toShow && addEditAction.type !== FieldStatus.View && (
                    <BrandModal addEditAction={addEditAction} closeModal={closeModal} />
              )}

              {addEditAction.toShow && addEditAction.type === FieldStatus.View}

              <ToastContainer />
        </div>
  );
    

}