import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { menuService } from "../../store/reducers/serives/service.action";

export default function MenuDashboard() {
    const dispatch = useDispatch<any>();
    const { menu_service } = useSelector((state: any) => state.service);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await dispatch(menuService());
    }

    return (
        <div className="w-full max-w-7xl mx-auto mt-16">
            <div className="flex gap-6 p-4 flex-wrap">
                {menu_service.map((menu: any) => (
                    <a key={menu.name}
                        href={`/${menu.service_code}`} className=" mx-auto w-20 " >
                        <div
                            className={`  flex flex-col items-center justify-center   ${menu.color} `}
                        >
                            <div className="text-2xl  m-auto flex items-center justify-center"><img src={menu.service_icon} alt={menu.service_name} className="w-full h-full" /></div>
                        </div>
                        <p className="mt-2 text-xs font-regular text-gray-800 text-center">{menu.service_name}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}