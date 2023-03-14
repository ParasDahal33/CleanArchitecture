import { UseFormRegisterReturn } from "react-hook-form";
import RequiredIcon from "../RequiredIcon";
import InvalidMessage from "../error/InvalidMessage";

interface IStatusInput {
      label: string;
      id: string;
      haveError: boolean;
      errorMessage: string | undefined;
      status: any;
      children: UseFormRegisterReturn<string>;
}

function StatusInput({ label, id, haveError, errorMessage, status, children }: IStatusInput) {
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
                        defaultValue={0}
                  >
                        {Object.keys(status).map((statusKey) => {
                              return (
                                    !isNaN(Number(statusKey)) && (
                                          <option key={statusKey} value={statusKey}>
                                                {status[Number(statusKey)]}
                                          </option>
                                    )
                              );
                        })}
                  </select>
            </div>
      );
}

export default StatusInput;
