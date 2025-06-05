import React from 'react';
import Logo from "../assets/Logo.png";

type ModalType = 'confirm' | 'loading' | 'success' | 'error';

interface ModalAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    type: ModalType;
    title: string;
    message: string;
    style_message?: string;
    style_title?: string;
    confirmText?: string;
    cancelText?: string;
}

const ModalAlert: React.FC<ModalAlertProps> = ({
    isOpen,
    onClose,
    onConfirm,
    type,
    title,
    message,
    style_title = '',
    style_message = '',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    if (!isOpen) return null;

    const isConfirm = type === 'confirm';
    const isLoading = type === 'loading';
    const isResult = type === 'success' || type === 'error';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full animate-fadeIn text-center">
                <div className="w-12 h-12 mx-auto mb-4">
                    <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <p className={` ${style_title}`}>{title}</p>
                <h2 className={` ${style_message}  `}>{message}</h2>
                {['success', 'error'].includes(type) && <p className="text-gray-700  text-base mt-2 ">{type === 'success' ? 'Berhasil' : 'Gagal'}</p>}
                <div className="flex flex-col justify-center space-x-3 gap-4 mt-5">
                    {isConfirm && (
                        <>
                            <button
                                onClick={onConfirm}
                                className="text-red-600 text-base  transition font-semibold"
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={onClose}
                                className="text-gray-400 text-base   transition font-medium"
                            >
                                {cancelText}
                            </button>
                        </>
                    )}

                    {isResult && (
                        <button
                            onClick={onConfirm}
                            className="text-red-600 text-base  transition font-semibold"
                        >
                            {confirmText}
                        </button>
                    )}

                    {isLoading && (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-red-500 font-medium">Please wait...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalAlert;
