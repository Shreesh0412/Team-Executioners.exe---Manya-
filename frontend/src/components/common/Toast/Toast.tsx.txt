import { toast, Toaster } from "react-hot-toast";

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#ffffff",
      color: "#1f2937",
      border: "1px solid #dbeafe",
    },
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    style: {
      borderRadius: "12px",
      background: "#ffffff",
      color: "#dc2626",
      border: "1px solid #fecaca",
    },
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    icon: "ℹ️",
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#ffffff",
      color: "#2563eb",
      border: "1px solid #bfdbfe",
    },
  });
};

export const showWarning = (message: string) => {
  toast(message, {
    icon: "⚠️",
    duration: 3500,
    style: {
      borderRadius: "12px",
      background: "#ffffff",
      color: "#d97706",
      border: "1px solid #fde68a",
    },
  });
};

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        style: {
          fontSize: "15px",
          fontWeight: 500,
        },
      }}
    />
  );
};

export default ToastProvider;