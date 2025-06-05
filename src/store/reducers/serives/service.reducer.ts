import initialState from "./service.state";
import types from "./service.type";

export const serviceReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.MENU_SERVICE:
            var new_data: any = [];
            action.payload.map((data: any) => new_data.push({ ...data, service_icon: `/assets/${data.service_icon.replace('https://minio.nutech-integrasi.com/take-home-test/services/', '')}` }))
            return { ...state, menu_service: new_data };
        case types.BANNER_SERVICE:
            var new_data: any = [];
            action.payload.map((data: any) => new_data.push({ ...data, banner_image: `/assets/${data.banner_name}.png` }))
            return { ...state, banner_service: new_data };
        default:
            return state;
    }
}