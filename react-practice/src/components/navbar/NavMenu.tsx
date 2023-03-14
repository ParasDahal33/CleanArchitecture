import { useEffect } from "react";
import NavProfile from "./navItems/NavProfile";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { alterNavMenuState, closeNavMenuItem } from "../sidebar/navSlice";
import "./NavMenu.css";

export default function NavMenu() {
      const dispatch = useAppDispatch();
      const navState = useAppSelector((state) => state.nav);

      /**
       * it checks if the nav menu item drop down is open
       * when mouse is down
       * and close if it is open
       */
      const onBodyClick = (e: MouseEvent) => {
            const menuElement = document.getElementById("nav-menu");

            if (e.target !== menuElement && !menuElement?.contains(e.target as Node)) {
                  //looping over nav menu drop downs
                  Array.from(document.getElementsByClassName("nav__item-menu")).forEach(function (item) {
                        // check if the drop down element have active class name
                        item.classList.contains("active") &&
                              // Close the navigation menu when user clicks anywhere on the body.
                              dispatch(closeNavMenuItem());
                  });
            }
      };

      useEffect(() => {
            document.body.addEventListener("mousedown", onBodyClick, false);
      }, []);

      return (
            <nav id="nav-menu" className="flex gap-6">
                 

                  <NavProfile
                        viewOrCloseItem={() => dispatch(alterNavMenuState("profile"))}
                        isActive={navState.navItem.name === "profile" && !navState.navItem.isClosed}
                  />
            </nav>
      );
}
