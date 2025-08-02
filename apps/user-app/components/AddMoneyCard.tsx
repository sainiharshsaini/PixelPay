"use client"

import { Button } from "./ui/button";
import { useState } from "react";
import { createOnRampTxn } from "@/lib/actions/createOnRampTxn";
import toast from "react-hot-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
    const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || "");
    const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || "");

    console.log("client: ", amount, provider);

    const handleAddMoney = async () => {
        if (!amount || amount <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        if (provider !== "HDFC Bank" || "Axis Bank") {
            toast.error("Select a valid provider");
            return;
        }

        try {
            await createOnRampTxn(amount * 100, provider);
            toast.success("Transaction created successfully");
            window.location.href = redirectUrl;
        } catch (err: any) {
            toast.error("Something went wrong");
            console.error(err);
        }
    }


    return (
        <Card title="Add Money" className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Payment Transfer</CardTitle>
                <CardDescription>
                    Enter your details below
                </CardDescription>
            </CardHeader>

            <CardContent>

                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            type="number"
                            id="amount"
                            placeholder="Enter amount in INR"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="selectBank">Select Bank</Label>
                        <Select onValueChange={(val) => {
                            const selected = SUPPORTED_BANKS.find(x => x.name === val)
                            setRedirectUrl(selected?.redirectUrl || "")
                            setProvider(selected?.name || "")
                        }}>
                            <SelectTrigger className="w-1/2">
                                <SelectValue id="selectBank" placeholder="Select Bank" />
                            </SelectTrigger>
                            <SelectContent>
                                {SUPPORTED_BANKS.map(x => (
                                    <SelectItem key={x.name} value={x.name}>
                                        {x.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    className="w-full"
                    onClick={handleAddMoney}
                >
                    Add Money
                </Button>
            </CardFooter>
        </Card>
    );
}