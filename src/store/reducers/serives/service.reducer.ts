import initialState from "./service.state";
import types from "./service.type";

export const serviceReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.MENU_SERVICE:
            // var new_data: any = [];
            // Jika ingin mengambil gambar dari local
            // action.payload.map((data: any) => new_data.push({ ...data, service_icon: `/assets/${data.service_icon.replace('https://minio.nutech-integrasi.com/take-home-test/services/', '')}` })) 
            return { ...state, menu_service: action.payload };
        case types.BANNER_SERVICE:
            // var new_data: any = [];
            // Jika ingin mengambil gambar dari local
            // action.payload.map((data: any) => new_data.push({ ...data, banner_image: `/assets/${data.banner_name}.png` }))
            return { ...state, banner_service: action.payload };
        default:
            return state;
    }
}