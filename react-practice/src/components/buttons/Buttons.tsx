import { ReactNode } from "react";
import { UserRole } from "../../helpers/constants";
import AuthorizationGuard from "../../helpers/AuthorizationGuard";

interface ITableButton {
      onDeleteClick: () => void;
      onEditClick: () => void;
      leadingChildren?: ReactNode | null;
      allowedToEditOrDeleted?: boolean;
}

export function TableButtonGroup({
      onDeleteClick,
      onEditClick,
      leadingChildren = null,
      allowedToEditOrDeleted = true,
}: ITableButton) {
      return (
            <div
                  className="flex justify-center flex-col gap-4
                        2xl:flex-row 
                  "
            >
                  {leadingChildren}

                  {allowedToEditOrDeleted && (
                        <AuthorizationGuard allowedRoles={[UserRole.Admin, UserRole.Manager]}>
                              <span
                                    className="flex justify-center flex-col gap-4
                                          md:flex-row 
                                    "
                              >
                                    <button title="edit" className="text-success text-lg p-0 m-0" onClick={onEditClick}>
                                          <i className="bi bi-pencil-square"></i>
                                    </button>

                                    <button title="delete" className="text-danger text-lg p-0 m-0" onClick={onDeleteClick}>
                                          <i className="bi bi-trash"></i>
                                    </button>
                              </span>
                        </AuthorizationGuard>
                  )}
            </div>
      );
}

interface ITableViewButton {
      buttonClickHandler: () => void;
}

export function TableViewButton({ buttonClickHandler }: ITableViewButton) {
      return (
            <button className="text-link text-xl p-0 m-0" onClick={buttonClickHandler}>
                  <i className="bi bi-eye"></i>
            </button>
      );
}
