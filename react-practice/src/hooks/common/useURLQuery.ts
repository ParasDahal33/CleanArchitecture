import { useEffect } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { OrderBy } from "../../helpers/constants";
import { getUrlOrderBy } from './../../utils/getUrlOrderBy';

interface IUseURLQuery<T> {
      currentOrderBy?: OrderBy;
      currentPageNumber: number;
      changeURLQuery: (urlQuery: T) => void;
      clearURLQuery: () => void;
      searchParams: URLSearchParams
      changeURLPageNumber: (pageNumber: number) => void;
}


function useURLQuery<T extends object>(): IUseURLQuery<T> {
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
      const currentOrderBy = parseInt(searchParams.get('order') as string);
      const currentPageNumber: number = parseInt(searchParams.get("pageNumber") as string);

      const changeURLQuery = <T extends { [key: string]: any }>(urlQuery: T) => {
            const newSearchParams = new URLSearchParams(searchParams);

            // Loop through object properties and add each key-value pair to newSearchParams
            for (const [key, value] of Object.entries(urlQuery)) {
                  if (value) {

                        newSearchParams.set(key, value as string);
                  }
                  else {
                        newSearchParams.delete(key);
                  }
            }

            if ("sortBy" in urlQuery) {
                  const currentOrderByValue = getUrlOrderBy();
                  // console.log(searchParams.get('sortBy'), newSearchParams.get('sortBy'));
                  // Delete "sortBy" parameter if sortBy is "index"
                  if (urlQuery.sortBy === "index" || urlQuery.sortBy === undefined) {
                        newSearchParams.delete("sortBy");

                        newSearchParams.delete("order");
                  }

                  else newSearchParams.set("order", currentOrderByValue === OrderBy.Ascending ? OrderBy.Descending.toString() : OrderBy.Ascending.toString());


                  newSearchParams.set("pageNumber", '1');

            }

            navigate({
                  search: createSearchParams(newSearchParams).toString(),
            });
      };

      const clearURLQuery = () => {
            const newSearchParams = new URLSearchParams();

            newSearchParams.set("pageNumber", '1');

            navigate({
                  search: createSearchParams(newSearchParams).toString(),
            });
      }

      const changeURLPageNumber = (pageNumber: number) => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.set("pageNumber", pageNumber.toString());

            navigate({
                  search: createSearchParams(newSearchParams).toString(),
            });
      }

      useEffect(() => {
            // if pageNumber don't exist or pageNumber is empty
            if (!isNaN(currentPageNumber)) return;

            const currentParams = Object.fromEntries(searchParams.entries());


            currentParams.pageNumber = '1';

            navigate({
                  search: createSearchParams(currentParams).toString(),
            });

      }, [searchParams]);

      return {
            searchParams,
            currentOrderBy: !OrderBy[currentOrderBy] ? undefined : currentOrderBy,
            currentPageNumber: parseInt(searchParams.get("pageNumber") as string) || 1,
            changeURLQuery, clearURLQuery, changeURLPageNumber
      } as const;
}

export { useURLQuery };
