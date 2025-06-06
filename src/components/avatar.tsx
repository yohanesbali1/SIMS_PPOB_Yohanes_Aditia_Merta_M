import { useEffect, useRef, useState } from "react";
import ImgAvatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { profileUpdateImage } from "../store/reducers/auth/auth.action";
import ModalAlert from "./modal";
import { useModalAlert } from "../hook/useModalAlert";
import { useToast } from "../hook/useToast";
import Toast from "./toast";

export default function Avatar() {
    const { data_user } = useSelector((state: any) => state.auth);
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();
    const [name, set_name] = useState<any>("-");
    const location = useLocation();
    const isAccountRoute = location.pathname === "/account";
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<any>();
    const { toasts, showToast, removeToast } = useToast();

    useEffect(() => {
        if (data_user) set_name(`${data_user.first_name} ${data_user.last_name}`);
    }, [data_user]);

    const handleUploadClick = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSize = 100 * 1024;
            if (file.size > maxSize) {
                showToast("Ukuran gambar maksimal 100 KB.", {
                    title: "",
                    type: "error",
                })
                return;
            }
            UploadImage(file);
        }
    };

    const UploadImage = async (image: any) => {
        try {
            showLoading('Proses upload gambar', '');
            let payload = {
                file: image
            }
            await dispatch(profileUpdateImage(payload));
            await showResult('success', 'Upload Gambar', '', 'Kembali ke beranda');
        } catch (e: any) {
            showResult('error', 'Upload Gambar', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');
        }
    };

    return (
        <>
            <div className={`w-full ${(isAccountRoute ? "flex flex-col items-center" : "")}`}>
                <div className="relative">
                    <div className={`${(isAccountRoute ? "w-24 h-24" : "w-16 h-16")} border border-gray-200 rounded-full mb-4 object-cover`}>
                        <img
                            src={data_user?.profile_image || ImgAvatar}
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                            onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = ImgAvatar;
                            }}
                        />
                    </div>
                    {
                        isAccountRoute &&
                        <div onClick={handleUploadClick} className="absolute right-0 bottom-3 cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-100">
                            <i className="fa fa-pen text-sm"></i>
                        </div>
                    }
                    <input
                        key="file-input"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                {!isAccountRoute && <p className="text-lg mb-0">Selamat Datang,</p>}
                <h5 className="text-2xl font-semibold">{name}</h5>
            </div>
            {modal && (
                <ModalAlert
                    isOpen={!!modal}
                    onClose={closeModal}
                    onConfirm={confirmModal}
                    type={modal.type}
                    title={modal.title}
                    message={modal.message}
                    confirmText={modal.confirmText}
                    cancelText={modal.cancelText}
                    style_message={"text-base "}
                    style_title={"text-xl font-semibold mb-0"}
                />
            )}
            <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </>
    );
}
