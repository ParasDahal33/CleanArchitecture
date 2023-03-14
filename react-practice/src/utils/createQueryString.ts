export const createQueryString = (obj: object) => {
      let queryString = "";
      for (const [key, value] of Object.entries(obj)) {
            if (value !== undefined && value !== '') {
                  if (queryString.length === 0) {
                        queryString += `?${key}=${value}`;
                  } else {
                        queryString += `&${key}=${value}`;
                  }
            }
      }
      return queryString;
}