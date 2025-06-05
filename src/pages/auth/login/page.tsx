import FormLogin from "./form";
import Logo from "../../../assets/Logo.png";

export default function Login() {
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="px-14 py-8 flex-1 max-w-2xl flex flex-col justify-center h-full">
                <div className="text-center text-2xl font-semibold max-w-[300px] mx-auto mb-4">
                    <div className="flex gap-x-2 items-center justify-center mb-3">
                        <div className="w-7 h-7">
                            <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                    </div>
                    <h6>Masuk atau buat akun untuk memulai</h6>
                </div>
                <div>
                    <FormLogin />
                </div>
            </div>
            <div className="flex-1"></div>
        </div>
    );
}