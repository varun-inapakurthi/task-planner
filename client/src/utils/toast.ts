import { toast } from 'react-toastify';

export const SetToast = (msg: string) => {
  toast.error(msg, {
    position: 'bottom-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
