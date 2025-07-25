"use client"

import { Button } from "@repo/ui/button";
import { Card } from "./ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "./ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTxn } from "../lib/actions/createOnRampTxn";

type BankOption = {
    name: String;
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
    const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || "");
    const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState<number>(0);

    const handleAddMoney = async () => {
        if (!provider || !amount || amount <= 0) {
            alert("Please enter a valid amount and select a bank.")
            return;
        }

        try {
            await createOnRampTxn({ provider, amount });
            window.location.href = redirectUrl;
        } catch (err) {
            console.error("Failed to create transaction", err);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput
                    label="Amount"
                    placeholder="Enter amount"
                    onChange={(val) => setAmount(Number(val))}
                    type="number"
                    min={0}
                />

                <div className="py-4 text-left font-medium">
                    Select Bank
                </div>
                <Select
                    onSelect={handleBankSelect}
                    options={SUPPORTED_BANKS.map((bank) => ({
                        key: bank.name,
                        value: bank.name,
                    }))}
                />

                <div className="flex justify-center pt-4">
                    <Button onClick={handleAddMoney}>Add Money</Button>
                </div>
            </div>
        </Card>
    );
}