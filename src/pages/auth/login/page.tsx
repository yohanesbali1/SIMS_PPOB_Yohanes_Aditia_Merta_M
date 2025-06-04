import FormLogin from "./form";

export default function Login() {
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="px-14 py-8 flex-1 max-w-2xl flex flex-col justify-center h-full">
                <div className="text-center text-2xl font-semibold max-w-[400px] mx-auto mb-4">
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