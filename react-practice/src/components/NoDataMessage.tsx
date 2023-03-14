import NoDataImg from "../assets/image/empty.png";

interface NoDataMessageProps {
      message: string;
      haveData: boolean;
      isStatusSucceed: boolean;
}

function NoDataMessage({ isStatusSucceed, haveData, message }: NoDataMessageProps) {
      if (!isStatusSucceed || !haveData) return null;

      return (
            <div
                  className="flex justify-center text-center text-default text-lg mb-32 
                        sm:mb-0 sm:text-2xl
                  "
            >
                  <span className="flex flex-col align-middle gap-4">
                        <picture className="self-center">
                              <img
                                    className="w-20 
                                          sm:w-36
                                    "
                                    src={NoDataImg}
                                    alt="not-found"
                              />
                        </picture>

                        <section className="flex flex-col gap-2">
                              <h1
                                    className="text-danger text-3xl 
                                          sm:text-4xl
                                    "
                              >
                                    Sorry!! No data found
                              </h1>

                              <h5>Click upper right NEW button to add new {message}</h5>
                        </section>
                  </span>
            </div>
      );
}

export default NoDataMessage;
