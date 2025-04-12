import React from 'react'
import Appbar from "@repo/ui/Appbar"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const AppbarClient = () => {
    const session = useSession();
    const router = useRouter()

  return (
    <div>
        <Appbar onSignin={signIn} onSignout={async () => {
            await signOut()
            router.push('/api/auth/signin')
        }} />
    </div>
  )
}

export default AppbarClient