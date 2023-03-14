import RequiredIcon from "../RequiredIcon";
import { UseFormRegisterReturn } from "react-hook-form";

interface ISearchDropDown {
      label: string;
      id: string;
      status: any;
      children: UseFormRegisterReturn<string>;
}

// this component only works if the enum value is in string
function SearchDropDown({ label, id, status, children }: ISearchDropDown) {
      //it convert the enum into array
      const convertToArray = (status: any) => {
            const statusArray = [];
            for (const statusType in status) {
                  if (isNaN(Number(statusType))) {
                        statusArray.push({ key: statusType, value: status[statusType] });
                  }
            }

            return statusArray;
      };

      return (
            <div className="flex flex-col gap-1 w-full">
                  <section className="flex gap-1">
                        <label htmlFor={id} className="tracking-wide font-semibold">
                              {label}&nbsp;
                              <RequiredIcon />
                        </label>
                  </section>

                  <select
                        className="w-full p-1 m-0 bg-white border border-mute-gray rounded-md
                              outline-none focus-within:ring-0
                        "
                        id={id}
                        {...children}
                        defaultValue=""
                  >
                        <option value="">---</option>

                        {convertToArray(status).map(({ key, value }) => {
                              return (
                                    <option key={value} value={value}>
                                          {key}
                                    </option>
                              );
                        })}
                  </select>
            </div>
      );
}

export default SearchDropDown;
