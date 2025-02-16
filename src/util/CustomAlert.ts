import { AlertOptions, showGlobalAlert } from '@/context/CustomAlertContext'

export const CustomAlert = {
  alert: (options: AlertOptions) => {
    showGlobalAlert(options)
  },
}
