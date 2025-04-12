import React from 'react'
import { Button } from "./button";
import { text } from 'stream/consumers';

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
        <div style={{display: "flex", justifyContent: "space-between", padding:"10px" ,backgroundColor: "gray"}}>
            <div>PayTM</div>
            <div>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}

export default Appbar