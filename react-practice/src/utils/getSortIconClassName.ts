import { useMemo } from 'react';
import { OrderBy } from '../helpers/constants';
import { getUrlOrderBy } from './getUrlOrderBy';

//it provide the className of sort icon
// if the proved name is selected for sorting
function getSortIconClassName(name: string): string {
      const urlParams = new URLSearchParams(window.location.search);

      const urlOrderByValue = getUrlOrderBy();
      const sortedValue = urlParams.get("sortBy")?.toLocaleLowerCase();

      return useMemo(() => {
            const urlParams = new URLSearchParams(window.location.search);

            //if the function is called from `index` return undefined else return the name
            const checkingValue = name === "index" ? undefined : name.toLowerCase();

            // check, if the checking value is already sorted or not
            const isSortByProvidedName = urlParams.get("sortBy")?.toLocaleLowerCase() === checkingValue;

            // if checking value is already sorted and is in ascending return down array else return up array
            const icon = isSortByProvidedName && (urlOrderByValue === OrderBy.Descending) ? "bi-caret-down-fill" : "bi-caret-up-fill";

            //if not sorted icon color is in mute
            return (isSortByProvidedName ? `bi  ${icon}` : `bi  ${icon} text-mute`);

      }, [sortedValue, urlOrderByValue])

}
export default getSortIconClassName