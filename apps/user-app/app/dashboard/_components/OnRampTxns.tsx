"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Receipt } from "lucide-react";

type TransactionStatus = "Success" | "Processing" | "Failure" | string;

export interface Transaction {
  time: Date;
  amount: number; // stored in paise
  status: TransactionStatus;
  provider: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

// Semantic status colors
const statusColors: Record<TransactionStatus, string> = {
  Success: "bg-green-100 text-green-700 border border-green-200",
  Processing: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Failure: "bg-red-100 text-red-700 border border-red-200",
};

// Utility for INR formatting
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount / 100);

const OnRampTxns = ({
  transactions,
  isLoading = false,
}: OnRampTransactionsProps) => {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          OnRamp Transaction History
        </CardTitle>
        <CardDescription>
          Track your recent onramp transactions here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Skeleton loader for production UX
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 px-3"
              >
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-40 bg-slate-200 rounded"></div>
                  <div className="h-2 w-24 bg-slate-100 rounded"></div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="h-3 w-16 bg-slate-200 rounded"></div>
                  <div className="h-4 w-12 bg-slate-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : transactions.length ? (
          <div className="divide-y divide-muted max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {transactions.map((t, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 hover:bg-muted/40 rounded-xl px-3 transition duration-200"
              >
                {/* Left Side */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Received INR via {t.provider}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.time.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    •{" "}
                    {t.time.toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-end">
                  <span className="text-base font-semibold text-green-600">
                    + {formatCurrency(t.amount)}
                  </span>
                  <Badge
                    className={cn(
                      "mt-1 text-xs font-medium rounded-md px-2",
                      statusColors[t.status] || "bg-gray-100 text-gray-600"
                    )}
                  >
                    {t.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State with friendly UI
          <div className="text-center py-10">
            <div className="flex justify-center mb-3">
              <Receipt className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-slate-600 font-medium">No transactions yet</p>
            <p className="text-slate-400 text-sm mb-4">
              Start adding money to see your history here.
            </p>
            <button className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
              Add Money
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnRampTxns;
