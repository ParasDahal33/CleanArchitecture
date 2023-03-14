import { ReactElement } from "react";

/**
 * @interface ISubNavItem
 * - It describe props of SubNavItem
 *
 * @prop name - name of page/sub nav item
 * @prop path - nav location/path
 * @prop icon - icon image
 * @props clickHandler - handles page change
 */
interface ISubNavItem {
      name: string;
      path: string;
      icon: ReactElement;
      clickHandler: () => void;
}

/**
 * @component SubNavItem
 * - It describes navigation sub item for side bar
 *
 * @param ISubNavItem
 *
 * @returns ReactElement
 */
function SubNavItem({ name, path, clickHandler, icon }: ISubNavItem) {
      return (
            <div
                  id="nav-item"
                  className={`sub__nav-item cursor-pointer fw-semibold rounded-lg px-3 py-1 mt-1 flex justify-between ${
                        // removing start '/' from location path [ /user/staff --> user/staff]
                        location.pathname.substring(1, location.pathname.length) === path &&
                        "sub-nav-selected bg-side-nav-selected"
                  }`}
                  onClick={clickHandler}
            >
                  {icon}
                  <p className=" font-semibold p- m-0">{name}</p>
            </div>
      );
}

export default SubNavItem;
