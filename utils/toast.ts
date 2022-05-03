import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const configureToast = () => {
  const toastConfig = {
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    closeButton: false
  }
  toast.configure(toastConfig)
}