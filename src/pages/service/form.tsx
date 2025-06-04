import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormInput } from "../../components/form";
import { useEffect, useState } from "react";
import { topupData, transactionData } from "../../store/reducers/transaction/transaction.action";

interface transactionForm {
    service_code: string;
}
export default function FormService(payload: any) {
    const { data } = payload;
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [busy, setBusy] = useState(true);

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

    const onSubmit = async (data: transactionForm) => {
        try {
            setBusy(true);
            await dispatch(transactionData(data));
            history.push('/dashboard');
            setBusy(false);
            return true;
        } catch (e: any) {
            setBusy(false);
            return false
        }
    }

    return (
        <div className="">
            <div className="mb-6">
                <FormInput
                    readOnly
                    value={data?.service_tariff ?? ""} type="number" placeholder="masukan nominal " />
            </div>
            <div className="">
                <button type="button" disabled={busy} onClick={handleSubmit(onSubmit)} className="bg-primary text-white px-4 py-3 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400">
                    Bayar
                </button>
            </div>
        </div>
    )
}