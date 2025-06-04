import initialState from "./transaction.state";
import types from "./transaction.type";

export const transactionReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HISTORY_DATA:
            return { ...state, history_data: action.payload.records };
        default:
            return state;
    }
}