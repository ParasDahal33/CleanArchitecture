import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bulbImg from "../../assets/image/no-page.png";

export default function NotFound() {
      const navigate = useNavigate();

      const removeNavBar = () => {
            const sideNav = document.getElementById("side-nav");
            const navigationBar = document.getElementById("nav-bar");

            if (navigationBar === null || sideNav === null) return;

            sideNav.style.visibility = "hidden";
            navigationBar.style.visibility = "hidden";
      };

      const goBack = () => {
            const sideNav = document.getElementById("side-nav");
            const navigationBar = document.getElementById("nav-bar");
            
            if (navigationBar === null || sideNav === null) return;

            sideNav.style.visibility = "visible";
            navigationBar.style.visibility = "visible";

            navigate("/");
      };

      useEffect(() => {
            removeNavBar();
      }, []);

      return (
            <div className="w-screen min-h-screen bg-white text-default absolute top-0 left-0">
                  <div
                        className="flex flex-col justify-center content-center gap-2 h-screen sm:pb-[10rem] 
                              sm:flex-row
                        "
                  >
                        <section className="self-center min-w-screen w-[20rem] sm:w-[34rem]">
                              <img className="w-full h-full" src={bulbImg} alt="no-data" />
                        </section>

                        <section
                              className="self-center text-2xl tracking-wider flex flex-col gap-4 w-[14rem] 
                                          1sm:w-[20rem] 
                                          sm:w-[32rem] sm:px-6
                                    "
                        >
                              <h1 className="text-9xl font-bold">404</h1>

                              <article className="flex flex-col gap-8">
                                    <span className="flex flex-col gap-2">
                                          <h3 className="font-bold"> LOOKS LIKE YOUR ARE LOST</h3>
                                          <p>
                                                we&apos;re sorry the page you requested could not be found. Please
                                                go back to the homepage.
                                          </p>
                                    </span>

                                    <button
                                          className="bg-primary text-white tracking-wider uppercase rounded-lg p-2 w-full min-w-fit 
                                                hover:drop-shadow-2xl
                                          "
                                          onClick={goBack}
                                    >
                                          Go Home page
                                    </button>
                              </article>
                        </section>
                  </div>
            </div>
      );
}
