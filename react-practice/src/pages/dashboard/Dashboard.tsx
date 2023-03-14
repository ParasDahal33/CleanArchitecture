import { ToastContainer } from "react-toastify";
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

                                   
                              </span>
                        </section>

                       
                  </main>

                  <ToastContainer />
            </div>
      );
}
