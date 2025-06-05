import ImgAvatar from "../assets/avatar.png";
import { useSelector } from "react-redux";

export default function Avatar() {
    const { data_user } = useSelector((state: any) => state.auth);

    return (
        <div className="w-16 h-16 border border-gray-100 rounded-full">
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
    );
}
