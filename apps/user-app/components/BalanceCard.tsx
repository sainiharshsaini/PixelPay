import { Card } from "./ui/card";

interface BalanceCardProps {
    amount: number;
    locked: number;
}

export const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
    const formatAmount = (value: number) => `₹${(value / 100).toFixed(2)}`;
    const total = amount + locked;

    return (
        <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2 text-sm">
        <span>Unlocked Balance</span>
        <span>{formatAmount(amount)}</span>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2 text-sm">
        <span>Total Locked Balance</span>
        <span>{formatAmount(locked)}</span>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2 text-sm font-medium">
        <span>Total Balance</span>
        <span>{formatAmount(total)}</span>
      </div>
    </Card>
    )
}