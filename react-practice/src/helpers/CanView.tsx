import { ReactElement } from "react";

interface ICanView {
      onlyIf: boolean;
      children: ReactElement;
}

function CanView({ onlyIf, children }: ICanView) {
      if (onlyIf) return <>{children}</>;

      return null;
}

export default CanView;
