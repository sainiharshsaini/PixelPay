"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "./ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "@/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSend = async () => {
        const trimmedNumber = number.trim();
        const numericAmount = Number(amount);

        if (!trimmedNumber || isNaN(numericAmount) || numericAmount <= 0) {
            alert("Please enter a valid phone number and amount.");
            return;
        }

        try {
            setIsLoading(true);
            await p2pTransfer(trimmedNumber, numericAmount * 100); // Assuming amount is in INR and server expects paisa
            alert("Transfer successful");
            setNumber("");
            setAmount("");
        } catch (err) {
            console.error("Transfer failed", err);
            alert("Transfer failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2 space-y-4">
                        <TextInput
                            placeholder="Number"
                            label="Number"
                            value={number}
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder="Amount"
                            label="Amount"
                            value={amount}
                            onChange={(value) => setAmount(value)}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend} disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}