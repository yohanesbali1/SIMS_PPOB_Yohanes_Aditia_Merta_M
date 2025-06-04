import initialState from "./service.state";
import types from "./service.type";

export const serviceReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.MENU_SERVICE:
            return { ...state, menu_service: action.payload };
        default:
            return state;
    }
}