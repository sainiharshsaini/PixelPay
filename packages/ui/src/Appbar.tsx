import React from 'react'
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

const Appbar = ({user, onSignin, onSignout}: AppbarProps) => {
    return (
        <div>
            <div>PayTM</div>
            <div>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}

export default Appbar