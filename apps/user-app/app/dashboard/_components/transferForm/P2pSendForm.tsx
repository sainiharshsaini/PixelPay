"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { p2pTransfer } from "@/lib/actions/p2pTransfer";
import toast from "react-hot-toast";

export function SendForm({ onSuccess }: { onSuccess: () => void }) {
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

    // 🔹 Validation
    if (!/^\d{10}$/.test(trimmedNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    // Convert to paise (integer)
    const paise = Math.round(numericAmount);

    try {
      setIsLoading(true);

      const result = await p2pTransfer(trimmedNumber, paise);

      if (result?.success) {
        toast.success(`₹${numericAmount.toFixed(2)} sent successfully!`);

        resetForm();
        onSuccess();
      } else {
        toast.error(result?.message || "Transaction failed. Please try again.");
      }
    } catch (err) {
      console.error("P2P Transfer failed (client):", err);
      toast.error("Transaction failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Recipient */}
      <div className="grid gap-2">
        <label
          htmlFor="recipient"
          className="text-sm font-medium text-foreground"
        >
          Recipient Number
        </label>
        <Input
          id="recipient"
          placeholder="Enter 10-digit number"
          value={recipientNumber}
          onChange={(e) => setRecipientNumber(e.target.value)}
          type="tel"
          maxLength={10}
          className="focus-visible:ring-indigo-500"
        />
      </div>

      {/* Amount */}
      <div className="grid gap-2">
        <label htmlFor="amount" className="text-sm font-medium text-foreground">
          Amount (INR)
        </label>
        <Input
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="1"
          step="0.01"
          className="focus-visible:ring-indigo-500"
        />
      </div>

      {/* Button */}
      <Button
        onClick={handleSend}
        disabled={isLoading}
        className="w-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md transition-all"
      >
        {isLoading ? "Sending..." : "Send to User"}
      </Button>
    </div>
  );
}
