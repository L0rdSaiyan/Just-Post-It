import Swal, { SweetAlertIcon } from "sweetalert2";

type Alert = 
{
    title: string,
    text: string,
    icon?: SweetAlertIcon,
    confirmButton?: string
} 

export const commonAlert = (alert: Alert) => {
  Swal.fire({
    title: alert.title,
    text: alert.text,
    icon: alert.icon,
    confirmButtonText: alert.confirmButton 
  });
};