import { UseFormRegisterReturn } from "react-hook-form";

/**
 * Used in staff extension and staff whereAbout page for search.
 * @returns JSX element
 */
interface ISearchInput {
      label: string;
      id: string;
      type: string;
      placeHolder: string;
      children: UseFormRegisterReturn<string>;
}

function SearchInput({ label, id, type, placeHolder, children }: ISearchInput) {
      return (
            <span className="self-end w-full">
                  <label htmlFor={id} className="font-[600] tracking-wide">
                        {label}
                  </label>

                  <input
                        id={id}
                        type={type}
                        className="border border-mute-gray bg-white rounded-lg p-1 m-0 w-full
                              outline-none focus-within:ring-0
                        "
                        placeholder={placeHolder}
                        {...children}
                  />
            </span>
      );
}

export default SearchInput;
