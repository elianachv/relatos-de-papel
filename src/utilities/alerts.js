import Swal from "sweetalert2";

const baseToastConfig = {
  toast: true,
  showConfirmButton: false,
  buttonsStyling: false,
  timer: 2000,
};


const showToast = ({ icon, title, text, centered = false }) => {
  return Swal.fire({
    ...baseToastConfig,
    icon,
    titleText: title,
    text,
    position: centered ? "center" : "top-end",
  });
};


export const infoAlert = (title, msg, centered) =>
  showToast({ icon: "info", title, text: msg, centered });

export const successAlert = (title, msg, centered) =>
  showToast({ icon: "success", title, text: msg, centered });

export const errorAlert = (title, msg, centered) =>
  showToast({ icon: "error", title, text: msg, centered });

export const warningAlert = (title, msg, centered) =>
  showToast({ icon: "warning", title, text: msg, centered });


export const askAlert = (
  title,
  confirmMsg,
  cancelMsg,
  confirmFunction
) =>
  Swal.fire({
    titleText: title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmMsg,
    cancelButtonText: cancelMsg,
    toast: true
  }).then((result) => {
    if (result.isConfirmed) {
      confirmFunction();
    }
  });
