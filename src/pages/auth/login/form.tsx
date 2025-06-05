import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginData } from "../../../store/reducers/auth/auth.action";
import { FormInput } from "../../../components/form";
import { useState } from "react";
import { swal_alert } from "../../../helper/helper";
import Toast from "../../../helper/toast";
interface LoginForm {
    email: string;
    password: string;
}
export default function FormLogin() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [show, setShow] = useState<boolean>(false);
    const [message, set_message] = useState<string | null>(null);
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
            swal_alert({ message: e?.message || 'Terjadi Kesalahan' });
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mb-3">
                    <FormInput icon="fa fa-user" register={register("email")} type="email" errors={errors?.email} placeholder="masukan email anda" />
                    <p className="text-red-500 text-xs">{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                    <FormInput icon="fa fa-key" register={register("password")} icon_passowrd="fa fa-eye" type={show ? "text" : "password"} errors={errors?.password} placeholder="masukan password anda" >
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShow(!show)} ><i className={`${show ? "fa fa-eye" : "fa fa-eye-slash"} text-gray-400 text-sm`}></i></span>
                    </FormInput>
                    <p className="text-red-500 text-xs">{errors.password?.message}</p>
                </div>
                <div className="mt-7">
                    <button type="submit" className="bg-primary text-white py-3 px-4 rounded-sm w-full">Login</button>
                </div>
            </form>
            {/* <div className="bg-red-100 absolute -bottom-40 left-1/2 translate-x-1/2 w-full">
                <p>{message}asd</p>
            </div> */}
        </>
    )
}
