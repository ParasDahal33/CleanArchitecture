import { createSearchParams, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import MultiNavItem from "./multiNav/MultiNavItem";
import { useAppSelector } from "../../app/hooks";

export default function SideNav() {
      const navigate = useNavigate();
      const navState = useAppSelector((state) => state.nav);

      const changePageHandler = (pageName: string): void => {
            navigate({
                  pathname: pageName,
                  search: createSearchParams({
                        pageNumber: "1",
                  }).toString(),
            });
      };

      return (
            <>
                  <nav
                        id="side-nav"
                        className={`h-[100%] bg-side-nav text-white fixed left-0 pt-[7rem] duration-[0.5s]
                              1xl:h-auto 1xl:relative
                              ${navState.isSideClosed ? "w-[0px]" : "w-[320px]"}
                        `}
                  >
                        <section
                              className={`inner_side-nav flex flex-col gap-2 mx-3
                                    1xl:mr-4 1xl:sticky 1xl:top-[110px]
                                    ${
                                          navState.isSideClosed
                                                ? "invisible w-[0px] duration-[0.2s]"
                                                : "visible w-[294px] duration-[0.7s]"
                                    }
                              `}
                        >
                              <NavItem
                                    name="Dashboard"
                                    path="/"
                                    hasParams={true}
                                    onClick={() => navigate("/")}
                                    icon={<i className="bi bi-command"></i>}
                              />

                                    <>
                                          
                                          <MultiNavItem
                                                main={{
                                                      id: "administration", // it should match with url
                                                      name: "Administration ",
                                                      icon: <i className="bi bi-bank"></i>,
                                                }}
                                                navChildren={[
                                                      {
                                                            name: "Users",
                                                            path: "users",
                                                            icon: <i className="bi bi-box2-heart"></i>,
                                                      },
                                                      
                                                ]}
                                               
                                                changePageHandler={changePageHandler}
                                          />
                                    </>
                        </section>

                        
                  </nav>
            </>
      );
}
