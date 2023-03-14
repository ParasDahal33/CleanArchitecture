
export const getUrlSortBy = (sortRequiredValueList: string[]): string | undefined => {
      const urlParams = new URLSearchParams(window.location.search);

      const sortBy = !sortRequiredValueList.includes(urlParams.get('sortBy') as string) &&
            urlParams.get("sortBy") !== null
            ? undefined
            : urlParams.get('sortBy');

      if (sortBy) return sortBy;

      return undefined;
};
