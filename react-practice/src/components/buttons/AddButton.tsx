interface IAddButton {
      extraClassName?: string;
      title: string;
      buttonClickHandler: () => void;
}

export default function AddButton({ title, buttonClickHandler, extraClassName = "" }: IAddButton) {
      return (
            <button
                  className={`bg-primary text-white tracking-wider rounded-lg p-2 min-w-fit
                        sm:px-6
                        xl:h-fit xl:self-end
                        ${extraClassName}
                  `}
                  onClick={buttonClickHandler}
            >
                  <i className="bi bi-plus"></i>&nbsp;&nbsp;
                  {title}
            </button>
      );
}
