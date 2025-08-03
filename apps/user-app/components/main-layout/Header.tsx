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
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold shadow">
                        <span className="text-white font-bold text-sm">PP</span>
                    </div>
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        PixelPay
                    </Link>
                </div>

                {/* Navigation Links (visible only when logged in) */}
                {isAuthenticated && (
                    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                        <Link href="/" className="hover:text-black transition">
                            Home
                        </Link>
                        <Link href="/dashboard" className="hover:text-black transition">
                            Dashboard
                        </Link>
                    </nav>
                )}

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {status === "loading" ? (
                        <span className="text-gray-500 text-sm">
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
                                className="text-sm"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                onClick={() => signIn()}
                                className="text-sm"
                            >
                                Login
                            </Button>
                            <Button variant="default" onClick={() => router.push("/sign-up")}>
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