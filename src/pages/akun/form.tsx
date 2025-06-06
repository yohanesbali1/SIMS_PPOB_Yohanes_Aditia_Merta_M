import { FormInput, FormLabel } from "../../components/form";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileUpdateData } from "../../store/reducers/auth/auth.action";
import { useEffect, useState } from "react";
import { useModalAlert } from "../../hook/useModalAlert";
import ModalAlert from "../../components/modal";

interface updateProfileForm {
    first_name: string;
    last_name: string;
}

export default function FormAccount(payload: any) {
    const { data_user, setCanEdit, can_edit } = payload;
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


    const schema = yup.object().shape({
        first_name: yup.string().required('nama depan wajib diisi'),
        last_name: yup.string().required('nama belakang wajib diisi'),
    })
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<updateProfileForm>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (data_user) {
            setValue('first_name', data_user.first_name);
            setValue('last_name', data_user.last_name);
        }
    }, [data_user])

    const onSubmit = async (data: updateProfileForm) => {
        try {
            setBusy(true);
            showLoading('Proses Perubahan Data Diri', '');
            await dispatch(profileUpdateData(data));
            await showResult('success', 'Perubahan Data Diri', '', 'Close');
            setBusy(false);
            setCanEdit(false);
        } catch (e: any) {
            setBusy(false);
            showResult('error', 'Perubahan Data Diri', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');

        }
    }
    return (
        <>

            <div className="w-full max-w-4xl mx-auto mt-10 px-4 mb-5">
                <form action="" autoCapitalize="off" autoComplete="off" id="account" >
                    <div>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormInput value={data_user?.email ?? ""} disabled readOnly type="email" placeholder="masukan email anda" />
                    </div>
                    <div className="mt-3">
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <FormInput disabled={!can_edit || busy} id="first_name" register={register("first_name")} type="text" errors={errors?.first_name} placeholder="masukan nama depan" />
                    </div>
                    <div className="mt-3">
                        <FormLabel htmlFor="last_name">Last Name</FormLabel>
                        <FormInput disabled={!can_edit || busy} id="last_name" register={register("last_name")} type="text" errors={errors?.last_name} placeholder="masukan nama belakang" />
                    </div>

                </form>
                <div className="mt-7">
                    {
                        can_edit ? (
                            <>
                                <button disabled={busy} onClick={handleSubmit(onSubmit)} className="bg-primary text-white py-3 px-4 rounded-sm w-full font-semibold">Simpan</button>
                                <button disabled={busy} onClick={() => setCanEdit(false)} className="bg-white rounded-sm py-3 px-4 w-full border border-primary text-primary font-semibold mt-5">Batal</button>
                            </>
                        )
                            : <button
                                onClick={() => setCanEdit(true)}
                                className="bg-white rounded-sm py-3 px-4 w-full border border-primary text-primary font-semibold"
                            >
                                Edit Profil
                            </button>
                    }
                </div>
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
                    style_message={"text-base  "}
                    style_title={"text-xl font-semibold mb-0"}
                />
            )}
        </>
    )
}