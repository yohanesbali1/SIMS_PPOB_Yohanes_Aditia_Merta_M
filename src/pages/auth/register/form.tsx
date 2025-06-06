import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginData, registerData } from "../../../store/reducers/auth/auth.action";
import { useEffect, useState } from "react";
import { FormInput } from "../../../components/form";
import { useModalAlert } from "../../../hook/useModalAlert";
import ModalAlert from "../../../components/modal";
interface LoginForm {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    c_password: string;
}
export default function FormRegister() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [busy, setBusy] = useState(false);

    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();

    const [show, setShow] = useState<any>({
        password: false,
        c_password: false
    });
    const schema = yup.object().shape({
        email: yup.string().email().required('email wajib diisi'),
        first_name: yup.string().required('nama depan wajib diisi'),
        last_name: yup.string().required('nama belakang wajib diisi'),
        password: yup.string().min(8, 'password minimal 8 karakter').required('password wajib diisi'),
        c_password: yup.string()
            .oneOf([yup.ref('password')], 'konfirmasi password tidak cocok')
            .required('konfirmasi password wajib diisi'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: LoginForm) => {
        try {
            setBusy(true);
            showLoading('Proses Registrasi', '');
            await dispatch(registerData(data));
            await showResult('success', 'Proses Registrasi', '', 'Kembali ke beranda');
            setBusy(false);
            history.push('/');
            return true;
        } catch (e: any) {
            setBusy(false);
            showResult('error', 'Proses Registrasi', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');
            return false
        }
    }

    return (
        <>
            <form action="" autoCapitalize="off" autoCorrect="off" autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mb-3">
                    <FormInput disabled={busy} icon="fa fa-user" register={register("email")} type="email" errors={errors?.email} placeholder="masukan email anda" />

                    <p className="text-red-500 text-xs">{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                    <FormInput disabled={busy} icon="fa fa-user" register={register("first_name")} type="text" errors={errors?.first_name} placeholder="masukan nama depan anda" />
                    <p className="text-red-500 text-xs">{errors.first_name?.message}</p>
                </div>
                <div className="mb-3">
                    <FormInput disabled={busy} icon="fa fa-user" register={register("last_name")} type="text" errors={errors?.last_name} placeholder="masukan nama belakang anda" />
                    <p className="text-red-500 text-xs">{errors.last_name?.message}</p>
                </div>
                <div className="mb-3">
                    <FormInput disabled={busy} icon="fa fa-key" register={register("password")} icon_passowrd="fa fa-eye" type={show.password ? "text" : "password"} errors={errors?.password} placeholder="masukan password anda" >
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShow({ ...show, password: !show.password })} ><i className={`${show.password ? "fa fa-eye" : "fa fa-eye-slash"} text-gray-400 text-sm`}></i></span>
                    </FormInput>
                    <p className="text-red-500 text-xs">{errors.password?.message}</p>
                </div>
                <div className="mb-3">
                    <FormInput disabled={busy} icon="fa fa-key" register={register("c_password")} icon_passowrd="fa fa-eye" type={show.c_password ? "text" : "password"} errors={errors?.c_password} placeholder="masukan password anda" >
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShow({ ...show, c_password: !show.c_password })} ><i className={`${show.c_password ? "fa fa-eye" : "fa fa-eye-slash"} text-gray-400 text-sm`}></i></span>
                    </FormInput>
                    <p className="text-red-500 text-xs">{errors.c_password?.message}</p>
                </div>
                <div className="mt-7">
                    <button type="submit" disabled={busy} className="bg-primary text-white py-3 px-4 rounded-sm w-full">Login</button>
                </div>
            </form>

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