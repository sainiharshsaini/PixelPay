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

// type BankOption = {
//   name: string;
//   redirectUrl: string;
// };

const SUPPORTED_BANKS = [{ name: "HDFC Bank" }, { name: "Axis Bank" }];

// const SUPPORTED_BANKS: BankOption[] = [
//   { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
//   { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
// ];

export const AddMoneyForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // const [redirectUrl, setRedirectUrl] = useState<string>(
  //   SUPPORTED_BANKS[0]?.redirectUrl || ""
  // );

  const handleAddMoney = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!SUPPORTED_BANKS.some(bank => bank.name === provider)) {
      toast.error("Select a valid bank");
      return;
    }

    try {
      setLoading(true);
      
      const res = await createOnRampTxn({ amount, provider });

      if (res.message.includes("Sucessfully") || res.token) {
        toast.success("Transaction initiated successfully");
        onSuccess();
      } else {
        toast.error(res.message || "Transaction Failed");
      }

      // setTimeout(() => {
      //   window.location.href = redirectUrl;
      // }, 500);

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">

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

      <div className="grid gap-2">
        <Label htmlFor="selectBank">Select Bank</Label>
        <Select
          // defaultValue={SUPPORTED_BANKS[0]?.name}
          onValueChange={(val) => {
            const selected = SUPPORTED_BANKS.find((x) => x.name === val);
            // setRedirectUrl(selected?.redirectUrl || "");
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

      <Button
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
        onClick={handleAddMoney}
      >
        {loading ? "Processing..." : "Add Money"}
      </Button>
    </div>
  );
};
