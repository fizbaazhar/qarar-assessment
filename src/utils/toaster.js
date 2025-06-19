import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = ({ type = 'info', message }) => {
  const options = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };

  switch (type.toUpperCase()) {
    case 'SUCCESS':
      toast.success(message, options);
      break;
    case 'ERROR':
      toast.error(message, options);
      break;
    case 'WARNING':
      toast.warning(message, options);
      break;
    case 'INFO':
      toast.info(message, options);
      break;
    default:
      toast(message, options);
  }
};
