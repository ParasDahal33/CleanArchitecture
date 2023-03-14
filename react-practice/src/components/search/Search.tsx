import React, { useEffect, useMemo, useState } from "react";
interface SearchProps {
      // it is the name of search param URL search value key
      searchedURLKey: string;
      searchedValue: (value: string) => void;
      inputClearHandler: () => void;
}

export default function Search({ inputClearHandler, searchedValue, searchedURLKey }: SearchProps) {
      const [searchValue, setSearchValue] = useState("");
      const urlParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
      const searchedData = urlParams.get(searchedURLKey) || "";

      const inputChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            if (target.value === "") inputClearHandler();

            setSearchValue(target.value);
      };

      const submitButtonHandler = (e: any) => {
            e.preventDefault();

            searchedValue(searchValue.trim());
      };

      useEffect(() => {
            setSearchValue(searchedData);
      }, [searchedData]);

      return (
            <form
                  id="search-input-container"
                  className="flex w-auto
                        focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:rounded-lg
                  "
            >
                  <input
                        id="search-input"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={inputChangeHandler}
                        className="border border-primary bg-white rounded-l-lg p-1 m-0 w-4/5 
                              focus-within:border-none focus-within:outline-none
                        "
                  />

                  <button
                        type="submit"
                        className="bg-primary text-white rounded-r-lg p-2 w-2/5"
                        onClick={submitButtonHandler}
                  >
                        <i className="bi bi-search"></i>&nbsp;&nbsp;Search
                  </button>
            </form>
      );
}
