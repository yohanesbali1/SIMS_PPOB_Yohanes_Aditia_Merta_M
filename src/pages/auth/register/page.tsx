import FormRegister from "./form";

export default function Register() {
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="px-14 py-8 flex-1 max-w-2xl flex flex-col justify-center h-full">
                <div className="text-center text-2xl font-semibold max-w-[400px] mx-auto mb-4">
                    <h6>Lengkapi data untuk membuat akun</h6>
                </div>
                <div className="mb-4">
                    <FormRegister />
                </div>
                <div className="text-center ">
                    <p>sudah punya akun? login <a href="/" className="text-primary font-semibold">disini</a></p>
                </div>
            </div>
            <div className="flex-1"></div>
        </div>
    )
}