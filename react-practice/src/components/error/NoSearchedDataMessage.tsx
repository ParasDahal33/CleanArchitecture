import NoDataImg from "../../assets/image/no-data.png";

interface INoSearchedDataMessage {
      toShow?: boolean;
      isStatusSucceed?: boolean;
      actionHandler: () => void;
}

function NoSearchedDataMessage({
      actionHandler,
      toShow = true,
      isStatusSucceed = true,
}: INoSearchedDataMessage) {
      if (!isStatusSucceed || !toShow) return null;

      return (
            <div
                  className="flex justify-center text-center text-default text-lg mb-32 
                              sm:mb-0 sm:text-2xl
                        "
            >
                  <span className="flex flex-col align-middle gap-4">
                        <picture className="self-center">
                              <img
                                    className=" w-48 
                                          sm:w-64
                                    "
                                    src={NoDataImg}
                                    alt="not found"
                              />
                        </picture>

                        <section className="flex flex-col gap-3">
                              <h1
                                    className="text-link text-3xl 
                                          sm:text-4xl
                                    "
                              >
                                    Sorry!! No result found
                              </h1>

                              <h5>No Data matched your search</h5>

                              <p
                                    className="text-lg text-primary cursor-pointer underline"
                                    onClick={actionHandler}
                              >
                                    <ins>click to view all data</ins>
                              </p>
                        </section>
                  </span>
            </div>
      );
}

export default NoSearchedDataMessage;
