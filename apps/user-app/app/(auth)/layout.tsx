import { ReactNode } from "react"

const authLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            {children}
        </div>
    )
}

export default authLayout