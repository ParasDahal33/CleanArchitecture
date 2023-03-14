import { ReactElement } from "react";

interface IMultiNavHeadText {
      icon: ReactElement;
      name: string;
      isSubNavOpen: boolean;
}
function MultiNavHeadText({ icon, name, isSubNavOpen }: IMultiNavHeadText) {
      return (
            <>
                  <section className="flex gap-2 font-semibold">
                        <span id="nav-icon">{icon}</span>
                        {name}
                  </section>

                  <i className={`bi bi-chevron-${isSubNavOpen ? "up" : "down"}`}></i>
            </>
      );
}

export default MultiNavHeadText;
