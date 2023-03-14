import { ReactElement } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import getCurrentPageNames from "../../utils/getCurrentPageNames";

interface HeaderProps {
      children?: ReactElement;
      haveBackButton?: boolean;
      title?: string;
      subtitle?: string;
      path?: { name: string; search?: object };
      extraInfo?: ReactElement; // used in client page for now
}

function Header({ haveBackButton = false, path, children, subtitle, title, extraInfo }: HeaderProps) {
      const navigate = useNavigate();
      const currentPages = getCurrentPageNames();

      const getPageHeading = (): string => {
            let currentPage: string | undefined = currentPages.at(-1);
            // check if the value is string or number
            currentPage = !isNaN(parseInt(currentPage as string)) ? currentPages.at(-2) : currentPage;

            if (currentPage === undefined) return "Dashboard";

            return currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace("-", " ");
      };

      const backHandler = () => {
            navigate({
                  pathname: path?.name,
                  search: createSearchParams({
                        pageNumber: "1",
                  }).toString(),
            });
      };

      return (
            <header className={`d-flex row ${haveBackButton ? "gap-0" : "gap-4"} m-0 mb-5 p-0`}>
                  <section>
                        <p className="text-title font-semibold tracking-wider m-2">
                              {currentPages.map((page, index) => {
                                    // check if the value is string or number
                                    if (isNaN(parseInt(page as string)))
                                          return `${page} ${currentPages.length !== index + 1 ? "> " : ""}`;
                              })}
                        </p>

                        <h1 className="mb-3 text-title font-bold tracking-wider text-4xl">
                              {title || getPageHeading()}
                        </h1>

                        {currentPages.length ? (
                              <>
                                    <h5 className="mb-0 text-base text-mute tracking-wide">
                                          {subtitle ||
                                                `View all your ${currentPages.at(-2) || ""} ${
                                                      isNaN(parseInt(currentPages.at(-1) as string))
                                                            ? (currentPages.at(-1) as string)
                                                            : ""
                                                } information`}
                                    </h5>
                              </>
                        ) : null}

                        {haveBackButton && (
                              <p className="p-0 m-0 cursor-pointer" onClick={backHandler}>
                                    <i
                                          className="bi bi-arrow-left text-link text-4xl 
                                                hover:text-link/80
                                          "
                                    ></i>
                              </p>
                        )}
                  </section>

                  <section className="mt-4">{extraInfo}</section>

                  {children !== undefined && (
                        <section
                              className="flex flex-col justify-end gap-4 align-bottom py-2 px-4 m-0
                                    sm:flex-row
                              "
                        >
                              {children}
                        </section>
                  )}
            </header>
      );
}

export default Header;
