import { FormInput, FormLabel } from "../../components/form";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { profileData, profileUpdateData } from "../../store/reducers/auth/auth.action";
import { useEffect, useState } from "react";
import FormAccount from "./form";



export default function Account() {
    const dispatch = useDispatch<any>();
    const { data_user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await dispatch(profileData());
    }
    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            <FormAccount data={data_user} />
        </div>
    )
}