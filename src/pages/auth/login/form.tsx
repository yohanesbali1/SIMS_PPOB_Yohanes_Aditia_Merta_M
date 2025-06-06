import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginData } from "../../../store/reducers/auth/auth.action";
import { FormInput } from "../../../components/form";
import { useEffect, useState } from "react";
import { useModalAlert } from "../../../hook/useModalAlert";
import ModalAlert from "../../../components/modal";
import Toast from "../../../components/toast";
import { useToast } from "../../../hook/useToast";
interface LoginForm {
    email: string;
    password: string;
}
export default function FormLogin() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [show, setShow] = useState<boolean>(false);
    const [busy, setBusy] = useState<boolean>(false);
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();
    const { toasts, showToast, removeToast } = useToast();

    const schema = yup.object().shape({
        email: yup.string().email('email tidak valid').required('email wajib diisi'),
        password: yup.string().required('password wajib diisi'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {

    }, [])
    const onSubmit = async (data: LoginForm) => {
        try {
            setBusy(true);
            showLoading('Processing top-up', 'Please wait...');
            await dispatch(loginData(data));
            closeModal();
            setBusy(false);
            history.push('/dashboard');
            return true;
        } catch (e: any) {
            closeModal();
            showToast(e?.message || "Terjadi kesalahan", {
                title: "",
                type: "error",
            })
            setBusy(false);
        }
    }

    return (
        <>
            <form action="" autoComplete="off" autoCorrect="off" onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mb-3">
                    <FormInput icon="fa fa-user" disabled={busy} register={register("email")} type="email" errors={errors?.email} placeholder="masukan email anda" />
                    <p className="text-red-500 text-xs">{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                    <FormInput icon="fa fa-key" disabled={busy} register={register("password")} icon_passowrd="fa fa-eye" type={show ? "text" : "password"} errors={errors?.password} placeholder="masukan password anda" >
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShow(!show)} ><i className={`${show ? "fa fa-eye" : "fa fa-eye-slash"} text-gray-400 text-sm`}></i></span>
                    </FormInput>
                    <p className="text-red-500 text-xs">{errors.password?.message}</p>
                </div>
                <div className="mt-7">
                    <button type="submit" disabled={busy} className="bg-primary text-white py-3 px-4 rounded-sm w-full">Login</button>
                </div>
            </form>
            <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>

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
                    style_message={"text-lg  font-semibold text-gray-700 "}
                    style_title={"text-base font-regula mb-1"}
                />
            )}
        </>
    )
}
