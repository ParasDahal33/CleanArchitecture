import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import InvalidMessage from "../error/InvalidMessage";
import LocationMapModal from "../map/LocationMapModal";

interface ILocationSelectInput {
      isReset: boolean;
      haveError: boolean;
      errorMessage?: string;
      selectedLocationPrev?: string; // location that user have already previously selected
      children: UseFormRegisterReturn<string>;
      submitSelectedLocation: (plusCode?: string) => void;
}

function LocationSelectInput({
      isReset,
      children,
      haveError,
      errorMessage,
      selectedLocationPrev,
      submitSelectedLocation,
}: ILocationSelectInput) {
      const [selectedLocation, setSelectedLocation] = useState<string>();
      const [toShowLocationMapModal, setToShowLocationMapModal] = useState<boolean>(false);

      const showModalHandler = (): void => setToShowLocationMapModal((prevState) => !prevState);

      useEffect(() => {
            // it check if the parent form is being refreshed
            if (!isReset) return;

            setSelectedLocation(selectedLocationPrev);
      }, [isReset]);

      return (
            <>
                  <div className="w-full flex flex-col gap-1">
                        <section className="flex gap-1">
                              <label htmlFor="location" className="tracking-wide font-semibold">
                                    Location (plus code)
                              </label>

                              <InvalidMessage toShow={haveError} message={errorMessage} />
                        </section>

                        <input id="location" type="text" hidden={true} {...children} />

                        <section
                              id="staff"
                              className="w-full p-0 m-0 bg-white border border-mute-gray rounded-md cursor-pointer"
                              onClick={(e) => {
                                    e.preventDefault();

                                    showModalHandler();
                              }}
                        >
                              <button
                                    type="button"
                                    className="mt-0 mb-0 px-3 py-[0.375rem] uppercase rounded-l-md  tracking-wide bg-mute-gray text-default"
                              >
                                    Select
                              </button>

                              <input
                                    readOnly
                                    type="text"
                                    className="mt-0 mb-0 ml-2 cursor-pointer outline-none focus-within:ring-0"
                                    placeholder="Select location"
                                    value={selectedLocation}
                              ></input>
                        </section>
                  </div>

                  {toShowLocationMapModal && (
                        <LocationMapModal
                              needInput
                              toShow={toShowLocationMapModal}
                              plusCode={selectedLocation}
                              closeMap={showModalHandler}
                              submitHandler={(plusCode) => {
                                    setSelectedLocation(plusCode);
                                    submitSelectedLocation(plusCode);
                              }}
                        />
                  )}
            </>
      );
}

export default LocationSelectInput;
