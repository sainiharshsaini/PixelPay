import WelcomeCard from "./_components/WelcomeCard";
import { BalanceCard } from "./_components/BalanceCard";
import { fetchBalance, fetchOnRampTransactions, fetchRecentTransactions } from "@/lib/actions/fetchTxns&Balance";
import QuickActions from "./_components/QuickActions";
import Overview from "./_components/Overview";
import RecentTransactions from "./_components/RecentTransactions";
import OnRampTxns from "./_components/OnRampTxns";

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

const Dashboard = async () => {

    let balance: Balance = { amount: 0, locked: 0 };
    let onRampTxns: OnRampTransaction[] = [];
    let recentTxns: P2PTransaction[] = [];

    try {
        balance = await fetchBalance();
    } catch (err) {
        console.error("[Dashboard] Failed to fetch balance:", err);
    }

    try {
        onRampTxns = await fetchOnRampTransactions();
    } catch (err) {
        console.error("[Dashboard] Failed to fetch onramp txns:", err);
    }

    try {
        recentTxns = await fetchRecentTransactions();
    } catch (err) {
        console.error("[Dashboard] Failed to fetch recent txns:", err);
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 items-center gap-8 px-4 md:px-10 lg:px-20 py-8">

            <WelcomeCard />

            <BalanceCard balance={balance} />

            <QuickActions/>

            <Overview />

            <OnRampTxns transactions={onRampTxns} />

            <RecentTransactions transactions={recentTxns} />
        </div>
    );
};

export default Dashboard;
