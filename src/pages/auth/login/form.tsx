import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginData } from "../../../store/reducers/auth/auth.action";
import { FormInput } from "../../../components/form";
interface LoginForm {
    email: string;
    password: string;
}
export default function FormLogin() {
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
        <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-3">
                <FormInput register={register("email")} type="email" errors={errors?.email} placeholder="masukan email anda" />
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
            </div>
            <div className="mb-3">
                <FormInput register={register("password")} type="password" errors={errors?.password} placeholder="masukan password anda" />
                <p className="text-red-500 text-xs">{errors.password?.message}</p>
            </div>
            <div className="mt-7">
                <button type="submit" className="bg-primary text-white py-3 px-4 rounded-sm w-full">Login</button>
            </div>
        </form>
    )
}