import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import FormAccount from "./form";
import Cookies from "js-cookie";
import Avatar from "../../components/avatar";
import { Helmet } from "react-helmet";



export default function Account() {
    const history = useHistory();
    const [can_edit, setCanEdit] = useState(false);
    const { data_user } = useSelector((state: any) => state.auth);
    const logOut = () => {
        Cookies.remove('token');
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <Helmet>
                <title>Akun | SIMS PPOB</title>
                <meta name="description" content="Halaman akun SIMS PPOB" />
            </Helmet>
            <div className="w-full max-w-4xl mx-auto pt-40 ">
                <div>
                    <Avatar />

                </div>
                <FormAccount data_user={data_user} setCanEdit={setCanEdit} can_edit={can_edit} />
                {!can_edit &&
                    <div className="mt-4 px-4">
                        <button type="button" onClick={logOut} className="bg-primary text-white py-3 px-4 rounded-sm w-full">Logout</button>
                    </div>
                }
            </div>
        </>
    )
}