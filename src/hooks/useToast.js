import Swal from "sweetalert2";
import { SUCCESS } from "../utils/Constant";

export const useToast = () => {
  const fire = (message, description, type = SUCCESS) => {
    Swal.fire(message, description, type);
  };
  return fire;
};
