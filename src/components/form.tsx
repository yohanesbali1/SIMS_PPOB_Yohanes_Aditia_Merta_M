export function FormInput({
    register,
    errors,
    icon_password = "",
    icon = "",
    className = "",
    children,
    ...props
}: any) {
    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className={`${icon} text-gray-400 text-sm`}></i>
            </span>
            <input
                {...register}
                {...props}
                className={`${className} pl-10 border text-gray-900 text-sm rounded-sm block w-full p-2.5 ring-0 outline-none mb-2 ${errors
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    }`}
            />
            {children}
        </div>
    );
}

export function FormLabel({ children }: any) {
    return (
        <label className="block mb-2 text-sm font-medium text-gray-900">{children}</label>
    )
}