import { useEffect, useState } from "react";
import { profileData } from "../store/reducers/auth/auth.action";
import { useDispatch } from "react-redux";
import Logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import ModalAlert from "./modal";
import { useModalAlert } from "../hook/useModalAlert";

interface Menu {
    link: string;
    name: string;
}
export default function Header() {
    const dispatch = useDispatch<any>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();

    const isActive = (path: string) => location.pathname === path;
    const [menu, setMenu] = useState<Menu[]>([
        { link: '/topup', name: 'Top Up' },
        { link: '/transacton', name: 'Transaction' },
        { link: '/account', name: 'Akun' },
    ]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            await dispatch(profileData());
        } catch (e: any) {
            showResult('error', 'Pengambilan Data Akun', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');
        }
    }

    return (
        <>
            <header className="w-full py-5 border-b fixed z-30 top-0 left-0 bg-white ">
                <div className="w-full px-4 lg:px-6 max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        className="md:block hidden w-10 h-10   border rounded bg-white z-40"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
                    </button>

                    <Link to="/dashboard">
                        <div className="flex gap-x-2 items-center">
                            <div className="w-7 h-7">
                                <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                        </div>
                    </Link>

                    <ul className="flex md:hidden gap-8 text-sm font-semibold">
                        {menu.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    className={`hover:text-red-600 transition ${isActive(item.link) ? "text-red-600" : ""
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            {isSidebarOpen && (
                <div
                    className="md:fixed md:block inset-0 bg-black bg-opacity-50 z-30 hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "md:translate-x-0" : "md:-translate-x-full"
                    } md:block hidden`}
            >
                <div className="px-6 py-5 border-b flex items-center justify-between">
                    <Link to="/dashboard">
                        <div className="flex gap-x-2 items-center">
                            <div className="w-7 h-7">
                                <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                        </div>
                    </Link>
                    <button
                        className="hidden md:block text-2xl font-bold"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                <nav className="px-6 py-4">
                    <ul className="space-y-4 text-sm font-semibold">
                        {menu.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile
                                    className={`block transition hover:text-red-600 ${isActive(item.link) ? "text-red-600" : ""
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
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
        </>
    )
}