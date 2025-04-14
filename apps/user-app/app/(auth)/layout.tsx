import { ReactNode } from "react"

const authLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="p-10 rounded-md flex justify-center items-center">
            {children}
        </div>
    )
}

export default authLayout