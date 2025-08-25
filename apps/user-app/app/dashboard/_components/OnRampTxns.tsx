"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Receipt } from "lucide-react";

type TransactionStatus = "Success" | "Processing" | "Failure";

export interface Transaction {
  time: string | Date;
  amount: number; // stored in paise
  status: TransactionStatus;
  provider: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const statusColors: Record<TransactionStatus, string> = {
  Success: "bg-green-100 text-green-700 border border-green-200",
  Processing: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Failure: "bg-red-100 text-red-700 border border-red-200",
};

// ✅ Format INR
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount / 100);

// ✅ Format date & time
const formatDateTime = (time: string | Date) => {
  const date = time instanceof Date ? time : new Date(time);
  return (
    date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " • " +
    date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

const OnRampTxns = ({
  transactions,
  isLoading = false,
}: OnRampTransactionsProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleTxns = showAll ? transactions : transactions.slice(0, 3);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            OnRamp Transaction History
          </h2>
          <p className="text-slate-500 text-sm">
            Track your recent onramp transactions here
          </p>
        </div>
        {transactions?.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        )}
      </div>

      {/* Card */}
      <Card className="w-full max-w-2xl mx-auto shadow-sm rounded-2xl">
        <CardContent>
          {isLoading ? (
            // Skeleton Loader
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
            <div className="divide-y divide-muted">
              {visibleTxns.map((t, idx) => (
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
                      {formatDateTime(t.time)}
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
            // Empty State
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
    </div>
  );
};

export default OnRampTxns;
