import { useEffect, useState } from "react";
import Layout_1 from "../../components/layout/layout_1";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuService } from "../../store/reducers/serives/service.action";
import FormService from "./form";
import { Helmet } from "react-helmet";
import ModalAlert from "../../components/modal";
import { useModalAlert } from "../../hook/useModalAlert";

export default function Service() {
    const { service } = useParams<any>();
    const dispatch = useDispatch<any>();
    const { menu_service } = useSelector((state: any) => state.service);
    const [data, set_data] = useState<any>(null);
    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        var data = menu_service.find((item: any) => item.service_code == service);
        if (data) set_data(data);

    }, [menu_service])

    const getData = async () => {
        try {
            await dispatch(menuService());
        } catch (e: any) {
            showResult('error', 'Pengambilan Data Akun', e?.message || "Terjadi kesalahan", 'Kembali ke beranda');
        }
    }

    return (
        <>
            <Helmet>
                <title>{`Pembayaran ${data?.service_name || '-'}`} | SIMS PPOB Yohanes Aditia Merta M</title>
                <meta name="description" content={`Halaman pembayaran ${data?.service_name || '-'} SIMS PPOB`} />
            </Helmet>
            <Layout_1>
                <div className="w-full max-w-7xl mx-auto mt-10 px-4">
                    <p className="font-semibold text-base mb-4">Pembayaran</p>
                    <div className="flex gap-3 items-center">
                        <div>
                            <img src={data?.service_icon} alt={data?.service_code} className="w-8 h-8 object-cover rounded-full" />
                        </div>
                        <h6 className="font-semibold text-lg">{data?.service_name}</h6>
                    </div>
                </div>
                <div className="w-full max-w-7xl mx-auto mt-10 px-4 pb-10">
                    <FormService data={data} />
                </div>

            </Layout_1>
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
                    style_message={"text-base "}
                    style_title={"text-xl font-semibold mb-0"}
                />
            )}
        </>
    )
}