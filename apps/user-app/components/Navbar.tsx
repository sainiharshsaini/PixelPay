"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Appbar from "../../../packages/ui/src/Appbar"
import { useRouter } from "next/navigation";

const Navbar = () => {
    const session = useSession();
    const router = useRouter();

    return (
        <div>
            <Appbar user={session.data?.user} onSignin={signIn} onSignout={async () => {
                await signOut()
                router.push('/api/auth/signin')
            }} />
        </div>
    )
}

export default Navbar