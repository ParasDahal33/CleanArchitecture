import { ReactElement } from "react";

interface ISubMultiNavHeadText {
      icon: ReactElement;
      name: string;
      isSubNavOpen: boolean;
}
function SubMultiNavHeadText({ icon, name, isSubNavOpen }: ISubMultiNavHeadText) {
      return (
            <>
                  <span id="nav-icon">{icon}</span>

                  <section className="flex gap-2 font-semibold">
                        {name}

                        <i className={`bi bi-chevron-${!isSubNavOpen ? "up" : "down"}`}></i>
                  </section>
            </>
      );
}

export default SubMultiNavHeadText;
