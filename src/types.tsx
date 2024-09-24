export type ToastType = {
  id: number;
  message: string;
  type: string;
  duration?: number;
};

export type showToastProps = {
  message: string;
  type?: string;
};