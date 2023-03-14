import { UseFormRegisterReturn } from "react-hook-form";
import RequiredIcon from "../RequiredIcon";
import InvalidMessage from "../error/InvalidMessage";

interface IInput {
      label: string;
      id: string;
      type?: string;
      isHidden?: boolean;
      haveError: boolean;
      errorMessage: string | undefined;
      isRequired: boolean;
      children: UseFormRegisterReturn<string>;
}

function Input({
      label,
      id,
      type = "text",
      isHidden,
      haveError,
      errorMessage,
      isRequired,
      children,
}: IInput) {
      return (
            <div className={`${isHidden ? "mb-2" : "flex flex-col gap-1 w-full self-start"}`}>
                  <section className="flex gap-1">
                        <label htmlFor={id} className="tracking-wide font-semibold">
                              {label}&nbsp;
                              {isRequired && <RequiredIcon />}
                        </label>

                        <InvalidMessage toShow={haveError} message={errorMessage} />
                  </section>

                  <input
                        className="w-full px-3 py-[0.375rem] bg-white border border-mute-gray rounded-md 
                              outline-none focus-within:ring-0
                        "
                        autoComplete="nope" //[SEE: https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off]
                        id={id}
                        type={type}
                        hidden={isHidden}
                        {...children}
                  />
            </div>
      );
}

export default Input;
