import { useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
    id: number;
    message: string;
    title?: string;
    type?: ToastType;
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = (
        message: string,
        options?: { title?: string; type?: ToastType; duration?: number }
    ) => {
        const id = Date.now();
        const newToast: ToastItem = {
            id,
            message,
            title: options?.title,
            type: options?.type || "info",
        };

        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, options?.duration || 3000);
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return { toasts, showToast, removeToast };
}
