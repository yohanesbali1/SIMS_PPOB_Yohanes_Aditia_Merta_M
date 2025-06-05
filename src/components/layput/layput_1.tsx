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
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto mt-16">
                <div className="flex-1">
                    <Avatar />
                </div>
                <div className="flex-1">
                    <Wallet />
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}