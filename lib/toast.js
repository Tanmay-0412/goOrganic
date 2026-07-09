import toast from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      background: "#ecfdf5", // light green
      color: "#065f46",      // dark green text
      border: "1px solid #10b981",
      padding: "12px 16px",
      borderRadius: "8px",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#ecfdf5",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      background: "#fef2f2", // light red
      color: "#991b1b",      // dark red text
      border: "1px solid #ef4444",
      padding: "12px 16px",
      borderRadius: "8px",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fef2f2",
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    icon: "ℹ️",
    style: {
      background: "#eff6ff", // light blue
      color: "#1e3a8a",      // dark blue text
      border: "1px solid #3b82f6",
      padding: "12px 16px",
      borderRadius: "8px",
    },
  });
};

export const showWarning = (message) => {
  toast(message, {
    icon: "⚠️",
    style: {
      background: "#fffbeb", // light yellow
      color: "#92400e",      // dark amber text
      border: "1px solid #f59e0b",
      padding: "12px 16px",
      borderRadius: "8px",
    },
  });
};
