import { useEffect, useState } from "react";
import { bus } from "./eventBus";
import "./toast.css";
import { createPortal } from "react-dom";
import { ToastType } from "./types";

const Toast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  console.log(toasts);
  useEffect(() => {
    const handleToastEvent = (toast: Omit<ToastType, "id">) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, ...toast }]);

      const duration = toast.duration || 3000;
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    };
    const unsubscribe = bus.subscribe({topic: "SHOW_TOAST", listener: handleToastEvent});

    return () => unsubscribe();
  }, []);

  const closeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.message}
          <button className="toast-close" onClick={() => closeToast(toast.id)}>
            X
          </button>
          <div
            className={`toast-bar ${toast.type}`}
            style={{
              animation: `toastAnimation ${toast.duration || 3000}ms forwards`,
              animationFillMode: "forwards",
            }}
            onAnimationEnd={() => {
              setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }}
          />
        </div>
      ))}
    </div>,
    document.getElementById("toast-container") as HTMLElement
  );
};

export default Toast;
