
import { Dispatch } from 'react';
import { types } from './auth.type';
import apiClient from '../../../helper/apiConfig';
import { decryptWithExpiry, encryptWithExpiry } from '../../../hook/useCript';
import Cookies from 'js-cookie';

export const loginData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().post(`/login`, payload);
        const datas: any = { token: response.data.data.token, email: payload.email };
        const encryptedPayload = encryptWithExpiry(JSON.stringify(datas));
        localStorage.setItem('token_enc', encryptedPayload);
        // Cookies.set('token', datas.token);
        dispatch({ type: types.LOGIN_DATA, payload: response.data.data });
    } catch (e: any) {
        throw e?.response?.data;
    }
}
export const registerData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        await apiClient().post(`/registration`, payload);
        return true;
    } catch (e: any) {
        throw e?.response?.data;
    }
}
export const profileData = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().get(`/profile`);
        dispatch({ type: types.PROFILE_DATA, payload: response.data.data });
    } catch (e: any) {
        throw e?.response?.data;
    }
}
export const profileUpdateData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().put(`/profile/update`, payload);
        dispatch({ type: types.PROFILE_DATA, payload: response.data.data });
        return true;
    } catch (e: any) {
        throw e?.response?.data;
    }
}
export const profileUpdateImage = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().put(`/profile/image`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: types.PROFILE_DATA, payload: response.data.data });
        return true;
    } catch (e: any) {
        throw e?.response?.data;
    }
}