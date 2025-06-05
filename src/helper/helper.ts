export const formatRupiah = (angka: number, withSymbol = true) => {
    return new Intl.NumberFormat("id-ID", {
        style: withSymbol ? "currency" : "decimal",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
};

export const format_number = (number: number): string => {
    if (!number) return '0';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const parseRupiahToNumber = (value: string): number => {
    const numberString = value.replace(/[^0-9]/g, '');
    return Number(numberString) || 0;
}
