import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormInput } from "../../components/form";
import { useEffect, useState } from "react";
import { transactionData } from "../../store/reducers/transaction/transaction.action";
import { useModalAlert } from "../../hook/useModalAlert";
import ModalAlert from "../../components/modal";
import { formatRupiah } from "../../helper/helper";

interface transactionForm {
    service_code: string;
}
export default function FormService(payload: any) {
    const { data } = payload;
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [busy, setBusy] = useState(true);
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();


    useEffect(() => {
        if (data) {
            setValue('service_code', data.service_code);
            return setBusy(false);
        }
        return setBusy(true);
    }, [data])



    const schema = yup.object().shape({
        service_code: yup.string().required('wajib diisi'),
    })
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<transactionForm>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (form: transactionForm) => {
        const confirmed = await showConfirm(
            `Pembayaran ${data?.service_name} prabayar senilai`,
            `${formatRupiah(data?.service_tariff ?? 0)}`,
            'Ya, lanjutkan Bayar',
            'Batalkan'
        );

        if (!confirmed) return;
        try {
            setBusy(true);
            showLoading('Processing top-up', 'Please wait...');
            await dispatch(transactionData(form));
            await showResult('success', `Pembayaran ${data?.service_name} prabayar senilai`, formatRupiah(data?.service_tariff ?? 0), 'Kembali ke beranda');
            history.push('/dashboard');
            setBusy(false);
            return true;
        } catch (e: any) {
            setBusy(false);
            return false
        }
    }

    return (
        <>
            <div className="">
                <div className="mb-6">
                    <FormInput
                        readOnly
                        icon="fa fa-money-bill"
                        value={formatRupiah(data?.service_tariff ?? 0)} type="text" placeholder="masukan nominal " />
                </div>
                <div className="">
                    <button type="button" disabled={busy} onClick={handleSubmit(onSubmit)} className="bg-primary text-white px-4 py-3 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400">
                        Bayar
                    </button>
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
                    style_message={"text-lg  font-semibold text-gray-700 "}
                    style_title={"text-base font-regula mb-1"}
                />
            )}
        </>
    )
}