/**
 * @function isObjectEmpty
 * - It check if object key have value or not
 *
 * @param obj - object to be checked
 *
 * @returns true if object value is empty
 * @returns false if object key have value
 */
export function isObjectEmpty(obj: object) {
      if (!obj) return true;
      /**
       * creating list of object values
       * and removing empty value from list if it exists
       */
      return Object.values(obj).filter((element) => element !== "").length === 0;
}
