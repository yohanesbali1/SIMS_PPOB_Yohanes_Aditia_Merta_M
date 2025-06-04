import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { historyData } from "../../store/reducers/transaction/transaction.action";
import moment from 'moment-timezone';
import 'moment/locale/id';
import { set } from "react-hook-form";
import { formatRupiah } from "../../helper/helper";


interface ListDataProps {
    search: {
        offset: number;
        limit: number;
    }
}
export default function ListData() {
    const dispatch = useDispatch<any>();
    const [option_filter, setOptionFilter] = useState<ListDataProps['search']>({
        offset: 0,
        limit: 5
    });
    const [busy, setBusy] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [data, setData] = useState<any>([]);
    const { history_data } = useSelector((state: any) => state.transaction);
    useEffect(() => {
        setData([]);
        getData();
    }, [])

    useEffect(() => {
        if (history_data.length) {
            setData((prev: any) => [...prev, ...history_data]);
            setHasMore(history_data.length >= option_filter.limit);
        }
    }, [history_data])

    const getData = async () => {
        try {
            setBusy(true);
            let payload = {
                offset: option_filter.offset,
                limit: option_filter.limit
            }
            await dispatch(historyData(payload));
            setOptionFilter({ ...option_filter, offset: option_filter.offset + option_filter.limit });
            setBusy(false);
        } catch (e: any) {
            console.error("Fetch error:", e);
        } finally {
            setBusy(false);
        }
    }

    const type_payment = (status: string) => {
        if (status == 'TOPUP') {
            return {
                symbol: " +",
                color: "text-green-500"
            }
        } else {
            return {
                symbol: "-",
                color: "text-red-500"
            }
        }
    }

    return (
        <div>
            <div className="mt-3 flex flex-col gap-3 mb-3">
                {
                    data.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border">
                            <div>
                                <div className={type_payment(item.transaction_type)?.color}>
                                    {type_payment(item.transaction_type)?.symbol} <span className="font-semibold">{formatRupiah(item.total_amount)}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{moment(item.created_at).tz('Asia/Jakarta').locale('id').format('DD MMMM YYYY HH:mm')} WIB</p>
                            </div>
                            <div className="text-sm">
                                {item.description}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {hasMore && <button type="button" disabled={busy} onClick={() => getData()} className="w-full mt-4 py-2 text-primary text-sm ">Show More</button>}
            </div>
        </div>
    )
}