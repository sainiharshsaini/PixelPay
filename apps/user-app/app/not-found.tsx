"use client"

import { FiHome, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation"

const NotFound = () => {
    const router = useRouter();

    const handleGoBack = (): void => {
        router.back();
    };

    const handleGoHome = (): void => {
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-inter">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 text-center max-w-lg w-full">
                <div className="mb-8 flex justify-center">
                    <svg className="w-48 h-48 text-orange-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        <path d="M9 16h6"></path>
                        <path d="M12 2v2"></path>
                        <path d="M4.22 4.22l1.42 1.42"></path>
                        <path d="M18.36 5.64l1.42-1.42"></path>
                    </svg>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-800 mb-4 tracking-tight">
                    404
                </h1>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
                    Page Not Found
                </h2>

                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                    Oops! It looks like you've stumbled upon a page that doesn't exist.
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={handleGoHome}
                        className="px-4 py-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out focus-visible:ring-4 focus-visible:ring-orange-400 focus-visible:ring-opacity-70 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <FiHome className="h-5 w-5 mr-2" />
                        Go to Homepage
                    </button>

                    <button
                        onClick={handleGoBack}
                        variant="outline"
                        className="px-4 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-background flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <FiArrowLeft className="h-5 w-5 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound