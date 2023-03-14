import React from "react";
import ErrorImg from "../../assets/image/error.png";

interface IWentWrongMessage {
      isFailed?: boolean;
      errorMessage: string | undefined;
}

function WentWrongMessage({ isFailed=true, errorMessage }: IWentWrongMessage) {
      if(!isFailed) return null;

      return (
            <div
                  className="flex justify-center text-center text-default text-lg mb-32 
                              sm:mb-0 sm:text-2xl
                        "
            >
                  <span className="flex flex-col align-middle gap-4">
                        <picture className="self-center">
                              <img
                                    className="w-40
                                          sm:w-80
                                    "
                                    src={ErrorImg}
                                    alt="went-wrong"
                              />
                        </picture>

                        <section className="flex flex-col gap-3">
                              <h1
                                    className="text-danger text-3xl 
                                          sm:text-4xl
                                    "
                              >
                                    Sorry!! Went wrong
                              </h1>

                              <h5>{errorMessage}</h5>

                              <a
                                    className="text-base text-primary cursor-pointer underline"
                                    href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                              >
                                    contact service provider
                              </a>
                        </section>
                  </span>
            </div>
      );
}

export default WentWrongMessage;
