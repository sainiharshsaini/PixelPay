"use client"

import React from 'react'
import { useBalance } from "@repo/recoil-store/balance"

const Balance = () => {
    const balance = useBalance();

    return (
        <div>
            Balance: {balance}
        </div>
    )
}

export default Balance