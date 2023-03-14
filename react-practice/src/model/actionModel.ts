import { FieldStatus } from "../helpers/constants";

export interface IAddEditActionState {
      toShow: boolean;
      type: FieldStatus;
}

export interface IAddEditActionState2<TData> {
      toShow: boolean;
      type: FieldStatus;
      selectedData: TData | null;
}
