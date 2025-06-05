import { useState } from 'react';

export type ModalType = 'confirm' | 'loading' | 'success' | 'error';

interface ModalState {
    type: ModalType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    resolve?: (result: boolean) => void;
}

export const useModalAlert = () => {
    const [modal, setModal] = useState<ModalState | null>(null);

    const showConfirm = (title: string, message: string, confirmText = 'Yes', cancelText = 'Cancel') => {
        return new Promise<boolean>((resolve) => {
            setModal({
                type: 'confirm',
                title,
                message,
                confirmText,
                cancelText,
                resolve,
            });
        });
    };

    const showLoading = (title = 'Processing...', message = '') => {
        setModal({ type: 'loading', title, message });
    };

    const showResult = (type: 'success' | 'error', title: string, message: string, confirmText?: string) => {
        return new Promise<boolean>((resolve) => {
            setModal({
                type, title, message,
                confirmText,
                resolve
            });
        });
        // setTimeout(() => setModal(null), 1500); 
    };

    const closeModal = () => {
        if (modal?.resolve) modal.resolve(false);
        setModal(null);
    };

    const confirmModal = () => {
        if (modal?.resolve) modal.resolve(true);
        setModal(null);
    };

    return {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    };
};
