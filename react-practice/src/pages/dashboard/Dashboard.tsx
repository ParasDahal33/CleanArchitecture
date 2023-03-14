import { ToastContainer } from "react-toastify";
import { UserType } from "../../helpers/constants";
import AccessGuard from "../../helpers/AccessGuard";
import Header from "../../components/header/Header";
import Greeting from "./component/Greeting/Greeting";

export default function Dashboard() {
      return (
            <div>
                  <Header />

                  <main
                        className="flex flex-col gap-5
                              lg:flex-row
                        "
                  >
                        <section className="w-full">
                              <span className="flex flex-col gap-5">
                                    <Greeting />

                                    <AccessGuard allowedUsers={[UserType.Staff]}>
                                          <>
                                            

                                          </>
                                    </AccessGuard>
                              </span>
                        </section>

                        <AccessGuard allowedUsers={[UserType.Staff]}>
                              <aside
                                    className="w-full flex flex-col gap-5
                                          lg:w-[50%]
                                    "
                              >
                              </aside>
                        </AccessGuard>
                  </main>

                  <ToastContainer />
            </div>
      );
}
