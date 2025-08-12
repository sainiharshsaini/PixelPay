import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Separator } from "@/components/ui/separator"

interface BalanceCardProps {
  amount: number;
  locked: number;
}

export const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
  const formatAmount = (value: number) => `₹${(value).toFixed(2)}`;
  const total = amount + locked;

  return (
    <Card className="w-full max-w-md shadow-md border border-border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Account Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BalanceRow label="Unlocked Balance" value={formatAmount(amount)} />
        <Separator />
        <BalanceRow label="Locked Balance" value={formatAmount(locked)} />
        <Separator />
        <BalanceRow
          label="Total Balance"
          value={formatAmount(total)}
          highlight
        />
      </CardContent>
    </Card>
  )
}

const BalanceRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <span
      className={`text-sm ${
        highlight ? "font-semibold text-foreground" : "text-muted-foreground"
      }`}
    >
      {label}
    </span>
    <span
      className={`text-sm ${
        highlight ? "font-semibold text-indigo-600 dark:text-indigo-400" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);