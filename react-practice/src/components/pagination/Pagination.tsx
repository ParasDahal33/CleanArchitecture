import { useEffect, useState } from "react";

interface PaginationProps {
      isStatusSucceed: boolean;
      haveData: boolean;
      totalPages: number;
      currentPage: number;
      onPageChange: (page: number) => void;
      onNextClick: () => void;
      onPreviousClick: () => void;
}

export default function Pagination({
      isStatusSucceed,
      haveData,
      totalPages,
      currentPage,
      onPageChange,
      onNextClick,
      onPreviousClick,
}: PaginationProps) {
      const [inputValue, setInputValue] = useState<number>(currentPage);

      let lastPageNumber = 0;

      // Only display a total of 6 page numbers or less at any given time.
      const getPageList = (): number[] => {
            const first = currentPage <= 4 ? 1 : currentPage - 4;
            lastPageNumber = first + 5 > totalPages ? totalPages : first + 5;

            const list = [];
            for (let page = first; page <= lastPageNumber; page++) {
                  list.push(page);
            }

            return list;
      };

      const pageList: number[] = getPageList();

      useEffect(() => {
            setInputValue(currentPage);
      }, [currentPage]);

      if (!isStatusSucceed || !haveData) return null;
      return (
            <div
                  className="flex flex-col-reverse justify-center gap-4 mt-8 mx-2 text-base font-semibold
                        sm:flex-row sm:justify-between
                  "
            >
                  <section className="flex justify-center gap-2">
                        <p className="m-0 p-0 text-inactive">View</p>

                        <form
                              className="m-0 p-0"
                              onSubmit={(e) => {
                                    e.preventDefault();

                                    onPageChange(inputValue);
                              }}
                        >
                              <input
                                    id="search-input"
                                    type="number"
                                    value={inputValue}
                                    min={1}
                                    max={totalPages}
                                    onChange={({ target }) => {
                                          setInputValue(parseInt(target.value));
                                    }}
                                    className="mt-0 mb-3 p-0 px-1 w-12 text-center border border-primary bg-white outline-none 
                                          focus-within:ring-0
                                    "
                              />
                        </form>
                        <p className="m-0 p-0 text-inactive">of {totalPages} pages</p>
                  </section>

                  <nav aria-label="Page navigation">
                        <ul className="flex justify-center gap-1">
                              <li
                                    onClick={() => {
                                          // Only handle previous click if we're not in first page.
                                          if (currentPage > 1) {
                                                onPreviousClick();
                                          }
                                    }}
                              >
                                    <span
                                          className={`px-3 py-1 rounded-md 
                                                ${
                                                      currentPage > 1
                                                            ? "text-primary hover:bg-primary-mute"
                                                            : "text-inactive"
                                                }
                                          `}
                                          role="button"
                                    >
                                          <i className="bi bi-chevron-left"></i> Previous
                                    </span>
                              </li>

                              {pageList.map((i) => {
                                    return (
                                          <li key={i} onClick={() => onPageChange(i)}>
                                                <span
                                                      className={`text-primary font-bold  px-3 py-1 rounded-md 
                                                            ${i === currentPage && "bg-primary-mute"}
                                                            hover:bg-primary-mute
                                                      `}
                                                      role="button"
                                                >
                                                      {i}
                                                </span>
                                          </li>
                                    );
                              })}

                              {lastPageNumber !== totalPages ? (
                                    <li className="page-item">
                                          <span
                                                className="text-primary font-bold px-3 py-1 rounded-md
                                                      hover:bg-primary-mute
                                                "
                                                role="button"
                                          >
                                                ...
                                          </span>
                                    </li>
                              ) : null}

                              <li
                                    onClick={() => {
                                          // Only handle next click if we're not in the lastPageNumber page
                                          if (currentPage < totalPages) {
                                                onNextClick();
                                          }
                                    }}
                              >
                                    <span
                                          className={` px-3 py-1 rounded-md
                                                ${
                                                      currentPage < totalPages
                                                            ? "text-primary hover:bg-primary-mute"
                                                            : "text-inactive"
                                                }
                                                
                                          `}
                                          role="button"
                                    >
                                          Next <i className="bi bi-chevron-right"></i>
                                    </span>
                              </li>
                        </ul>
                  </nav>
            </div>
      );
}
