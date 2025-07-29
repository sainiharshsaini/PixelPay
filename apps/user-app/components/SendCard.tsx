"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "./ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { p2pTransfer } from "@/lib/actions/p2pTransfer";
import toast from "react-hot-toast";

export function SendCard() {
    const [number, setNumber] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSend = async () => {
        const trimmedNumber = number.trim();
        const numericAmount = Number(amount);

        if (!trimmedNumber || isNaN(numericAmount) || numericAmount <= 0) {
           toast.error("Please enter a valid number and amount.");
            return;
        }

        try {
            setIsLoading(true);
            await p2pTransfer(trimmedNumber, numericAmount * 100); // Assuming amount is in INR and server expects paisa
            toast.success("Money sent successfully!");
            setNumber("");
            setAmount("");
        } catch (err) {
            console.error("Transfer failed", err);
           toast.error("Transaction failed. Please try again.");
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
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder="Amount"
                            label="Amount"
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