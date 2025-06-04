import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginData, registerData } from "../../../store/reducers/auth/auth.action";
interface LoginForm {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}
export default function FormRegister() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const schema = yup.object().shape({
        email: yup.string().email().required('email wajib diisi'),
        first_name: yup.string().required('nama depan wajib diisi'),
        last_name: yup.string().required('nama belakang wajib diisi'),
        password: yup.string().min(8).required('password wajib diisi'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data: LoginForm) => {
        try {
            await dispatch(registerData(data));
            history.push('/');
            return true;
        } catch (e: any) {
            return false
        }
    }

    return (
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
                <input
                    type="text"
                    {...register("first_name")}
                    placeholder="masukan nama depan anda"
                    className={`border text-gray-900 text-sm rounded-sm block w-full p-2.5 ring-0 outline-none mb-2
     ${errors.email ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"}`} />
                <p className="text-red-500 text-xs">{errors.first_name?.message}</p>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    {...register("last_name")}
                    placeholder="masukan nama belakang anda"
                    className={`border text-gray-900 text-sm rounded-sm block w-full p-2.5 ring-0 outline-none mb-2
     ${errors.email ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"}`} />
                <p className="text-red-500 text-xs">{errors.last_name?.message}</p>
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
    )
}