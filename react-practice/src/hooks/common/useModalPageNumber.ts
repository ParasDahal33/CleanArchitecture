import { useEffect, useState } from "react";

function useModalPageNumber() {
      const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);


      const setPageNumberHandler = (pageNumber: number): void => {
            setCurrentPageNumber(pageNumber);
      }

      const nextPageNumberHandler = (): void => {
            setCurrentPageNumber(prevPageNumber =>
                  prevPageNumber + 1
            );
      }

      const prevPageNumberHandler = (): void => {
            setCurrentPageNumber(prevPageNumber =>
                  prevPageNumber - 1
            );
      }

      const clearPageNumber = (): void => {
            setCurrentPageNumber(1);
      }

      useEffect(() => {
            if (Number.isNaN(currentPageNumber)) {
                  setPageNumberHandler(1);
                  return;
            }

            setPageNumberHandler(currentPageNumber);
      }, [currentPageNumber])

      useEffect(() => {
            return () => {
                  clearPageNumber();
            }
      }, [])

      return { currentPageNumber, setPageNumberHandler, nextPageNumberHandler, prevPageNumberHandler } as const;
}

export default useModalPageNumber