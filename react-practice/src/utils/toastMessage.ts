import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const successToastMessage = ({ title, message }: { title: string; message: string }) => {
      Swal.fire({ title: title, text: message, icon: "success", timer: 2000, showConfirmButton: false });
};

export const errorToastMessage = (message: string) => {
      toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            progress: undefined,
            theme: "colored",
      });
};

export const loadingSwalMessage = () => {
      Swal.fire({
            title:
                  "<h2 style='color: rgb(19, 19, 61); font-size:2rem; font-weight:600; text-align:left'>" +
                  "Please wait !!" +
                  "</h2>",
            html:
                  "<p style='color:black; font-size:1.5rem;'>Loading...</p>" +
                  "<p style='color:green'>Your request is being processed</p>",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCloseButton: false,
            didOpen: () => {
                  Swal.showLoading(null);
            },
      });
};

export const closeSwalLoading = () => {
      Swal.close();
};
