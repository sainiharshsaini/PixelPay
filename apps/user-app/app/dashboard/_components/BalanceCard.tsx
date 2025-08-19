"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wallet, Lock, Sigma } from "lucide-react";

interface BalanceCardProps {
  amount: number;
  locked: number;
}

export const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
  const formatAmount = (value: number) => `₹${Number(value ?? 0).toFixed(2)}`;
  const total = amount + locked;

  return (
    <Card className="w-full max-w-2xl rounded-3xl shadow-xl border border-border/50 
      bg-gradient-to-br from-indigo-50 via-white to-purple-50 
      dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 
      backdrop-blur-lg transition-all hover:shadow-2xl p-4 sm:p-6 md:p-8">
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-center 
          text-indigo-700 dark:text-indigo-300">
          Account Balance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <BalanceRow
          icon={<Wallet className="h-5 w-5 text-indigo-500" />}
          label="Unlocked Balance"
          value={formatAmount(amount)}
        />
        <Separator />
        <BalanceRow
          icon={<Lock className="h-5 w-5 text-yellow-500" />}
          label="Locked Balance"
          value={formatAmount(locked)}
        />
        <Separator />
        <BalanceRow
          icon={<Sigma className="h-5 w-5 text-green-500" />}
          label="Total Balance"
          value={formatAmount(total)}
          highlight
        />
      </CardContent>
    </Card>
  );
};

const BalanceRow = ({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex items-center justify-between rounded-xl p-3 md:p-4 transition-all 
      ${highlight
        ? "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 border border-indigo-300/30 dark:border-indigo-700/40"
        : "hover:bg-muted/40"
      }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span
        className={`text-sm md:text-base ${
          highlight
            ? "font-semibold text-indigo-900 dark:text-indigo-100"
            : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
    <span
      className={`text-sm md:text-lg ${
        highlight
          ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-400"
          : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);
