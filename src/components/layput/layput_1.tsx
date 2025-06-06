import { useSelector } from "react-redux";
import Avatar from "../avatar";
import { useEffect, useState } from "react";
import Wallet from "../wallet";

export default function Layout_1({ children }: any) {

    const { data_user } = useSelector((state: any) => state.auth);
    const [name, set_name] = useState<any>('-');

    useEffect(() => {
        if (data_user) set_name(`${data_user.first_name} ${data_user.last_name}`);
    }, [data_user])

    return (
        <div>
            <div className="flex md:flex-col justify-between items-center md:items-start w-full max-w-7xl px-4 md:px-6 mx-auto mt-10 gap-6">
                <div className="flex-1  w-full">
                    <Avatar />
                </div>
                <div className="flex-1 w-full">
                    <Wallet />
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}