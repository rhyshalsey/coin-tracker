import * as ToastPrimitive from "@radix-ui/react-toast";
import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./Toast.module.scss";

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Toast: React.FC<ToastProps> = ({ open, onOpenChange }) => (
  <ToastPrimitive.Root
    className={styles.toastContainer}
    open={open}
    onOpenChange={onOpenChange}
    duration={1000000}
  >
    <div className={styles.titleWrapper}>
      <ToastPrimitive.Title className={styles.title}>
        An error has occured
      </ToastPrimitive.Title>
      <ToastPrimitive.Close className={styles.close}>
        <IoCloseCircleOutline />
      </ToastPrimitive.Close>
    </div>
    <ToastPrimitive.Description>
      An error has occured please try again later
    </ToastPrimitive.Description>
  </ToastPrimitive.Root>
);

export default Toast;
