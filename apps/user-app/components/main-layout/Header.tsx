"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    const router = useRouter()
    const {
        data: session,
        status
    } = useSession() as {
        data: CustomSession | null,
        status: "loading" | "authenticated" | "unauthenticated"
    };

    const isAuthenticated = !!session?.user;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-3 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold shadow group-hover:scale-105 group-hover:shadow-lg transition-all duration-200">
                        <span className="text-white font-bold text-sm">PP</span>
                    </div>
                    <Link href="/" className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                        PixelPay
                    </Link>
                </div>

                {/* Navigation Links (visible only when logged in) */}
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

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {status === "loading" ? (
                        <span className="text-gray-500 text-sm animate-pulse">
                            Checking...
                        </span>
                    ) : isAuthenticated ? (
                        <>
                            <span className="hidden sm:block text-sm text-gray-700">
                                Hi, {session.user?.name || "User"}
                            </span>
                            <Button
                                variant="ghost"
                                onClick={() => signOut()}
                                className="text-sm hover:bg-purple-50 hover:text-purple-700 transition-colors"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header