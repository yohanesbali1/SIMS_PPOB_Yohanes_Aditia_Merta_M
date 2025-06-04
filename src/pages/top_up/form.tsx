import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormInput } from "../../components/form";
import { useEffect, useState } from "react";
import { on } from "events";
import { topupData } from "../../store/reducers/transaction/transaction.action";

interface topupForm {
    top_up_amount: number;
}
export default function FormTopUp() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [busy, setBusy] = useState(false);


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
            return setBusy(true);
        }
        return setBusy(false);
    }, [top_up])
    const onSubmit = async (data: topupForm) => {
        try {
            setBusy(true);
            await dispatch(topupData(data));
            history.push('/dashboard');
            setBusy(false);
            return true;
        } catch (e: any) {
            setBusy(false);
            return false
        }
    }

    return (
        <div className="grid grid-cols-3 gap-x-6">
            <div className="col-span-2">
                <FormInput
                    onWheel={(e: any) => e.currentTarget.blur()}
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
                            value={option.value}
                            onChange={(e: any) => setValue("top_up_amount", e.target.value, { shouldValidate: true })}
                            className="hidden"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
            <div className="col-span-2">
                <button type="button" disabled={busy} onClick={handleSubmit(onSubmit)} className="bg-primary text-white px-4 py-3 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400">
                    Top Up
                </button>
            </div>
        </div>
    )
}