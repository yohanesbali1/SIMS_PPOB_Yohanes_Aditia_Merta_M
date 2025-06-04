
import { Dispatch } from 'react';
import { types } from './auth.type';
import apiClient from '../../../helper/apiConfig';
export const loginData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().post(`/login`, payload);
        dispatch({ type: types.LOGIN_DATA, payload: response.data.data });
    } catch (e: any) {
        throw e.response;
    }
}
export const registerData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        await apiClient().post(`/registration`, payload);
        return true;
    } catch (e: any) {
        throw e.response;
    }
}
export const profileData = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().get(`/profile`);
        dispatch({ type: types.PROFILE_DATA, payload: response.data.data });
    } catch (e: any) {
        throw e.response;
    }
}