import Sidebar from "../../components/Sidebar";
import { JSX, ReactNode } from "react";

export default function DashboardLayout({ children}: {children: ReactNode}): JSX.Element {
    return (
        <div className="flex min-h-screen">
            <div className="min-w-70 border-r border-slate-300 p-4 pt-20">
                <Sidebar/>
            </div>
            {children}
        </div>
    );
}