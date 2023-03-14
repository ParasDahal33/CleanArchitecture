import { createSearchParams, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import MultiNavItem from "./multiNav/MultiNavItem";
import { useAppSelector } from "../../app/hooks";
import FeedBackIcon from "../feedback/FeedBackIcon";
import AccessGuard from "../../helpers/AccessGuard";
import { UserRole, UserType } from "../../helpers/constants";
import AuthorizationGuard from "../../helpers/AuthorizationGuard";

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

                              <AccessGuard allowedUsers={[UserType.Staff]}>
                                    <>
                                          <MultiNavItem
                                                main={{
                                                      id: "staff", // it should match with url
                                                      name: "Staff details",
                                                      icon: <i className="bi bi-person-fill"></i>,
                                                }}
                                                navChildren={[
                                                      {
                                                            name: "Staff",
                                                            path: "staff",
                                                            icon: <i className="bi bi-person"></i>,
                                                      },
                                                      {
                                                            name: "Extension",
                                                            path: "staff/extension",
                                                            icon: <i className="bi bi-telephone-plus"></i>,
                                                      },
                                                      {
                                                            name: "Staff whereabouts",
                                                            path: "staff/whereabouts",
                                                            icon: <i className="bi bi-clock-history"></i>,
                                                      },
                                                ]}
                                                changePageHandler={changePageHandler}
                                          />

                                          <MultiNavItem
                                                main={{
                                                      id: "client", // it should match with url
                                                      name: "Client",
                                                      icon: <i className="bi bi-people-fill"></i>,
                                                }}
                                                navChildren={[
                                                      {
                                                            name: "Local Clients",
                                                            path: "client/local",
                                                            icon: <i className="bi bi-people-fill"></i>,
                                                      },
                                                      {
                                                            name: "International Clients",
                                                            path: "client/international",
                                                            icon: <i className="bi bi-people-fill"></i>,
                                                      },
                                                ]}
                                                changePageHandler={changePageHandler}
                                          />

                                          <MultiNavItem
                                                main={{
                                                      id: "operation", // it should match with url
                                                      name: "Operations",
                                                      icon: <i className="bi bi-pc-display-horizontal"></i>,
                                                }}
                                                navChildren={[
                                                      {
                                                            name: "Restore Log",
                                                            path: "operation/restore-log",
                                                            icon: <i className="bi bi-bootstrap-reboot"></i>,
                                                      },
                                                      {
                                                            name: "Leave Application",
                                                            path: "operation/leave-application",
                                                            icon: (
                                                                  <i className="bi bi-journal-bookmark-fill"></i>
                                                            ),
                                                      },
                                                ]}
                                                changePageHandler={changePageHandler}
                                          />

                                          <MultiNavItem
                                                main={{
                                                      id: "administration", // it should match with url
                                                      name: "Administration ",
                                                      icon: <i className="bi bi-bank"></i>,
                                                }}
                                                navChildren={[
                                                      {
                                                            name: "Product",
                                                            path: "administration/product",
                                                            icon: <i className="bi bi-box2-heart"></i>,
                                                      },
                                                      {
                                                            name: "Departments",
                                                            path: "administration/department",
                                                            icon: <i className="bi bi-building"></i>,
                                                      },
                                                ]}
                                                multiSubNav={
                                                      <AuthorizationGuard
                                                            allowedRoles={[UserRole.Admin, UserRole.Manager]}
                                                      >
                                                            <MultiNavItem
                                                                  main={{
                                                                        id: "user-logins", // it should match with url
                                                                        name: "User logins",
                                                                        icon: (
                                                                              <i className="bi bi-person-video3"></i>
                                                                        ),
                                                                  }}
                                                                  navChildren={[
                                                                        {
                                                                              name: "Staff logins",
                                                                              path: "administration/user-logins/staff",
                                                                              icon: (
                                                                                    <i className="bi bi-person"></i>
                                                                              ),
                                                                        },
                                                                        {
                                                                              name: "Client logins",
                                                                              path: "administration/user-logins/client",
                                                                              icon: (
                                                                                    <i className="bi bi-person"></i>
                                                                              ),
                                                                        },
                                                                  ]}
                                                                  isThisSubMultiNav={true}
                                                                  changePageHandler={changePageHandler}
                                                            />
                                                      </AuthorizationGuard>
                                                }
                                                changePageHandler={changePageHandler}
                                          />
                                    </>
                              </AccessGuard>
                        </section>

                        <FeedBackIcon />
                  </nav>
            </>
      );
}
