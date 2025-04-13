import { ReactNode } from "react"

const authLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="bg-slate-200 p-10 rounded-md">
            {children}
        </div>
    )
}

export default authLayout