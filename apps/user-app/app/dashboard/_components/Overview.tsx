import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Wallet, TrendingUp, CreditCard } from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Monthly Income",
      value: "$4,850.00",
      change: "+12.5% vs last month",
      changeType: "positive",
      icon: Wallet,
      color: "from-indigo-400 to-indigo-600",
    },
    {
      title: "Monthly Expenses",
      value: "$3,240.80",
      change: "-5.2% vs last month",
      changeType: "negative",
      icon: CreditCard,
      color: "from-rose-400 to-rose-600",
    },
    {
      title: "Saved This Month",
      value: "$1,609.20",
      change: "+8.1% vs last month",
      changeType: "positive",
      icon: TrendingUp,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Active Contacts",
      value: "127",
      change: "+3 new vs last month",
      changeType: "neutral",
      icon: Users,
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              className="p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 bg-white"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white mb-4 shadow-md`}
              >
                <Icon size={22} />
              </div>

              {/* Title */}
              <p className="text-slate-500 text-sm font-medium">{item.title}</p>

              {/* Value */}
              <h3 className="text-2xl font-bold text-slate-800">{item.value}</h3>

              {/* Change Indicator */}
              <p
                className={`mt-2 flex items-center text-sm font-medium ${
                  item.changeType === "positive"
                    ? "text-emerald-500"
                    : item.changeType === "negative"
                    ? "text-rose-500"
                    : "text-blue-500"
                }`}
              >
                {item.changeType === "positive" ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : item.changeType === "negative" ? (
                  <ArrowDownRight size={16} className="mr-1" />
                ) : null}
                {item.change}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
