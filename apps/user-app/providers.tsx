"use client";

import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode}) => {
    return (
        <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
    )
}

export default Providers