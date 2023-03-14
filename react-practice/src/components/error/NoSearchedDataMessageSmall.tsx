import NoDataImg from "../../assets/image/no-data.png";

interface INoSearchedDataMessageSmall {
      toShow?: boolean;
      pageName: string;
      isStatusSucceed?: boolean;
      actionHandler: () => void;
      changePageHandler: () => void;
}

function NoSearchedDataMessageSmall({
      toShow,
      isStatusSucceed,
      actionHandler,
      pageName,
      changePageHandler,
}: INoSearchedDataMessageSmall) {
      if (!isStatusSucceed || !toShow) return null;

      return (
            <div className="flex flex-col justify-center gap-3 py-4 tracking-wide">
                  <picture className="flex justify-center">
                        <img className=" w-40" src={NoDataImg} alt="not-found" />
                  </picture>
                  <span className="flex flex-col gap-1">
                        <p className="text-lg text-center font-semibold">Sorry!! No result found</p>

                        <p className="text-base text-center">No Data matched your search</p>

                        <span className="text-center">
                              <p className="text-primary cursor-pointer underline" onClick={actionHandler}>
                                    <ins>Click to view all</ins>
                              </p>

                              <p>OR</p>

                              <p
                                    className="text-primary cursor-pointer underline"
                                    onClick={changePageHandler}
                              >
                                    <ins>Go to {pageName} page</ins>
                              </p>
                        </span>
                  </span>
            </div>
      );
}

export default NoSearchedDataMessageSmall;
