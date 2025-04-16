"use client"

import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <div className="flex justify-center flex-col h-full">
            <div className="flex justify-center">
                <div className="border p-6 bg-white rounded-xl bg-[#ededed]">
                    <h1 className="text-xl border-b pb-2">
                        Send
                    </h1>
                    <p>
                        <div className="min-w-72 pt-2">
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Number</label>
                                <input onChange={(e) => setNumber(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Number" />
                            </div>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                <input onChange={(e) => setAmount(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Amount" />
                            </div>
                            <div className="pt-4 flex justify-center">
                                <button onClick={async () => await p2pTransfer(number, Number(amount) * 100)}
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                >Send</button>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
}