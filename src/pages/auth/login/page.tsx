import FormLogin from "./form";
import Logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { swal_alert } from "../../../helper/helper";

export default function Login() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    // useEffect(() => {
    //     swal_alert();
    // }, [])
    return (
        <>
            <div className="w-full flex  min-h-screen">
                <div className="px-14 py-8 flex-1 items-center justify-center flex flex-col  relative">
                    <div className="text-center text-2xl font-semibold max-w-[300px] mx-auto mb-4">
                        <div className="flex gap-x-2 items-center justify-center mb-3">
                            <div className="w-7 h-7">
                                <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                        </div>
                        <h6>Masuk atau buat akun untuk memulai</h6>
                    </div>
                    <div className="w-full max-w-xl mb-4 relative ">
                        <FormLogin />
                    </div>
                    <div className="text-center ">
                        <p>belum punya akun? registrasi <Link to="/register" className="text-primary font-semibold">disini</Link></p>
                    </div>
                </div >
                <div className="flex-1  bg-cover-login bg-center bg-no-repeat bg-cover ">
                </div>
            </div >

        </>

    );
}