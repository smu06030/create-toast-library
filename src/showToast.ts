import { bus } from "./eventBus";
import { showToastProps } from "./types";

export const showToast = ({ message, type = "info" }: showToastProps) => {
  bus.publish("SHOW_TOAST", { message, type });
};
