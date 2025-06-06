import { Helmet } from "react-helmet";
import Layout_1 from "../../components/layout/layout_1";
import FormTopUp from "./form";

export default function TopUp() {
    return (
        <>
            <Helmet>
                <title>Top Up | SIMS PPOB</title>
                <meta name="description" content="Halaman Top Up SIMS PPOB" />
            </Helmet>
            <Layout_1>
                <div className="w-full max-w-7xl mx-auto mt-10 px-4">
                    <p>Silahkan masukan</p>
                    <h5 className="font-semibold text-2xl">Nominal Top Up</h5>
                </div>
                <div className="w-full max-w-7xl mx-auto mt-10 pb-10  px-4">
                    <FormTopUp />
                </div>
            </Layout_1>
        </>
    )
}