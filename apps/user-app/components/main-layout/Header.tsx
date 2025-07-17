"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Session } from "next-auth";

interface CustomSessionUser {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
}

interface CustomSession extends Session {
    user?: CustomSessionUser; // Override the user property with our custom type
}

const Header = () => {
    const { data: session, status } = useSession() as { data: CustomSession | null, status: "loading" | "authenticated" | "unauthenticated" };

    return (
        <div className="sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between px-4 sm:px-8 h-[60px] border-b border-slate-300 shadow-sm">
                
                <div className="text-2xl font-semibold font-serif text-blue-800">
                    PixelPay
                </div>

                <div className="text-white py-2 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-200 hidden md:block cursor-pointer">
                    <button
                        onClick={() => session?.user ? signOut() : signIn()}
                        disabled={status === "loading"}
                        className="focus:outline-none cursor-pointer"
                    >
                        {status === "loading" ? "Loading..." : (session?.user ? "Logout" : "Login")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header