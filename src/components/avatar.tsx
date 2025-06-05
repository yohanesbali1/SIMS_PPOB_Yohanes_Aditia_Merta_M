import { useEffect, useRef, useState } from "react";
import ImgAvatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { profileUpdateImage } from "../store/reducers/auth/auth.action";

export default function Avatar() {
    const { data_user } = useSelector((state: any) => state.auth);
    const [name, set_name] = useState<any>("-");
    const location = useLocation();
    const isAccountRoute = location.pathname === "/account";
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<any>();

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
            const maxSize = 100 * 1024; // 100 KB
            if (file.size > maxSize) {
                alert("Ukuran gambar maksimal 100 KB.");
                return;
            }
            UploadImage(file);
        }
    };

    const UploadImage = async (image: any) => {
        try {
            let payload = {
                file: image
            }
            await dispatch(profileUpdateImage(payload));
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <div className={`w-full ${(isAccountRoute ? "flex flex-col items-center" : "")}`}>
            <div className="relative">
                <div className={`${(isAccountRoute ? "w-24 h-24" : "w-16 h-16")} border border-gray-100 rounded-full mb-4`}>
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
                <div onClick={handleUploadClick} className="absolute right-0 bottom-3 cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-100">
                    <i className="fa fa-pen text-sm"></i>
                </div>
                <input
                    key="file-input" // helps React reinitialize if needed
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
    );
}
