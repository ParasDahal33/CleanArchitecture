import noDataImg from "../../assets/image/not-data.png";

interface INoDataMessageSmall {
      isStatusSucceed: boolean;
      toShow: boolean;
      pageName: string;
      changePageHandler: () => void;
}

function NoDataMessageSmall({ changePageHandler, pageName, toShow, isStatusSucceed }: INoDataMessageSmall) {
      if (!toShow || !isStatusSucceed) return null;

      return (
            <div className="flex flex-col justify-center gap-3 py-4 tracking-wide">
                  <picture className="flex justify-center">
                        <img className="w-20" src={noDataImg} alt="not-found" />
                  </picture>
                  <span>
                        <p className="text-lg text-center font-semibold">No data found !!</p>

                        <p className="text-center">
                              <span
                                    className="text-primary cursor-pointer underline"
                                    onClick={changePageHandler}
                              >
                                    <ins>Go to {pageName} page</ins>
                              </span>
                              &nbsp;to add new
                        </p>
                  </span>
            </div>
      );
}

export default NoDataMessageSmall;
