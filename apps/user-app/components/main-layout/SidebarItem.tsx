"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title }: { href: string; title: string;}) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "rounded bg-blue-500 text-white" : "text-slate-500"} cursor-pointer  p-3 my-1`} onClick={() => router.push(href)}>
        {/* <div className="pr-2">
            {icon}
        </div> */}
        <div className="font-semibold">
            {title}
        </div>
    </div>
}