import { useEffect, useState } from "react";
import {
      FieldError,
      FieldValues,
      Merge,
      Path,
      PathValue,
      UseFormRegister,
      UseFormSetValue,
} from "react-hook-form";
import Input from "./Input";
import { REGEX } from "../../helpers/regex";

interface IMultipleEmailInput<T extends FieldValues> {
      label?: string;
      isRequired?: boolean;
      isFormReset: boolean;
      filedName: Path<T>;
      clearErrorhandler: () => void;
      register: UseFormRegister<T>;
      setValueHandler: UseFormSetValue<T>;
      emailAddressData: PathValue<T, Path<T>>;
      selectedEmailAddressData?: PathValue<T, Path<T>>;
      emailAddressError?: Merge<FieldError, (FieldError | undefined)[]>;
}

/**NOTE:
 * make sure to check the multiple email list have empty value or not
 * before submitting the form
 */

function MultipleEmailInput<T extends FieldValues>({
      label = "Email",
      isRequired = false,
      isFormReset,
      filedName, // field name for mobile in hook form
      register, // it is register of hook form
      emailAddressData,
      setValueHandler, // it is setValue of hook form
      emailAddressError, // Error from mobile input
      clearErrorhandler, // clears all input validation errors
      selectedEmailAddressData, // selectedEmailAddressData, it basically have value while editing the form
}: IMultipleEmailInput<T>) {
      // total number is email inputs to be shown
      const [totalEmailAddress, setTotalEmailAddress] = useState<number>(1);

      const MAXIMUM_INPUTS = 3;

      // Removes the select contact number input from form
      const removeButtonHandler = ({ target: { id } }: any) => {
            //if there is only one input don't allow to remove
            if (totalEmailAddress <= 1) return;

            // remove the selected input by index
            emailAddressData.splice(parseInt(id), 1);

            // set for hook form
            setValueHandler(filedName as Path<T>, emailAddressData);

            clearErrorhandler();

            // decrease totalPhoneNumber state count
            setTotalEmailAddress((prev) => prev - 1);
      };

      // add new contact number field
      const addButtonHandler = () => {
            // increase totalEmailAddress state count
            setTotalEmailAddress((prev) => (prev < MAXIMUM_INPUTS ? prev + 1 : prev));

            clearErrorhandler();
      };

      useEffect(() => {
            // This effect sets the total phone number count based on the previously selected mobile number data.
            // If there is any previously selected mobile number (selectedEmailAddressData) list, the effect adds the list length as the default value.
            // If selectedEmailAddressData is empty, the effect adds 1 as the default value.
            setTotalEmailAddress(
                  selectedEmailAddressData && selectedEmailAddressData.length
                        ? selectedEmailAddressData.length
                        : 1
            );
      }, []);

      useEffect(() => {
            if (!isFormReset) return;
            // if formResets', Set the form contact value to selected contact detail [this usually occurs while editing]
            // or else set to empty list [this usually occurs while adding]
            setValueHandler(filedName as Path<T>, selectedEmailAddressData || ([] as PathValue<T, Path<T>>), {
                  shouldValidate: true,
            });

            // sets the number of `totalEmailAddress` to 1 if `selectedEmailAddressData` is undefined,
            // or to the length of selectedEmailAddressData if it's defined and has a length greater than 0. else set to 1
            setTotalEmailAddress(
                  selectedEmailAddressData && selectedEmailAddressData.length
                        ? selectedEmailAddressData.length
                        : 1
            );
      }, [isFormReset]);

      return (
            <div className="flex flex-col gap-4 w-full">
                  {Array.from({ length: totalEmailAddress }).map((_, index) => (
                        <section key={`${filedName}${index}`} className="w-full flex align-middle gap-2">
                              <Input
                                    label={`${label} ${index + 1}`}
                                    id={`multiEmail.${index}`}
                                    isRequired={isRequired}
                                    type="email"
                                    haveError={
                                          //emailAddressError is not undefined check error by index
                                          emailAddressError ? !!emailAddressError[index] : !!emailAddressError
                                    }
                                    errorMessage={
                                          //emailAddressError is not undefined check error message by index
                                          emailAddressError
                                                ? emailAddressError[index]?.message
                                                : emailAddressError
                                    }
                              >
                                    {register(`${filedName}.${index}` as Path<T>, {
                                          required: {
                                                value: isRequired,
                                                message: "Cannot be empty !!",
                                          },
                                          pattern: {
                                                value: REGEX.Email,
                                                message: "Invalid email address !!",
                                          },
                                          setValueAs: (value) => (value ? value.trim() : ""), // check if value is null or undefined before calling trim
                                          value:
                                                selectedEmailAddressData && !selectedEmailAddressData[index]
                                                      ? selectedEmailAddressData[index]
                                                      : "",
                                    })}
                              </Input>

                              <button
                                    id={index.toString()}
                                    type="button"
                                    title="email removing button"
                                    className="self-center mt-6 w-fit"
                                    onClick={removeButtonHandler}
                              >
                                    <i
                                          id={index.toString()}
                                          className="bi bi-dash-circle text-danger text-lg"
                                    ></i>
                              </button>
                        </section>
                  ))}

                  {/* Allow to add only 3 contact number */}
                  {totalEmailAddress < MAXIMUM_INPUTS && (
                        <button
                              type="button"
                              title="email adding button"
                              className="self-center"
                              onClick={addButtonHandler}
                        >
                              <i className="bi bi-plus-square text-success text-2xl"></i>
                        </button>
                  )}
            </div>
      );
}

export default MultipleEmailInput;
