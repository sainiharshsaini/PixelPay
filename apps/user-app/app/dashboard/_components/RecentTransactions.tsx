"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string | number;
  title: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date?: string | Date;
  time?: string | Date;
  status?: "Success" | "Pending" | "Failed";
}

interface RecentTransactionsProps {
  recentTxns: Transaction[];
  isLoading?: boolean;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

const formatDate = (date?: string | Date) => {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (time?: string | Date) => {
  if (!time) return null;
  const t = time instanceof Date ? time : new Date(time);
  return t.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const RecentTransactions = ({
  recentTxns,
  isLoading = false,
}: RecentTransactionsProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleTxns = showAll ? recentTxns : recentTxns.slice(0, 3);

  return (
    <div className="w-full">

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Transactions
          </h2>
          <p className="text-slate-500 text-sm">
            Your latest financial activities
          </p>
        </div>
        {recentTxns?.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        )}
      </div>

      <Card className="p-6 shadow-sm rounded-2xl border border-slate-200 bg-white">
        {isLoading ? (

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-slate-200" />
                  <div>
                    <div className="h-3 w-24 bg-slate-200 rounded mb-2"></div>
                    <div className="h-2 w-32 bg-slate-100 rounded"></div>
                  </div>
                </div>
                <div className="h-3 w-16 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : recentTxns?.length ? (
          <div className="space-y-4">
            {visibleTxns.map((txn) => (
              <div
                key={txn.id}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition duration-200"
              >

                <div className="flex items-center gap-3">
                  {txn.type === "income" ? (
                    <ArrowDownCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <ArrowUpCircle className="h-6 w-6 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-slate-800">{txn.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {txn.description}
                    </p>

                    {(txn.date || txn.time) && (
                      <p className="text-[11px] text-slate-400">
                        {formatDate(txn.date)}{" "}
                        {txn.time ? `at ${formatTime(txn.time)}` : ""}
                      </p>
                    )}

                    {txn.status && (
                      <p
                        className={cn(
                          "text-[11px] font-medium",
                          txn.status === "Success" && "text-green-600",
                          txn.status === "Pending" && "text-yellow-500",
                          txn.status === "Failed" && "text-red-600"
                        )}
                      >
                        {txn.status}
                      </p>
                    )}
                  </div>
                </div>

                <p
                  className={cn(
                    "font-semibold text-sm",
                    txn.type === "income" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {formatCurrency(txn.amount)}
                </p>
              </div>
            ))}
          </div>
        ) : (
      
          <div className="text-center py-10">
            <div className="flex justify-center mb-3">
              <ArrowUpCircle className="h-10 w-10 text-slate-300" />
            </div>
            <p className="text-slate-600 font-medium">No recent transactions</p>
            <p className="text-slate-400 text-sm mb-4">
              Start adding money or making payments to see them here.
            </p>
            <button className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
              Add Transaction
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RecentTransactions;
