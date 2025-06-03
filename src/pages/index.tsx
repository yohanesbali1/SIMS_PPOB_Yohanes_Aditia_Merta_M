import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { loginData } from "../store/reducers/auth/auth.action";
import { useHistory } from 'react-router-dom';

interface LoginForm {
    email: string;
    password: string;
}
export default function Login() {
    const dispatch = useDispatch<any>();
    const history = useHistory();

    const schema = yup.object().shape({
        email: yup.string().email().required('email wajib diisi'),
        password: yup.string().required('password wajib diisi'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: LoginForm) => {
        try {
            await dispatch(loginData(data));
            history.push('/dashboard');
            return true;
        } catch (e: any) {
            return false
        }
    }


    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="px-14 py-8 flex-1 max-w-2xl flex flex-col justify-center h-full">
                <div className="text-center text-2xl font-semibold max-w-[400px] mx-auto mb-4">
                    <h6>Masuk atau buat akun untuk memulai</h6>
                </div>
                <div>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className="mb-3">
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="masukan email anda"
                                className={`border text-gray-900 text-sm rounded-sm block w-full p-2.5 ring-0 outline-none mb-2
     ${errors.email ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"}`} />
                            <p className="text-red-500 text-xs">{errors.email?.message}</p>
                        </div>
                        <div className="mb-3">
                            <input type="password" {...register("password")} placeholder="masukan password anda"
                                className={`border text-gray-900 text-sm rounded-sm block w-full p-2.5 ring-0 outline-none mb-2
     ${errors.email ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"}`} />
                            <p className="text-red-500 text-xs">{errors.password?.message}</p>
                        </div>
                        <div className="mt-7">
                            <button type="submit" className="bg-primary text-white py-3 px-4 rounded-sm w-full">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex-1"></div>
        </div>
    );
}