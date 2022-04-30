import * as ToastPrimitive from "@radix-ui/react-toast";
import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./Toast.module.scss";

interface ToastProps {
  title?: JSX.Element | string;
  description: JSX.Element | string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Toast = ({ title, description, open, onOpenChange }: ToastProps) => (
  <ToastPrimitive.Root
    className={styles.toastRoot}
    open={open}
    onOpenChange={onOpenChange}
    duration={1000000}
  >
    {title && (
      <div className={styles.titleWrapper}>
        <ToastPrimitive.Title className={styles.title}>
          {title}
        </ToastPrimitive.Title>

        {closeButton}
      </div>
    )}
    <div className={styles.descriptionWrapper}>
      <ToastPrimitive.Description>{description}</ToastPrimitive.Description>
      {!title && closeButton}
    </div>
  </ToastPrimitive.Root>
);

const closeButton = (
  <ToastPrimitive.Close className={styles.close}>
    <IoCloseCircleOutline />
  </ToastPrimitive.Close>
);

export default Toast;
