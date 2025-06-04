export function FormInput({ register, errors, className = "", ...comp }: any) {
    return (
        <input
            {...register}
            {...comp}
            className={`${comp.className} border text-gray-900 text-sm rounded-sm block w-full p-2.5 ring-0 outline-none mb-2
     ${errors ? " border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"}`} />
    );
}