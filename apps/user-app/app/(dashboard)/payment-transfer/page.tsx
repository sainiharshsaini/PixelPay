import { AddMoneyCard } from '@/components/AddMoneyCard'
import { BalanceCard } from '@/components/BalanceCard'
import OnRampTxns from '@/components/OnRampTxns'
import { getBalance, getOnRampTxns } from '@/lib/actions/paymentTransfer'

const PaymentTransfer = async () => {
  const balance = await getBalance();
  const transactions = await getOnRampTxns();

  return (
    <section className="relative min-h-[80vh] w-full px-2 sm:px-4 py-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Decorative blurred gradient */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 blur-[100px] opacity-20 rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-pink-300 to-indigo-300 blur-[80px] opacity-20 rounded-full -z-10" />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#6a51a6] mb-10 pt-4 text-center md:text-left tracking-tight">
          Transfer
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 flex flex-col justify-center">
            <AddMoneyCard />
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
              <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
            <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-4">
              <OnRampTxns transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentTransfer