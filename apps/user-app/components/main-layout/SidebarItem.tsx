"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
    href: string;
    title: string;
    icon?: React.ReactNode;
}

export const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <button
            className={`
                flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start
                w-full md:w-auto px-2 py-2 md:px-5 md:py-3 rounded-xl
                transition-all duration-200
                ${selected
                    ? "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-700 font-semibold shadow"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300
            `}
            tabIndex={0}
            onClick={() => router.push(href)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") router.push(href); }}
            aria-current={selected ? "page" : undefined}
            aria-label={title}
            type="button"
        >
            <span className="flex items-center justify-center mb-1 md:mb-0">{icon}</span>
            <span className="text-xs md:text-base mt-1 md:mt-0 md:ml-3">{title}</span>
        </button>
    );
}