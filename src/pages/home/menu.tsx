import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { menuService } from "../../store/reducers/serives/service.action";
import { Link } from "react-router-dom";
import ModalAlert from "../../components/modal";
import { useModalAlert } from "../../hook/useModalAlert";

export default function MenuDashboard() {
    const dispatch = useDispatch<any>();
    const { menu_service } = useSelector((state: any) => state.service);
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            await dispatch(menuService());
        } catch (e: any) {
            showResult('error', 'Pengambilan Data Akun', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');
        }

    }

    return (
        <>
            <div className="w-full max-w-7xl mx-auto mt-16">
                <div className="flex gap-6  flex-wrap px-4 gap-2">
                    {menu_service.map((menu: any) => (
                        <Link key={menu.name}
                            to={`/${menu.service_code}`} className="  w-20 " >
                            <div
                                className={`  flex flex-col items-center justify-center   ${menu.color} `}
                            >
                                <div className="text-2xl  m-auto flex items-center justify-center"><img src={menu.service_icon} alt={menu.service_name} className="w-full h-full" /></div>
                            </div>
                            <p className="mt-2 text-xs font-regular text-gray-800 text-center">{menu.service_name}</p>
                        </Link>
                    ))}
                </div>
            </div>
            {
                modal && (
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
                )
            }
        </>
    )
}