
import { Dispatch } from 'react';
import types from './transaction.type';
import apiClient from '../../../helper/apiConfig';
export const topupData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        await apiClient().post(`/topup`, payload);
        return true;
    } catch (e: any) {
        throw e.response;
    }
}

export const historyData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        const reponse = await apiClient().get(`/transaction/history?&offset=${payload.offset}&limit=${payload.limit}`);
        dispatch({ type: types.HISTORY_DATA, payload: reponse.data.data });
    } catch (e: any) {
        throw e.response;
    }
}