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

export const transactionData = (payload: any) => async (dispatch: Dispatch<any>) => {
    try {
        await apiClient().post(`/transaction`, payload);
    } catch (e: any) {
        throw e.response;
    }
}

export const balanceData = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await apiClient().get(`/balance`);
        dispatch({ type: types.BALANCE_DATA, payload: response.data.data });
    } catch (e: any) {
        throw e.response;
    }
}