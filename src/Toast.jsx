import React, { useEffect, useState } from "react";
import { bus } from "./EventBus";
import "./toast.css";
import { createPortal } from "react-dom";

const Toast = () => {
  const [toasts, setToasts] = useState([]);
  console.log(toasts);
  useEffect(() => {
    const handleToastEvent = (toast) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, ...toast }]);

      const duration = toast.duration || 3000;
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    };
    const unsubscribe = bus.subscribe("SHOW_TOAST", handleToastEvent);

    return () => unsubscribe();
  }, []);

  const closeToast = (id) => {
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
    document.getElementById("toast-container")
  );
};

export default Toast;
