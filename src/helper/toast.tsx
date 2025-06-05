// Toast.tsx
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
        }}>
            {message}
        </div>
    );
};

export default Toast;
