import Avatar from "../avatar";
import Wallet from "../wallet";

export default function Layout_1({ children }: any) {
    return (
        <div>
            <div className="flex md:flex-col justify-between items-center md:items-start w-full max-w-7xl px-4 md:px-6 mx-auto mt-10 gap-6 pt-20">
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