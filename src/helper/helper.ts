import Swal from "sweetalert2";

export const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
};

export const swal_alert = (payload?: any) => {
    const { status, message } = payload || {};
    switch (status) {
        case "success":
            break;
        default:
            Swal.fire({
                text: message,
                icon: 'error',
                color: "#f42619",
                background: "#fff5f3",
                showCloseButton: true,
                toast: true,
                showCancelButton: false,
                showConfirmButton: false,
                position: 'bottom-start', // bottom-left
                timer: 5000, // auto close after 5 seconds (optional)
                // timerProgressBar: true
            });
    }
}