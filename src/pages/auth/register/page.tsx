import FormRegister from "./form";
import Logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Register() {
    return (
        <>
            <Helmet>
                <title>Register | SIMS PPOB Yohanes Aditia Merta M</title>
                <meta name="description" content="Pendaftaran akun SIMS PPOB" />
            </Helmet>
            <div className="w-full flex  min-h-screen">
                <div className="px-14 md:px-8 py-8 flex-1 items-center justify-center flex flex-col  ">
                    <div className="text-center text-2xl font-semibold max-w-[300px] md:max-w-auto mx-auto mb-4">
                        <div className="flex gap-x-2 items-center justify-center mb-3">
                            <div className="w-7 h-7">
                                <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                        </div>
                        <h6>Lengkapi data untuk membuat akun</h6>
                    </div>
                    <div className="w-full max-w-xl mb-4">
                        <FormRegister />
                    </div>
                    <div className="text-center ">
                        <p>sudah punya akun? login <Link to="/" className="text-primary font-semibold">disini</Link></p>
                    </div>
                </div>
                <div className="flex-1  bg-cover-login bg-center bg-no-repeat bg-cover lg:hidden">
                </div>
            </div>
        </>
    )
}