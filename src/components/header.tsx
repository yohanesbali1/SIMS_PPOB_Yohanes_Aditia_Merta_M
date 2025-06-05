import { useEffect, useState } from "react";
import { profileData } from "../store/reducers/auth/auth.action";
import { useDispatch } from "react-redux";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

interface Menu {
    link: string;
    name: string;
}
export default function Header() {
    const dispatch = useDispatch<any>();
    const [menu, setMenu] = useState<Menu[]>([
        { link: '/topup', name: 'Top Up' },
        { link: '/transacton', name: 'Transaction' },
        { link: '/account', name: 'Akun' },
    ]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await dispatch(profileData());
    }

    return (
        <header className="w-full  py-4 border-b ">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/dashboard">
                    <div className="flex gap-x-2 items-center">
                        <div className="w-7 h-7">
                            <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                    </div>
                </Link>
                <div>
                    <ul className="flex gap-8 text-sm font-semibold">
                        {menu.map((item: any, index: number) => (
                            <li key={index}><Link to={item.link}> {item.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}