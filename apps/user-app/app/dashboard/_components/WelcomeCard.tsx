"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

const WelcomeCard = () => {
  const { data: session } = useSession();

  const userInitials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div
      className="
        relative w-full rounded-2xl p-6 sm:p-8 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        text-white shadow-lg overflow-hidden
      "
    >

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#ffffff40,_transparent_50%)]"></div>

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">

        <Avatar className="h-16 w-16 border-2 border-white shadow-md">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-white text-purple-600 font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold">
            <h1>Welcome,</h1>
            <h1 className="text-yellow-300">{session?.user?.name || "User"}</h1>
            <Sparkles className="w-6 h-6 text-yellow-200 animate-pulse" />
          </div>
          <p className="mt-2 text-sm sm:text-base text-white/90 max-w-md">
            Start sending and receiving money securely in seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
