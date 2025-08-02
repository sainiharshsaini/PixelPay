import { AddMoneyCard } from '@/components/AddMoneyCard'
import { BalanceCard } from '@/components/BalanceCard'
import OnRampTxns from '@/components/OnRampTxns'
import { getBalance, getOnRampTxns } from '@/lib/actions/paymentTransfer'

const PaymentTransfer = async () => {
  const balance = await getBalance();
  const transactions = await getOnRampTxns();

  return (
    <div className='w-screen p-4'>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTxns transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentTransfer