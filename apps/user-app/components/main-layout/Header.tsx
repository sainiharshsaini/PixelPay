"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CustomSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  image?: string | null;
}

interface CustomSession extends Session {
  user?: CustomSessionUser;
}

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  const isAuthenticated = !!session?.user;
  const userInitials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold shadow group-hover:scale-105 group-hover:shadow-lg transition-all duration-200">
            <span className="text-white font-bold text-sm">PP</span>
          </div>
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200"
          >
            PixelPay
          </Link>
        </div>

        {/* Desktop Navigation (only when logged in) */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-purple-600 focus:text-purple-700 transition-colors font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-purple-600 focus:text-purple-700 transition-colors font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Dashboard
            </Link>
          </nav>
        )}

        {/* Right side */}
        <div>
          {status === "loading" ? (
            <span className="text-gray-500 text-sm animate-pulse">
              Checking...
            </span>
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-purple-500 shadow hover:shadow-md transition">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl shadow-lg"
              >
                <DropdownMenuLabel>
                  <p className="font-medium">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Home + Dashboard → only visible on mobile */}
                <div className="md:hidden">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="w-full">
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 focus:text-red-700 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => signIn()}
                className="text-sm hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => router.push("/sign-up")}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-500 transition-all"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
