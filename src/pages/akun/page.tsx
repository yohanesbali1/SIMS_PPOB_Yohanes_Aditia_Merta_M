import { FormInput, FormLabel } from "../../components/form";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileData, profileUpdateData } from "../../store/reducers/auth/auth.action";
import { useEffect, useState } from "react";
import FormAccount from "./form";
import Cookies from "js-cookie";
import Avatar from "../../components/avatar";
import { Helmet } from "react-helmet";
import ModalAlert from "../../components/modal";
import { useModalAlert } from "../../hook/useModalAlert";



export default function Account() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [can_edit, setCanEdit] = useState(false);
    const { data_user } = useSelector((state: any) => state.auth);
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            await dispatch(profileData());
        } catch (e: any) {
            showResult('error', 'Proses Registrasi', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');
        }
    }

    const logOut = () => {
        Cookies.remove('token');
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <Helmet>
                <title>Akun | SIMS PPOB</title>
                <meta name="description" content="Halaman akun SIMS PPOB" />
            </Helmet>
            <div className="w-full max-w-4xl mx-auto pt-40 ">
                <div>
                    <Avatar />

                </div>
                <FormAccount data_user={data_user} setCanEdit={setCanEdit} can_edit={can_edit} />
                {!can_edit &&
                    <div className="mt-4 px-4">
                        <button type="button" onClick={logOut} className="bg-primary text-white py-3 px-4 rounded-sm w-full">Logout</button>
                    </div>
                }
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