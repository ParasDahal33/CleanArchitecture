import { ReactNode } from "react";
import "./table.css";
import getSortIconClassName from "../../utils/getSortIconClassName";

interface ITable {
      children: ReactNode;
      isScrollable?: boolean;
      onScrollHandler?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

export function Table({ isScrollable = false, children, onScrollHandler }: ITable) {
      return (
            <div
                  id="table-container"
                  className={`overflow-x-auto ${isScrollable ? "block max-h-[30rem]" : ""}`}
                  onScroll={(event) => {
                        if (!isScrollable || !onScrollHandler) return;

                        onScrollHandler(event);
                  }}
            >
                  <table className="w-full text-base text-center">{children}</table>
            </div>
      );
}

interface ITableHead {
      children: ReactNode;
      isFixed?: boolean;
}

export function TableHead({ isFixed = false, children }: ITableHead) {
      return <thead className={`tracking-wide ${isFixed ? "head__fixed " : ""}`}>{children}</thead>;
}

interface ISortingTH {
      handlerSort: (event: any) => void;
      name: string;
      title: string;
      isCentered?: boolean;
      className?: string;
}
export function SortingTH({ handlerSort, name, title, isCentered = false, className = "" }: ISortingTH) {
      return (
            <th scope="col" className={className}>
                  <div
                        id={name}
                        onClick={handlerSort}
                        className={`flex items-center gap-2 cursor-pointer ${
                              isCentered ? "justify-center" : ""
                        } `}
                  >
                        {title}
                        <i id={name} className={`${getSortIconClassName(name)}`}></i>
                  </div>
            </th>
      );
}

interface TableBody {
      children: ReactNode;
      isStatusSucceed: boolean;
      isFixed?: boolean;
}

export function TableBody({ isStatusSucceed, children, isFixed }: TableBody) {
      if (!isStatusSucceed) return null;

      return <tbody className={`${isFixed ? "relative -z-10" : ""}`}>{children}</tbody>;
}
