import { FormInput, FormLabel } from "../../components/form";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileUpdateData } from "../../store/reducers/auth/auth.action";
import { useState } from "react";

interface updateProfileForm {
    email: string;
    first_name: string;
    last_name: string;
}

export default function FormAccount() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [busy, setBusy] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email().required('email wajib diisi'),
        first_name: yup.string().required('nama depan wajib diisi'),
        last_name: yup.string().required('nama belakang wajib diisi'),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<updateProfileForm>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: updateProfileForm) => {
        try {
            setBusy(true);
            await dispatch(profileUpdateData(data));
            setBusy(false);
        } catch (e: any) {
            setBusy(false);
            return false
        }
    }
    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormInput register={register("email")} type="email" errors={errors?.email} placeholder="masukan email anda" />
                </div>
                <div className="mt-3">
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <FormInput id="first_name" register={register("first_name")} type="text" errors={errors?.first_name} placeholder="masukan nama depan" />
                </div>
                <div className="mt-3">
                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                    <FormInput id="last_name" register={register("last_name")} type="text" errors={errors?.last_name} placeholder="masukan nama belakang" />
                </div>
                <div className="mt-7">
                    <button type="submit" className="bg-primary text-white py-3 px-4 rounded-sm w-full">Login</button>
                </div>
            </form>
        </div>
    )
}