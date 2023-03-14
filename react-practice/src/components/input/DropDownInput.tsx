import { UseFormRegisterReturn } from "react-hook-form";
import InvalidMessage from "../error/InvalidMessage";
import RequiredIcon from "../RequiredIcon";

interface IDropDownInput {
      label: string;
      id: string;
      haveError: boolean;
      errorMessage: string | undefined;
      status: any;
      children: UseFormRegisterReturn<string>;
}

// this component only works if the enum value is in string
function DropDownInput({ label, id, haveError, errorMessage, status, children }: IDropDownInput) {
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

                        <InvalidMessage toShow={haveError} message={errorMessage} />
                  </section>
                  <select
                        className="w-full px-3 py-[0.375rem] bg-white border border-mute-gray rounded-md
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

export default DropDownInput;
