"use client";

import { useSession } from "next-auth/react"

const WelcomeCard = () => {
    const session = useSession();

    return ( 
        <div className="p-8 flex flex-col items-center">
            <div className="flex gap-2 text-3xl font-semibold mb-2 font-serif">
                <h1>
                    Welcome,
                </h1>
                <h1 className="text-blue-600">
                    {session.data?.user?.name}
                </h1>
            </div>
            <p className=" text-slate-600">
                Start sending and receiving money securely in seconds.
            </p>
        </div>
    )
}

export default WelcomeCard