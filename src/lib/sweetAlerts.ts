/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { ErrorMessages } from "./config";
import type { T } from "./type/common";

export const sweetErrorHandling = async (err: T) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? ErrorMessages.error1;
  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: true,
    allowOutsideClick: true,
    customClass: {
      popup: "z-[99999]",
    },
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = async (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  await Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};

export const emptyInputAlert = (msg: string, show_button: boolean = false) => {
  Swal.fire({
    icon: "warning",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "I got it",
  }).then();
};
