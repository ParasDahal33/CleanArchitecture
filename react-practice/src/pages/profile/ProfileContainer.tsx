import { MouseEvent } from "react";
import { Tab } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import getCurrentPageNames from "../../utils/getCurrentPageNames";

function ProfileContainer() {
      const navigate = useNavigate();

      const changePageHandler = (e: MouseEvent) => {
            const element = e.target as HTMLDivElement;

            const pathName = element.id === "profile" ? "" : element.id;

            navigate("/profile/" + pathName);
      };

      const isOpen = (navName: string) => {
            const currentPage: string | undefined = getCurrentPageNames().at(-1);

            if (currentPage === undefined) return false;

            return currentPage.includes(navName);
      };

      return (
            <div>
                  <Header />

                  <main className="flex justify-center text-base text-default">
                        <span className="w-[70%]">
                              <Tab.Group>
                                    <Tab.List
                                          className="flex gap-4 rounded-lg bg-light-blue/[0.036] w-full py-2 px-4 flex-col
                                                sm:flex-row
                                          "
                                    >
                                          <Tab
                                                id="profile"
                                                className={`w-full rounded-lg p-3 font-semibold leading-5 tracking-wider 
                                                      ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 
                                                      focus:outline-none focus:ring-2
                                                      sm:w-fit
                                                      ${
                                                            isOpen("profile")
                                                                  ? "bg-white shadow"
                                                                  : "text-blue-100 hover:bg-white/[0.12] text-link hover:underline"
                                                      }           
                                                `}
                                                onClick={changePageHandler}
                                          >
                                                Profile Information
                                          </Tab>
                                          <Tab
                                                id="change-password"
                                                className={`w-full rounded-lg p-3 font-semibold leading-5 tracking-wider
                                                      ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 
                                                      focus:outline-none focus:ring-2
                                                      sm:w-fit
                                                      ${
                                                            isOpen("change-password")
                                                                  ? "bg-white shadow"
                                                                  : "text-blue-100 hover:bg-white/[0.12] text-link hover:underline"
                                                      } 
                                                `}
                                                onClick={changePageHandler}
                                          >
                                                Change Password
                                          </Tab>
                                    </Tab.List>

                                    <Tab.Panels>
                                          <section className="border rounded-md border-mute-gray p-6 sm:p-12 mt-2">
                                                <Outlet />
                                          </section>
                                    </Tab.Panels>
                              </Tab.Group>
                        </span>
                  </main>

                  <ToastContainer />
            </div>
      );
}

export default ProfileContainer;
