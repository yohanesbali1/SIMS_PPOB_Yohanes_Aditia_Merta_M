import Layout_1 from "../../components/layput/layput_1";
import FormTopUp from "./form";

export default function TopUp() {
    return (
        <div>
            <Layout_1>
                <div className="w-full max-w-7xl mx-auto mt-10">
                    <p>Silahkan masukan</p>
                    <h5 className="font-semibold text-2xl">Nominal Top Up</h5>
                </div>
                <div className="w-full max-w-7xl mx-auto mt-10">
                    <FormTopUp />
                </div>
            </Layout_1>
        </div>
    )
}