import Sidebar from "../../components/main-layout/Sidebar";
import { JSX, ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar: left on desktop, bottom on mobile/tablet */}
            <Sidebar />
            {/* Main content */}
            <main
                className="
                    flex-1
                    pt-4 pb-20 md:pt-8 md:pb-0
                    md:ml-56
                    transition-all duration-200
                    w-full
                "
            >
                {children}
            </main>
        </div>
    );
}