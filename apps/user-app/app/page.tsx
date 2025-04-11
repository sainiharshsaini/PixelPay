"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Appbar from "@repo/ui/Appbar";

export default function Page() {
  const session = useSession();
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </div>
  );
}