import { Dispatch } from 'react';
import types from './service.type';
import apiClient from '../../../helper/apiConfig';
export const menuService = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().get(`/services`);
        dispatch({ type: types.MENU_SERVICE, payload: response.data.data });
    } catch (e: any) {
        throw e.response;
    }
}