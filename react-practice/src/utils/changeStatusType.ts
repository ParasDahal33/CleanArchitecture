
export const changeStatusToNumberIf = (status: string | number) => {
      return typeof status === "string" ? parseInt(status) : status;
};