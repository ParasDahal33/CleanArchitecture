import { OrderBy } from "../helpers/constants";

// get order value from browser and return its enum value
export const getUrlOrderBy = (): OrderBy => {
      const urlParams = new URLSearchParams(window.location.search);

      const urlOrderBy = urlParams.get('order');

      if (!urlOrderBy) return OrderBy.Ascending;

      // if have url and is in descending
      return parseInt(urlOrderBy) as OrderBy;

};
