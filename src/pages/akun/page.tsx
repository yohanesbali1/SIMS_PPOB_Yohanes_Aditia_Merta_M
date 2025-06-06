import { FormInput, FormLabel } from "../../components/form";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileData, profileUpdateData } from "../../store/reducers/auth/auth.action";
import { useEffect, useState } from "react";
import FormAccount from "./form";
import Cookies from "js-cookie";
import Avatar from "../../components/avatar";



export default function Account() {
    const dispatch = useDispatch<any>();
    const history = useHistory();
    const [can_edit, setCanEdit] = useState(false);
    const { data_user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await dispatch(profileData());
    }

    const logOut = () => {
        Cookies.remove('token');
        history.push('/');
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
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
    )
}