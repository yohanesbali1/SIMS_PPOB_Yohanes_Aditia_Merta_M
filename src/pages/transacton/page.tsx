import Layout_1 from "../../components/layput/layput_1";
import ListData from "./list_item";

export default function Transaction() {

    return (
        <div>
            <Layout_1>
                <div className="w-full max-w-7xl mx-auto mt-10">
                    <p className="font-semibold text-base">Silahkan Transaksi</p>
                    <ListData />
                </div>
            </Layout_1>
        </div>
    )
}