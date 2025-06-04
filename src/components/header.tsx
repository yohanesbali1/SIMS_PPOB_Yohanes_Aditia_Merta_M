import { useState } from "react";
export default function Header() {
    interface Menu {
        link: string;
        name: string;
    }
    const [menu, setMenu] = useState<Menu[]>([
        { link: '/top', name: 'Top Up' },
        { link: '', name: 'Transaction' },
        { link: '', name: 'Akun' },
    ]);
    return (
        <header className="w-full  py-4 border-b ">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <div></div>
                <div>
                    <ul className="flex gap-8 text-sm font-semibold">
                        {menu.map((item: any, index: number) => (
                            <li key={index}><a href={item.link}> {item.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}