import { toast, ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3500,
  closeOnClick: true,
  draggable: true,
};

const errorToast = (message: string) => toast.error(message, toastConfig);

export { errorToast };
