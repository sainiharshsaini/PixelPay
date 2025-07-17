import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode;
}

const authLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-200 flex justify-center items-center p-8">
            {children}
        </div>
    )
}

export default authLayout