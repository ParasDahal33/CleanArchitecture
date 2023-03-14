import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MultiNavHeadText from "./MultiNavHeadText";
import SubNavItem from "./SubNavItem";
import SubMultiNavHeadText from "./SubMultiNavHeadText";

/**
 * @interface IMultiNavItem
 * - It describe props for MultiNavItem.
 * - It is dropdown button for side nav bar
 *
 * @prop main - describes items for main nav button
 * @prop navChildren - describes list of child nav items
 * @prop changePageHandler - handle page change according to page number
 */
interface IMultiNavItem {
      isThisSubMultiNav?: boolean;
      main: { id: string; name: string; icon: ReactElement };
      changePageHandler: (pageName: string) => void;
      navChildren: { name: string; path: string; icon: ReactElement }[];
      multiSubNav?: any;
}

/**
 * @component MultiNavItem
 * - It describes navigation with multiple sub nav bar
 * - Its drop down navItem
 *
 * @param IMultiNavItem
 *
 * @returns ReactElement
 */
function MultiNavItem({
      main,
      navChildren,
      changePageHandler,
      multiSubNav,
      isThisSubMultiNav = false,
}: IMultiNavItem) {
      const location = useLocation();
      const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>();

      useEffect(() => {
            if (isThisSubMultiNav) {
                  setIsSubNavOpen(
                        /**
                         * remove `/` from path
                         * remove first item i.e ''
                         * get send item of that list
                         * and compare with id
                         */
                        location.pathname.split("/").splice(1).at(1) === main.id.toLocaleLowerCase()
                  );

                  return;
            }

            setIsSubNavOpen(
                  // removing start '/' from location path [ /user/staff --> user/staff]
                  // and check if location path start with the name of page title
                  location.pathname
                        .substring(1, location.pathname.length)
                        .startsWith(main.id.toLocaleLowerCase())
            );
      }, [location.pathname]);

      return (
            <div className="p-0 m-0 flex flex-col gap-1">
                  <main
                        id="nav-item"
                        className={`cursor-pointer font-medium rounded-lg px-3 py-1 ${
                              isSubNavOpen && "nav-selected bg-side-nav-selected"
                        }`}
                        onClick={() => setIsSubNavOpen((prevState) => !prevState)}
                  >
                        <div className="flex justify-between">
                              {!isThisSubMultiNav && (
                                    <MultiNavHeadText
                                          icon={main.icon}
                                          name={main.name}
                                          isSubNavOpen={!isSubNavOpen}
                                    />
                              )}

                              {isThisSubMultiNav && (
                                    <SubMultiNavHeadText
                                          icon={main.icon}
                                          name={main.name}
                                          isSubNavOpen={!isSubNavOpen}
                                    />
                              )}
                        </div>
                  </main>

                  <section hidden={!isSubNavOpen} className="px-1">
                        {navChildren.map(({ path, name, icon }, index) => {
                              return (
                                    <SubNavItem
                                          key={index}
                                          name={name}
                                          path={path}
                                          icon={icon}
                                          clickHandler={() => changePageHandler(path)}
                                    />
                              );
                        })}

                        <div className="mt-1">{multiSubNav}</div>
                  </section>
            </div>
      );
}

export default MultiNavItem;
