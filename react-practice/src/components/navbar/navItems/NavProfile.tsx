import { useNavigate } from "react-router-dom";
import { closeNavMenuItem } from "../../sidebar/navSlice";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import useAuthApiRequest from "../../../hooks/auth/useAuthApiRequest";
import getLoggedinUserFirstName from "../../../utils/getLoggedinUserFirstName";
import FeedBackModal from "../../feedback/FeedBackModal";
import { cookiesStore } from "../../../utils/cookiesHandler";

interface INavProfile {
      viewOrCloseItem: () => void;
      isActive: boolean;
}

function NavProfile({ viewOrCloseItem, isActive }: INavProfile) {
      const navigate = useNavigate();
      const dispatch = useAppDispatch();
      const { logout } = useAuthApiRequest();
      const [showFeedBack, setShowFeedBack] = useState(false);

      const logoutHandler = () => {
            const isNewUser = cookiesStore.getItem("isNewUser") || true;

            if (isNewUser) {
                  setShowFeedBack(true);
                  return;
            }

            logout();
      };

      const moveToProfilePageHandler = () => {
            navigate("/profile");

            dispatch(closeNavMenuItem());
      };

      const moveToChangePasswordHandler = () => {
            navigate("/profile/change-password");

            dispatch(closeNavMenuItem());
      };

      return (
            <section className="nav-menu__item action flex flex-col justify-center">
                  <div className="profile" onClick={viewOrCloseItem}>
                        <span className={`flex gap-1 cursor-pointer ${isActive && "active"}`}>
                              <p className="bi bi-person-circle text-end p-0 text-3xl"></p>

                              <p className="text-lg font-bold tracking-wider">{getLoggedinUserFirstName()}</p>

                              <p className="bi bi-caret-down-fill text-end pt-1 p-0"></p>
                        </span>
                  </div>

                  <div
                        className={`nav__item-menu profile-menu w-50 top-10 right-2 absolute p-4 text-default bg-white rounded-2xl shadow-xl 
                              lg:right-7
                              ${isActive && "active"} 
                        `}
                  >
                        <ul className="flex flex-col gap-2 p-3">
                              <li
                                    className="flex gap-3 pb-2 cursor-pointer hover:text-primary"
                                    onClick={moveToProfilePageHandler}
                              >
                                    <i className="bi bi-person-badge"></i>
                                    <span>My profile</span>
                              </li>

                              <li
                                    className="flex gap-3 pb-2 cursor-pointer hover:text-primary"
                                    onClick={moveToChangePasswordHandler}
                              >
                                    <i className="bi bi-gear"></i>
                                    <span>Settings</span>
                              </li>

                              <li
                                    className="flex gap-3 cursor-pointer hover:text-primary"
                                    onClick={logoutHandler}
                              >
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Logout</span>
                              </li>
                        </ul>
                  </div>

                  <FeedBackModal
                        toShow={showFeedBack}
                        closeModal={() => {
                              setShowFeedBack(false);

                              logout();
                        }}
                  />
            </section>
      );
}

export default NavProfile;
