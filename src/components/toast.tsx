import React from "react";
import { ToastItem } from "../hook/useToast";

interface ToastProps extends ToastItem {
    onClose: () => void;
}

const typeColors: Record<string, string> = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

const Toast: React.FC<ToastProps> = ({ message, title, type = "info", onClose }) => {
    const [visible, setVisible] = React.useState(true);
    const base = typeColors[type] || typeColors.info;

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`mb-3 max-w-sm px-4 py-3 border rounded-lg shadow-lg flex flex-col transition-all duration-300 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${base}`}
        >
            {/* {title && <strong className="text-sm mb-1">{title}</strong>} */}
            <div className="flex justify-between items-start">
                <span className="text-sm">{message}</span>
                <button
                    onClick={handleClose}
                    className="ml-4 text-xl leading-none hover:text-black"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Toast;
