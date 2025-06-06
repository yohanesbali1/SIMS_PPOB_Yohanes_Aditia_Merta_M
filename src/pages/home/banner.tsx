import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerService } from '../../store/reducers/serives/service.action';
import ModalAlert from '../../components/modal';
import { useModalAlert } from '../../hook/useModalAlert';

export default function Banner() {
    const dispatch = useDispatch<any>();
    const { banner_service } = useSelector((state: any) => state.service);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const {
        modal,
        showConfirm,
        showLoading,
        showResult,
        closeModal,
        confirmModal,
    } = useModalAlert();

    useEffect(() => {
        checkScrollPosition();
        const scrollEl = scrollRef.current;
        if (scrollEl) {
            scrollEl.addEventListener('scroll', checkScrollPosition);
        }
        return () => {
            if (scrollEl) {
                scrollEl.removeEventListener('scroll', checkScrollPosition);
            }
        }
    }, [banner_service]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await dispatch(bannerService());
    }

    const checkScrollPosition = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className="w-full mx-auto mt-16 px-4">
                <div className='w-full max-w-7xl mx-auto  mb-4 lg:mb-2 '>
                    <h6 className="font-semibold">Temukan Promo Menarik</h6>
                </div>
                <div className="px-6 md:px-0 py-8 lg:py-4 relative">
                    {canScrollLeft && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full ml-2 w-10 h-10 flex items-center justify-center"
                            aria-label="Scroll Left"
                        >

                            <i className='fa fa-arrow-left'></i>
                        </button>
                    )}

                    {canScrollRight && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full mr-2 w-10 h-10 flex items-center justify-center"
                            aria-label="Scroll Right"
                        >
                            <i className='fa fa-arrow-right'></i>
                        </button>
                    )}

                    <div className="overflow-x-auto -ml-5 md:ml-0 pl-80 lg:pl-0 md:pl-0 scroll-hide" ref={scrollRef}>
                        <div className="flex gap-4 whitespace-nowrap">
                            {banner_service.map((promo: any, index: any) => (
                                <img
                                    key={index}
                                    src={promo.banner_image}
                                    alt={index}
                                    className="inline-block w-96 h-36 object-cover rounded-xl shadow-md flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
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
                    style_message={"text-lg  font-semibold text-gray-700 "}
                    style_title={"text-base font-regula mb-1"}
                />
            )}
        </>
    )
}