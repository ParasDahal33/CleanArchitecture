import { useState } from "react";
import { FieldStatus } from "../../helpers/constants";
import { IAddEditActionState2 } from "../../model/actionModel";

/**
 * @customHook useModal
 * - It store select data detail for editing
 * - It handle open and close user edit and add Modal
 *
 * @returns addEditAction, openAddModal, openEditModal, closeModal, viewDetailModal
 */
function useModal<TData>() {
      const [addEditAction, setAddEditAction] = useState<IAddEditActionState2<TData>>({
            toShow: false,
            selectedData: null,
            type: FieldStatus.View,
      });

      const openCloseModalHandler = ({ type, data }: { type: FieldStatus; data: TData | null }): void => {
            setAddEditAction((prevState) => {
                  return {
                        toShow: !prevState.toShow,
                        type: type,
                        selectedData: data,
                  };
            });
      };

      const openAddModal = (data?: TData): void => {
            openCloseModalHandler({ type: FieldStatus.Add, data: data ? data : null });
      };

      const openEditModal = (data: TData | null): void => {
            openCloseModalHandler({
                  type: FieldStatus.Edit,
                  data: data,
            });
      };

      const closeModal = (): void => {
            openCloseModalHandler({ type: FieldStatus.Idle, data: null });
      };

      const viewDetailModal = (data: TData): void => {
            openCloseModalHandler({
                  type: FieldStatus.View,
                  data: data,
            });
      };

      return {
            addEditAction,
            openAddModal,
            openEditModal,
            closeModal,
            viewDetailModal,
      } as const;
}

export default useModal;
