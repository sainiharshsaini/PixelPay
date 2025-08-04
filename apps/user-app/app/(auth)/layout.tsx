import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode;
}

const authLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
            {/* Decorative blurred gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-[120px] opacity-20 rounded-full" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-pink-400 to-indigo-400 blur-[100px] opacity-20 rounded-full" />
            </div>
            <div className="relative z-10 w-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default authLayout