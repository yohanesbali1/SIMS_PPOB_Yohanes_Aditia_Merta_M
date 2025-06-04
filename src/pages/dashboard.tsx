import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Layout_1 from '../components/layput/layput_1';

export default function Dashboard() {

    const menus = [
        { name: "PBB", color: "bg-[#E6F4EC]", link: "/pbb", icon: "🏠" },
        { name: "Listrik", color: "bg-[#FFF3E0]", link: "/listrik", icon: "⚡" },
        { name: "Pulsa", color: "bg-[#EDEDED]", link: "/pulsa", icon: "📱" },
        { name: "PDAM", color: "bg-[#EDF1FE]", link: "/pdam", icon: "🚰" },
        { name: "PGN", color: "bg-[#FFF0EC]", link: "/pgn", icon: "🔥" },
        { name: "TV Langganan", color: "bg-[#F2EDFF]", link: "/tv", icon: "📺" },
        { name: "Musik", color: "bg-[#FBEDFF]", link: "/musik", icon: "🎵" },
        { name: "Voucher Game", color: "bg-[#EBFAD9]", link: "/game", icon: "🎮" },
        { name: "Voucher Makanan", color: "bg-[#EFF6FE]", link: "/makanan", icon: "🍔" },
        { name: "Kurban", color: "bg-[#F4F4F4]", link: "/kurban", icon: "🐄" },
        { name: "Zakat", color: "bg-[#ECFFF3]", link: "/zakat", icon: "🕌" },
        { name: "Paket Data", color: "bg-[#EBFBFF]", link: "/paket-data", icon: "📶" },
    ];
    const promos = [
        {
            title: "Saldo Gratis!",
            description: "Saldo SIMS PPOB gratis maksimal Rp25.000 untuk pengguna pertama",
            color: "bg-[#EF2B2D]",
            link: "/promo/saldo",
        },
        {
            title: "Diskon listrik!",
            description: "Diskon untuk setiap pembayaran listrik prabayar/pascabayar 10%",
            color: "bg-[#F8C3D3]",
            link: "/promo/listrik",
        },
        {
            title: "Promo makan!",
            description: "Dapatkan voucher makan di restoran favorit setelah transaksi disini!",
            color: "bg-[#83D3F7]",
            link: "/promo/makan",
        },
        {
            title: "Cashback 25%",
            description: "Untuk setiap pembayaran voucher game di atas Rp100.000",
            color: "bg-[#D2D2E9]",
            link: "/promo/cashback",
        },
        {
            title: "Buy 1 Get 2!",
            description: "Dapatkan dua bulan gratis untuk setiap langganan baru",
            color: "bg-[#EEDDD0]",
            link: "/promo/buy1get2",
        },
    ];
    return (
        <div>
            <Layout_1>
                <div className="w-full max-w-7xl mx-auto mt-16">
                    <div className="flex gap-4 p-4 flex-wrap">
                        {menus.map((menu) => (
                            <a key={menu.name}
                                href={menu.link} className=" w-20 h-20">
                                <div
                                    className={`  flex flex-col items-center justify-center rounded-xl p-4 ${menu.color} hover:scale-105 transition-transform shadow`}
                                >
                                    <div className="text-2xl w-10 h-10 m-auto flex items-center justify-center">{menu.icon}</div>
                                </div>
                                <p className="mt-2 text-sm font-regular text-gray-800 text-center">{menu.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="w-full mx-auto mt-16 ">
                    <div className='w-full max-w-7xl mx-auto  mb-4 '>
                        <h6 className="font-semibold">Temukan Promo Menarik</h6>
                    </div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {promos.map((promo) => (
                            <SwiperSlide>
                                <div
                                    key={promo.title}
                                    // href={promo.link}
                                    className={`rounded-xl p-4 w-full text-white ${promo.color} hover:scale-105 transition-transform shadow`}
                                >
                                    <h3 className="text-lg font-bold">{promo.title}</h3>
                                    <p className="text-sm mt-2">{promo.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Layout_1>
        </div>
    )
}