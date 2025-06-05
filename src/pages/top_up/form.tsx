import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormInput } from "../../components/form";
import { useEffect, useState } from "react";
import { topupData } from "../../store/reducers/transaction/transaction.action";
import ModalAlert from "../../components/modal";
import { useModalAlert } from "../../hook/useModalAlert";
import { formatRupiah } from "../../helper/helper";

interface topupForm {
    top_up_amount: number;
}
export default function FormTopUp() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [busy, setBusy] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [modalType, setModalType] = useState<any>('confirm');

    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();


    const options = [
        { value: '10000', label: '10.000' },
        { value: '20000', label: '20.000' },
        { value: '50000', label: '50.000' },
        { value: '100000', label: '100.000' },
        { value: '1000000', label: '1.000.000' },
    ];


    const schema = yup.object().shape({
        top_up_amount: yup.number().min(10000, 'Minimal top up adalah 10.000').max(1000000).required('email wajib diisi'),
    })
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<topupForm>({
        resolver: yupResolver(schema)
    })


    const top_up = watch("top_up_amount");

    useEffect(() => {
        if (top_up < 10000 || top_up > 1000000) {
            return setDisabled(true);
        }
        return setDisabled(false);
    }, [top_up])

    useEffect(() => {
        if (modalType === 'success' || modalType === 'error') {
            const timer = setTimeout(() => setModalType('none'), 2000);
            return () => clearTimeout(timer);
        }
    }, [modalType]);

    const onSubmit = async (data: topupForm) => {
        const confirmed = await showConfirm(
            `Apakah yakin untuk Top Up sebesar`,
            `${formatRupiah(data.top_up_amount)}`,
            'Ya, lanjutkan top up',
            'Batalkan'
        );

        if (!confirmed) return;
        try {
            setBusy(true);
            showLoading('Processing top-up', 'Please wait...');
            await dispatch(topupData(data));
            await showResult('success', 'Top-up Sebesar', formatRupiah(data.top_up_amount), 'Kembali ke beranda');
            history.push('/dashboard');
            setBusy(false);
        } catch (e: any) {
            setBusy(false);
            showResult('error', 'Top-up Failed', e.message);
        }
    };

    return (
        <>

            <div className="grid grid-cols-3 gap-x-6">
                <div className="col-span-2">
                    <FormInput
                        onWheel={(e: any) => e.currentTarget.blur()}
                        disabled={busy}
                        icon="fa fa-money-bill"
                        register={register("top_up_amount")} type="number" min={10000} max={1000000} errors={errors?.top_up_amount} placeholder="masukan nominal Top Up" />
                </div>
                <div className="grid grid-cols-3 row-span-2 gap-3">
                    {options.map((option: any, index: number) => (
                        <label
                            key={index}
                            htmlFor={`${index}`}
                            className={`block p-3 rounded-lg border cursor-pointer transition-all duration-150 ${top_up === option.value
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="radio"
                                id={`${index}`}
                                disabled={busy}
                                value={option.value}
                                onChange={(e: any) => setValue("top_up_amount", e.target.value, { shouldValidate: true })}
                                className="hidden"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
                <div className="col-span-2">
                    <button type="button" disabled={disabled || busy} onClick={handleSubmit(onSubmit)} className="bg-primary text-white px-4 py-3 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400">
                        Top Up
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