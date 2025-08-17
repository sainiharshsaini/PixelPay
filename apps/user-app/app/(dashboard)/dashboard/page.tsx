import WelcomeCard from "./_components/WelcomeCard";
import { BalanceCard } from "./_components/BalanceCard";
import { fetchBalance, fetchOnRampTransactions } from "@/lib/actions/paymentTransfer";
import QuickActions from "./_components/QuickActions";
import Overview from "./_components/Overview";
import RecentTransactions from "./_components/RecentTransactions";

interface Balance {
    amount: number;
    locked: number;
}
type TransactionStatus = "success" | "pending" | "failed" | string;

interface Transaction {
    time: Date;
    amount: number;
    status: TransactionStatus;
    provider: string;
}

const Dashboard = async () => {

    let balance: any;
    let transactions: Transaction[] = [];

    try {
        balance = await fetchBalance();
    } catch (err) {
        console.error('[PaymentTransfer] Failed to fetch balance:', err);
    }

    try {
        transactions = await fetchOnRampTransactions();
    } catch (err) {
        console.error('[PaymentTransfer] Failed to fetch transactions:', err);
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-50 items-center gap-8 px-4 md:px-10 py-6">
            {/* Welcome */}
            <WelcomeCard />

            {/* Balance */}
            <BalanceCard amount={balance.amount} locked={balance.locked} />

            {/* Quick Actions */}
            <QuickActions/>

            {/* Overview */}
            <Overview/>

            {/* Recent Transactions */}
            <RecentTransactions transactions={transactions}/>
        </div>
    );
};

export default Dashboard;
