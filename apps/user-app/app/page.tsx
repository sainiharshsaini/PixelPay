"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </div>
  );
}
