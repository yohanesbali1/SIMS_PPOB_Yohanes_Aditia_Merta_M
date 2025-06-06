import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-9xl font-extrabold text-red-600">404</h1>
            <p className="md:text-2xl text-3xl font-semibold mt-4">Oops! Page not found.</p>
            <p className="text-gray-500 mt-2 mb-8">
                Kemungkinan halaman yang Anda cari tidak tersedia.
            </p>
            <Link
                to="/dashboard"
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default ErrorPage;
