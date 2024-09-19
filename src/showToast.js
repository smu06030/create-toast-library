import { bus } from "./EventBus";

export const showToast = (message, type = "info") => {
  bus.publish("SHOW_TOAST", { message, type });
};
