import { Helmet } from "react-helmet";
import Layout_1 from "../../components/layout/layout_1";
import ListData from "./list_item";

export default function Transaction() {

    return (
        <>
            <Helmet>
                <title>Riwayat Transaksi | SIMS PPOB</title>
                <meta name="description" content={`Riwayat Transaksi SIMS PPOB`} />
            </Helmet>
            <Layout_1>
                <div className="w-full max-w-7xl mx-auto mt-10 px-4">
                    <p className="font-semibold text-base">Silahkan Transaksi</p>
                    <ListData />
                </div>
            </Layout_1>
        </>
    )
}