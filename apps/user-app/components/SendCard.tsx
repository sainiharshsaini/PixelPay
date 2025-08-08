"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Center } from "@repo/ui/Center";
import { Input } from "./ui/input";
import { p2pTransfer } from "@/lib/actions/p2pTransfer";
import toast from "react-hot-toast";

export function SendCard() {
    const [recipientNumber, setRecipientNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setRecipientNumber("");
        setAmount("");
    };

    const handleSend = async () => {
        const trimmedNumber = recipientNumber.trim();
        const numericAmount = Number(amount);

        // Validation
        if (!/^\d{10}$/.test(trimmedNumber)) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }
        if (isNaN(numericAmount) || numericAmount <= 0) {
            toast.error("Please enter a valid amount greater than 0.");
            return;
        }

        try {
            setIsLoading(true);

            await p2pTransfer(trimmedNumber, Math.round(numericAmount * 100)); // store in paisa

            toast.success(`₹${numericAmount} sent successfully!`);
            resetForm();
        } catch (error) {
            console.error("P2P Transfer failed:", error);
            toast.error("Transaction failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[90vh] flex items-center justify-center">
            <Center>
                <Card title="Send Money" className="shadow-lg border rounded-xl p-6">
                    <div className="min-w-72 space-y-4">
                        <Input
                            placeholder="Enter recipient number"
                            value={recipientNumber}
                            onChange={() => setRecipientNumber}
                            type="tel"
                            maxLength={10}
                        />
                        <Input
                            placeholder="Enter amount (INR)"
                            value={amount}
                            onChange={() => setAmount}
                            type="number"
                            min="1"
                            step="0.01"
                        />
                        <div className="pt-4 flex justify-center">
                            <Button
                                onClick={handleSend}
                                disabled={isLoading}
                                className="w-full font-semibold"
                            >
                                {isLoading ? "Sending..." : "Send"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}