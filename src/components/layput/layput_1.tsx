export default function Layout_1({ children }: any) {
    return (
        <div>
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto mt-16">
                <div className="flex-1">
                    <p className="text-lg">Selamat Datang,</p>
                    <h5 className="text-2xl font-semibold">Kristantio Wibowo</h5>
                </div>
                <div className="flex-1">
                    <div className="bg-primary rounded-xl w-full px-8 py-6 text-white">
                        <p className="mb-4">Saldo anda</p>
                        <h6 className="text-3xl mb-4 font-semibold">Rp 100.000</h6>
                        <div className="flex text-xs items-center">
                            <div>Lihat Saldo</div>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}