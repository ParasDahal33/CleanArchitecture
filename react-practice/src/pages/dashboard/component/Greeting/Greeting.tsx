import "./greeting.css";
import getGreeting from "../../../../utils/getGreeting";
import avatarImg from "../../../../assets/image/lady-laptop.png";
import getLoggedinUserFirstName from "../../../../utils/getLoggedinUserFirstName";

function Greeting() {
      return (
            <div className="greeting__container border rounded-2xl px-12 py-14">
                  <span className="flex justify-between relative z-[-1]">
                        <article
                              className="tracking-wide relative w-full 
                                    2xl:w-[60%] 
                                    3xl:w-full
                              "
                        >
                              <h1 className="greeting__title text-primary font-semibold text-3xl">
                                    Welcome!! <br /> Good {getGreeting()} {getLoggedinUserFirstName()}
                              </h1>

                              <p className="mb-0 mt-1">Happy to see you. Hope you have a great experience!</p>
                        </article>
                        <aside
                              className="absolute -bottom-14 right-0 z-[-1] hidden 
                                    md:block 
                                    lg:hidden 
                                    xl:block
                              "
                        >
                              <img src={avatarImg} alt="greeting-img" />
                        </aside>
                  </span>
            </div>
      );
}

export default Greeting;
