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

interface IMultiMobileInput<T extends FieldValues> {
      label?: string;
      isRequired?: boolean;
      isFormReset: boolean;
      filedName: Path<T>;
      clearErrorhandler: () => void;
      register: UseFormRegister<T>;
      setValueHandler: UseFormSetValue<T>;
      contactNumberData: PathValue<T, Path<T>>;
      selectedContactNumberData?: PathValue<T, Path<T>>;
      contactNumberError?: Merge<FieldError, (FieldError | undefined)[]>;
}

function MultiMobileInput<T extends FieldValues>({
      label = "Phone No.",
      isRequired = true,
      isFormReset,
      filedName, // field name for mobile in hook form
      register, // it is register of hook form
      contactNumberData,
      setValueHandler, // it is setValue of hook form
      contactNumberError, // Error from mobile input
      clearErrorhandler, // clears all input validation errors
      selectedContactNumberData, // selectedContactNumberData, it basically have value while editing the form
}: IMultiMobileInput<T>) {
      // total number is phone inputs to be shown
      const [totalPhoneNumber, setTotalPhoneNumber] = useState<number>(1);

      const MAXIMUM_INPUTS = 3;

      // Removes the select contact number input from form
      const removeButtonHandler = ({ target: { id } }: any) => {
            //if there is only one input don't allow to remove
            if (totalPhoneNumber <= 1) return;

            // remove the selected input by index
            contactNumberData.splice(parseInt(id), 1);

            // set for hook form
            setValueHandler(filedName as Path<T>, contactNumberData);

            clearErrorhandler();

            // decrease totalPhoneNumber state count
            setTotalPhoneNumber((prev) => prev - 1);
      };

      // add new contact number field
      const addButtonHandler = () => {
            // increase totalPhoneNumber state count
            setTotalPhoneNumber((prev) => (prev < MAXIMUM_INPUTS ? prev + 1 : prev));

            clearErrorhandler();
      };

      useEffect(() => {
            // This effect sets the total phone number count based on the previously selected mobile number data.
            // If there is any previously selected mobile number (selectedContactNumberData) list, the effect adds the list length as the default value.
            // If selectedContactNumberData is empty, the effect adds 1 as the default value.
            setTotalPhoneNumber(
                  selectedContactNumberData && selectedContactNumberData.length
                        ? selectedContactNumberData.length
                        : 1
            );
      }, []);

      useEffect(() => {
            if (!isFormReset) return;
            // if formResets', Set the form contact value to selected contact detail [this usually occurs while editing]
            // or else set to empty list [this usually occurs while adding]
            setValueHandler(
                  filedName as Path<T>,
                  selectedContactNumberData || ([] as PathValue<T, Path<T>>),
                  {
                        shouldValidate: true,
                  }
            );

            // sets the number of `totalPhoneNumber` to 1 if `selectedContactNumberData` is undefined,
            // or to the length of selectedContactNumberData if it's defined and has a length greater than 0. else set to 1
            setTotalPhoneNumber(
                  selectedContactNumberData && selectedContactNumberData.length
                        ? selectedContactNumberData.length
                        : 1
            );
      }, [isFormReset]);

      return (
            <div className="flex flex-col gap-4 w-full">
                  {Array.from({ length: totalPhoneNumber }).map((_, index) => (
                        <section key={`${filedName}${index}`} className="w-full flex align-middle gap-2">
                              <Input
                                    label={`${label} ${index + 1}`}
                                    id={`multiNo.${index}`}
                                    isRequired={isRequired}
                                    type="text"
                                    haveError={
                                          //contactNumberError is not undefined check error by index
                                          contactNumberError
                                                ? !!contactNumberError[index]
                                                : !!contactNumberError
                                    }
                                    errorMessage={
                                          //contactNumberError is not undefined check error message by index
                                          contactNumberError
                                                ? contactNumberError[index]?.message
                                                : contactNumberError
                                    }
                              >
                                    {register(`${filedName}.${index}` as Path<T>, {
                                          required: {
                                                value: isRequired,
                                                message: "Cannot be empty !!",
                                          },
                                          pattern: {
                                                value: REGEX.CONTACT_NUMBER,
                                                message: "Please enter a valid mobile number!",
                                          },
                                          setValueAs: (value) => (value ? value.toString().trim() : ""), // check if value is null or undefined before calling trim

                                          value: selectedContactNumberData
                                                ? selectedContactNumberData[index] || ""
                                                : "",
                                    })}
                              </Input>

                              <button
                                    id={index.toString()}
                                    type="button"
                                    title="Number removing button"
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
                  {totalPhoneNumber < MAXIMUM_INPUTS && (
                        <button
                              type="button"
                              title="Number adding button"
                              className="self-center"
                              onClick={addButtonHandler}
                        >
                              <i className="bi bi-plus-square text-success text-2xl"></i>
                        </button>
                  )}
            </div>
      );
}

export default MultiMobileInput;
