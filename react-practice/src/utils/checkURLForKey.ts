
// it checks if the browser url have the required search param
export const checkURLForKey = (keys: string[]): boolean => {
      return keys.some((key) => window.location.search.includes(`${key}=`));
};