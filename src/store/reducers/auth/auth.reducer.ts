import Cookies from "js-cookie";
import { initialState } from "./auth.state";
import { types } from "./auth.type";

export const authReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.LOGIN_DATA:
            Cookies.set('token', action.payload.token);
            return { ...state, token: action.payload.token };
        case types.PROFILE_DATA:
            return { ...state, token: action.payload.token };
        default:
            return state;
    }
}