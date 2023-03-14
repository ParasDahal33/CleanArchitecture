interface IAddButtons {
      closeModal: () => void;
      submitHandler: () => void;
}

export function AddButtons({ closeModal, submitHandler }: IAddButtons) {
      return (
            <span
                  className="flex flex-col gap-4 sm:flex-row w-full 
                        sm:w-fit
                  "
            >
                  <button
                        type="button"
                        id="btn-close"
                        className="text-primary bg-primary-mute rounded-md border-none px-5 py-2
                              ease-in-out duration-300
                              hover:shadow-button
                        "
                        onClick={closeModal}
                  >
                        <i className="bi bi-x-circle"></i>&nbsp;Close
                  </button>

                  <button
                        type="submit"
                        id="btn-submit"
                        className="bg-primary text-white rounded-md border-none px-5 py-2 
                              ease-in-out duration-300
                              hover:shadow-button
                        "
                        onClick={submitHandler}
                  >
                        <i className="bi bi-download"></i>&nbsp;Submit
                  </button>
            </span>
      );
}

interface IUpdateButtons {
      reset: () => void;
      closeModal: () => void;
      updateHandler: () => void;
}

export function UpdateButtons({ reset, closeModal, updateHandler }: IUpdateButtons) {
      return (
            <span
                  className="flex flex-col gap-4 sm:flex-row w-full 
                        sm:w-fit
                  "
            >
                  <button
                        type="reset"
                        id="btn-reset"
                        className="text-primary rounded-md border-none px-5 py-2 
                              ease-in-out duration-300
                              hover:shadow-button
                        "
                        onClick={(e) => {
                              e.preventDefault();

                              reset();
                        }}
                  >
                        <i className="bi bi-arrow-clockwise"></i>&nbsp;Reset
                  </button>

                  <button
                        type="button"
                        id="btn-close"
                        className="text-primary bg-primary-mute rounded-md border-none px-5 py-2 
                              ease-in-out duration-300
                              hover:shadow-button
                        "
                        onClick={closeModal}
                  >
                        <i className="bi bi-x-circle"></i>&nbsp;Close
                  </button>

                  <button
                        type="submit"
                        id="btn-submit"
                        className="bg-primary text-white rounded-md border-none px-5 py-2 
                              ease-in-out duration-300
                              hover:shadow-button
                        "
                        onClick={updateHandler}
                  >
                        <i className="bi bi-download"></i>&nbsp; Save Changes
                  </button>
            </span>
      );
}
