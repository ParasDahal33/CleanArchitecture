import { ReactNode } from "react";

interface ISuccessGuard {
      isSucceed: boolean;
      children: ReactNode;
}
function SuccessGuard({ isSucceed, children }: ISuccessGuard) {
      if (!isSucceed) return null;

      return <>{children}</>;
}

export default SuccessGuard;
