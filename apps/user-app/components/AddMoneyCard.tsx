"use client"

import { Button } from "@repo/ui/button";
import { Card } from "./ui/card";
import { Select } from "./ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTxn } from "../lib/actions/createOnRampTxn";
import toast from "react-hot-toast";

type BankOption = {
    name: string;
    redirectUrl: string;
}

const SUPPORTED_BANKS: BankOption[] = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoneyCard = () => {
    const [amount, setAmount] = useState<number>(0);
    const [selectedBank, setSelectedBank] = useState<BankOption>(SUPPORTED_BANKS[0]!);

    // const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || "");
    // const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || "");

    const handleAddMoney = async () => {
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        try {
            await createOnRampTxn({ amount: amount * 100, provider: selectedBank.name });
            window.location.href = selectedBank.redirectUrl;
        } catch (err) {
            console.error("Failed to create transaction", err);
            toast.error("Failed to initiate transaction.");
        }
    }

    const handleBankChange = (value: string) => {
        const foundBank = SUPPORTED_BANKS.find((bank) => bank.name === value);
        if (foundBank) setSelectedBank(foundBank);
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput
                    label="Amount"
                    placeholder="Enter amount in INR"
                    type="number"
                    onChange={(value) => setAmount(Number(value))}
                />
                <div className="py-4 text-left font-medium">
                    Select Bank
                </div>
                <Select onValueChange={handleBankChange} value={selectedBank.name}>
                    {SUPPORTED_BANKS.map((bank) => (
                        <option key={bank.name} value={bank.name}>
                            {bank.name}
                        </option>
                    ))}
                </Select>

                <div className="flex justify-center pt-4">
                    <Button onClick={handleAddMoney}>Add Money</Button>
                </div>
            </div>
        </Card>
    );
}