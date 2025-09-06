import React from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Wallet,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import {
  fetchOnRampTransactions,
  fetchRecentTransactions,
} from "@/lib/actions/fetchTxns&Balance";
import { fetchOverviewStats } from "@/lib/actions/fetchOverviewStats";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

const Overview = async () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [onRampTxnsRes, recentTxnsRes, overviewStats] = await Promise.all([
    fetchOnRampTransactions(),
    fetchRecentTransactions(),
    fetchOverviewStats(),
  ]);

  const onRampTxns = Array.isArray(onRampTxnsRes) ? onRampTxnsRes : [];
  const recentTxns = Array.isArray(recentTxnsRes) ? recentTxnsRes : [];

  let monthlyIncome = onRampTxns
    .filter(
      (t) => t.status === "Success" && new Date(t.time) >= startOfMonth
    )
    .reduce((acc, t) => acc + t.amount / 100, 0);

  monthlyIncome += recentTxns.filter(
    (t) => t.type === "income" && new Date(t.date) >= startOfMonth
  )
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlyExpenses = recentTxns
    .filter(
      (t) => t.type === "expense" && new Date(t.date) >= startOfMonth
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const savedThisMonth = Math.max(0, monthlyIncome - monthlyExpenses);

  const activeContacts = overviewStats?.activeContacts ?? 0;

  const items = [
    {
      title: "Monthly Income",
      value: formatCurrency(monthlyIncome),
      changeType: monthlyIncome > 0 ? "positive" : "neutral",
      icon: Wallet,
      color: "from-indigo-400 to-indigo-600",
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(monthlyExpenses),
      changeType: monthlyExpenses > 0 ? "negative" : "neutral",
      icon: CreditCard,
      color: "from-rose-400 to-rose-600",
    },
    {
      title: "Saved This Month",
      value: formatCurrency(savedThisMonth),
      changeType: savedThisMonth > 0 ? "positive" : "neutral",
      icon: TrendingUp,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Active Contacts",
      value: `${activeContacts}`,
      changeType: "neutral",
      icon: Users,
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              className="p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 bg-white"
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r text-white mb-4 shadow-md",
                  item.color
                )}
              >
                <Icon size={22} />
              </div>

              {/* Title */}
              <p className="text-slate-500 text-sm font-medium">{item.title}</p>

              {/* Value */}
              <h3 className="text-2xl font-bold text-slate-800">
                {item.value}
              </h3>

              {/* Status */}
              <p
                className={cn(
                  "mt-2 flex items-center text-sm font-medium",
                  item.changeType === "positive"
                    ? "text-emerald-500"
                    : item.changeType === "negative"
                      ? "text-rose-500"
                      : "text-blue-500"
                )}
              >
                {item.changeType === "positive" && (
                  <ArrowUpRight size={16} className="mr-1" />
                )}
                {item.changeType === "negative" && (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                {item.changeType === "positive"
                  ? "Good growth"
                  : item.changeType === "negative"
                    ? "Increased spend"
                    : "Stable"}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
