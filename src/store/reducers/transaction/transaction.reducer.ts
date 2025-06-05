import initialState from "./transaction.state";
import types from "./transaction.type";

export const transactionReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HISTORY_DATA:
            return { ...state, history_data: action.payload.records };
        case types.BALANCE_DATA:
            return { ...state, balance_data: action.payload };
        default:
            return state;
    }
}