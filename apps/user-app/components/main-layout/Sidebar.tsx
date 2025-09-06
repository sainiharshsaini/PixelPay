import { SidebarItem } from "./SidebarItem"
import { Home, Send, History, Users } from "lucide-react";

const sidebarLinks = [
    { href: "/dashboard", title: "Home", icon: <Home className="w-6 h-6" /> },
    { href: "/payment-transfer", title: "Payment Transfer", icon: <Send className="w-6 h-6" /> },
    { href: "/transaction-history", title: "Transaction History", icon: <History className="w-6 h-6" /> },
    { href: "/p2p-transfer", title: "P2P Transfer", icon: <Users className="w-6 h-6" /> },
];

const Sidebar = () => {
    return (
        <>
            <nav className="
                hidden md:flex flex-col fixed left-0 top-0 h-full w-66
                bg-gradient-to-br from-white via-slate-50 to-purple-50
                border-r border-gray-200 shadow-lg z-40
                rounded-tr-3xl rounded-br-3xl
                py-10 px-3
            ">
                <div className="flex flex-col gap-2 mt-10">
                    {sidebarLinks.map(link => (
                        <SidebarItem
                            key={link.href}
                            href={link.href}
                            title={link.title}
                            icon={link.icon}
                        />
                    ))}
                </div>
            </nav>

            <nav className="
                md:hidden fixed bottom-0 left-0 w-full
                bg-gradient-to-t from-white via-slate-50 to-purple-50
                border-t border-gray-200 shadow-2xl z-40
                flex flex-row justify-around items-center h-16
                rounded-t-2xl
                px-2
            ">
                {sidebarLinks.map(link => (
                    <SidebarItem
                        key={link.href}
                        href={link.href}
                        title={link.title}
                        icon={link.icon}
                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar