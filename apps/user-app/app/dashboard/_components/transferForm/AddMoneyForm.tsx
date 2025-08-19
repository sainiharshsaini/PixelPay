"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOnRampTxn } from "@/lib/actions/createOnRampTxn";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BankOption = {
  name: string;
  redirectUrl: string;
};

const SUPPORTED_BANKS: BankOption[] = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoneyForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [redirectUrl, setRedirectUrl] = useState<string>(
    SUPPORTED_BANKS[0]?.redirectUrl || ""
  );
  const [provider, setProvider] = useState<string>(
    SUPPORTED_BANKS[0]?.name || ""
  );

  const handleAddMoney = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!provider) {
      toast.error("Select a valid bank");
      return;
    }

    try {
      await createOnRampTxn({ amount, provider });
      toast.success("Transaction initiated successfully 🚀");
      window.location.href = redirectUrl;
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Amount input */}
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          placeholder="Enter amount in INR"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="focus-visible:ring-indigo-500"
          required
        />
      </div>

      {/* Bank selection */}
      <div className="grid gap-2">
        <Label htmlFor="selectBank">Select Bank</Label>
        <Select
          defaultValue={SUPPORTED_BANKS[0]?.name}
          onValueChange={(val) => {
            const selected = SUPPORTED_BANKS.find((x) => x.name === val);
            setRedirectUrl(selected?.redirectUrl || "");
            setProvider(selected?.name || "");
          }}
        >
          <SelectTrigger
            id="selectBank"
            className="w-full focus-visible:ring-indigo-500"
          >
            <SelectValue placeholder="Choose a bank" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_BANKS.map((x) => (
              <SelectItem key={x.name} value={x.name}>
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Button */}
      <Button
        type="button"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md transition-all"
        onClick={handleAddMoney}
      >
        Add Money
      </Button>
    </div>
  );
};
