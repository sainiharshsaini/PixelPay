"use client";

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TransactionStatus = "success" | "pending" | "failed" | string;

export interface Transaction {
  time: Date;
  amount: number;
  status: TransactionStatus;
  provider: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
}

const OnRampTxns = ({ transactions }: OnRampTransactionsProps) => {
  if (!transactions.length) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            your recent transactions is here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-sm text-muted-foreground">
            No recent transactions
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          your recent transactions is here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pt-2 space-y-4">
          {transactions.map((t, idx) => (
            <div key={idx} className="flex justify-between">
              <div>
                <div className="text-sm font-medium">Received INR</div>
                <div className="text-slate-600 text-xs">
                  {t.time.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-center font-semibold text-green-600">
                + ₹{Number(t.amount / 100).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OnRampTxns