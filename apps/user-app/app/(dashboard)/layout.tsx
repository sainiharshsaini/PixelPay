import Sidebar from "../../components/main-layout/Sidebar";
import { JSX, ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar: always visible, never hidden */}
            <Sidebar />
            {/* Main content: margin-left on desktop to avoid overlap */}
            <main
                className="
                    flex-1
                    pt-4 pb-20 md:pt-8 md:pb-0
                    w-full
                    md:ml-66
                    transition-all duration-200
                "
            >
                {children}
            </main>
        </div>
    );
}