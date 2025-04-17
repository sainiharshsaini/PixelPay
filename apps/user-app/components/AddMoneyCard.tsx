"use client"

import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);

    return <div className="border p-6 rounded-xl bg-[#ededed]">
        <h1 className="text-xl border-b pb-2">
            Add Money
        </h1>
        <p>
            <div className="w-full">
                <div className="pt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                    <input onChange={(e) => setValue(Number(e.target.value))} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Amount" />
                </div>
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-4">
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick={async () => {
                            await createOnRampTransaction(provider, value)
                            window.location.href = redirectUrl || "";
                        }}>
                        Add Money
                    </button>
                </div>
            </div>
        </p>
    </div>
}