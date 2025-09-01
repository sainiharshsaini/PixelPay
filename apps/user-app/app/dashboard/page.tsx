import WelcomeCard from "./_components/WelcomeCard";
import { BalanceCard } from "./_components/BalanceCard";
import QuickActions from "./_components/QuickActions";
import Overview from "./_components/Overview";
import RecentTransactions from "./_components/RecentTransactions";
import OnRampTxns, { Transaction } from "./_components/OnRampTxns";
import {
  fetchBalance,
  fetchOnRampTransactions,
  fetchRecentTransactions,
} from "@/lib/actions/fetchTxns&Balance";

// Make this page dynamic since it uses server functions that access headers
export const dynamic = 'force-dynamic';

interface Balance {
  amount: number;
  locked: number;
}

interface OnRampTransaction {
  id: number;
  amount: number;
  status: "Success" | "Failure" | "Processing";
  provider: string;
  startTime: Date;
  endTime?: Date;
}

interface P2PTransaction {
  id: string | number;
  title: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="w-full bg-red-100 text-red-700 rounded p-4 mb-4">
      {message}
    </div>
  );
}

function Loading() {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded p-4 mb-4">
      Loading...
    </div>
  );
}

const Dashboard = async () => {
  let balance: Balance | null = null;
  let onRampTxns: OnRampTransaction[] = [];
  let recentTxns: P2PTransaction[] = [];
  let error: string | null = null;

  try {
    const [balanceResult, onRampResult, recentResult] = await Promise.all([
      fetchBalance(),
      fetchOnRampTransactions(),
      fetchRecentTransactions(),
    ]);
    //@ts-ignore
    balance = balanceResult;
    //@ts-ignore
    onRampTxns = onRampResult;
    //@ts-ignore
    recentTxns = recentResult;
  } catch (err) {
    error = "Something went wrong loading dashboard data. Please refresh or try again.";
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (!balance) {
    return <Loading />;
  }

  // Map OnRampTransaction[] to Transaction[] so the props match
  const mappedOnRampTxns: Transaction[] = onRampTxns.map((txn) => ({
    time: txn.startTime,
    amount: txn.amount,
    status: txn.status,
    provider: txn.provider,
  }));

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 items-center gap-8 px-4 md:px-10 lg:px-20 py-8">
      <WelcomeCard />
      <BalanceCard amount={balance.amount} locked={balance.locked} />
      <QuickActions />
      <Overview />
      <OnRampTxns onRampTxns={mappedOnRampTxns} />
      <RecentTransactions recentTxns={recentTxns} />
    </div>
  );
};

export default Dashboard;
