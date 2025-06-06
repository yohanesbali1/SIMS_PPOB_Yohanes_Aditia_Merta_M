import Cookies from "js-cookie";
import { initialState } from "./auth.state";
import { types } from "./auth.type";

export const authReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.LOGIN_DATA:
            return { ...state, token: action.payload.token };
        case types.PROFILE_DATA:
            return { ...state, data_user: action.payload };
        default:
            return state;
    }
}