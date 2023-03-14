import React, { useEffect, useState } from "react";
interface IRealTimeSearchInput {
      searchedValue: (value: string) => void;
      inputClearHandler: () => void;
}

//input for real time search for modal
export default function RealTimeSearchInput({ searchedValue, inputClearHandler }: IRealTimeSearchInput) {
      const [searchValue, setSearchValue] = useState("");

      const inputChangeHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            if (value.trim() === "") inputClearHandler();

            setSearchValue(value.trim());
      };

      useEffect(() => {
            if (searchValue === "") return;

            // only search when user stop typing after 6ms
            const timer = setTimeout(() => searchedValue(searchValue), 600);

            return () => clearTimeout(timer);
      }, [searchValue]);

      useEffect(() => {
            // focus input when model mounts
            document.getElementById("real-search-input")?.focus();
      }, []);

      return (
            <form
                  id="search-input-container"
                  className="flex w-auto
                        focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:rounded-lg
                  "
            >
                  <input
                        id="real-search-input"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={inputChangeHandler}
                        className="border border-primary bg-white rounded-lg p-1 m-0 w-full
                              focus-within:border-none focus-within:outline-none
                        "
                  />
            </form>
      );
}
