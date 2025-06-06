import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { balanceData } from "../store/reducers/transaction/transaction.action";
import { number } from "yup";
import { formatRupiah } from "../helper/helper";

export default function Wallet() {
    const dispatch = useDispatch<any>();
    const { balance_data } = useSelector((state: any) => state.transaction);
    const [money, setMoney] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        if (balance_data) setMoney(balance_data.balance);
    }, [balance_data]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await dispatch(balanceData());
    }

    return (
        <div className="bg-primary rounded-xl w-full px-5 py-6  text-white">
            <p className="mb-4">Saldo anda</p>
            <h6 className="text-3xl mb-4 font-semibold">{show ? formatRupiah(money) : "*******"}</h6>
            <div className="flex text-xs gap-x-2 items-center">
                <div>Lihat Saldo</div>
                <span onClick={() => setShow(!show)} ><i className={show ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
            </div>
        </div>)
}