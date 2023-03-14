import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import useAuth from "../../hooks/auth/useAuth";
import { useAppDispatch } from "../../app/hooks";
import CanView from "../../helpers/CanView";
import { Status } from "../../helpers/constants";
import { alterSideBarState } from "../sidebar/navSlice";
import OfficeLogo from "../../assets/image/mbnepal-portal.png";
import favIcon from "../../assets/image/favicon.ico";

export default function NavBar() {
      const navigate = useNavigate();
      const { isLoggedIn } = useAuth();
      const dispatch = useAppDispatch();

      return (
            <nav
                  id="nav-bar"
                  className="flex justify-between fixed z-[1] w-screen px-5 py-3 bg-white border-b-[1px] border-[#e6dede] h-fit
                        sm:py-2
                        lg:px-12
                  "
            >
                  <section className="flex gap-4 p-0 h-fit">
                        {isLoggedIn !== Status.Succeeded && (
                              <img
                                    id="nav-img-logo"
                                    className="w-[15rem] h-[3rem] object-cover cursor-pointer"
                                    onClick={() => {
                                          navigate("/");
                                    }}
                                    src={OfficeLogo}
                              />
                        )}

                        {isLoggedIn === Status.Succeeded && (
                              <>
                                    <img
                                          id="nav-img-logo"
                                          className="object-cover cursor-pointer hidden 
                                                2sm:w-[12rem] 2sm:h-fit
                                                2sm:block
                                                sm:w-[19rem] sm:h-[4rem] 
                                          "
                                          onClick={() => {
                                                navigate("/");
                                          }}
                                          src={OfficeLogo}
                                    />

                                    <img
                                          id="nav-img-logo"
                                          className="w-[2rem] h-[2rem] object-cover cursor-pointer self-center  
                                                2sm:hidden
                                          "
                                          onClick={() => {
                                                navigate("/");
                                          }}
                                          src={favIcon}
                                    />
                              </>
                        )}

                        <CanView onlyIf={isLoggedIn === Status.Succeeded}>
                              <div className="flex flex-col justify-center text-4xl font-extrabold text-center cursor-pointer">
                                    <i
                                          id="nav-menu-icon"
                                          onClick={() => dispatch(alterSideBarState())}
                                          className="bi bi-list"
                                    ></i>
                              </div>
                        </CanView>
                  </section>

                  {/* only show if user is logged in  */}
                  {isLoggedIn === Status.Succeeded && <NavMenu />}
            </nav>
      );
}
