"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

const Navbar = () => {
    const session = useSession();
    const router = useRouter();

    return (
        <div>
            <div className="flex items-center justify-between px-8 h-[60px] border-b border-slate-300">
                <div className="text-2xl font-semibold font-serif  text-blue-800">
                    Paytm
                </div>
                <div className="text-white py-2 px-6 rounded bg-blue-500 hover:bg-blue-600 hidden md:block cursor-pointer">
                    <button onClick={session.data?.user ? signOut : signIn}>{session.data?.user ? "Logout" : "Login"}</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar