import React from 'react'
import OnRampTxns from './OnRampTxns'

const RecentTransactions = ({ transactions }: any) => {
    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">OnRampTxn History</h2>
            {/* <Card className="p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Sarah Johnson</p>
                                <p className="text-sm text-slate-500">Payment received</p>
                            </div>
                            <p className="text-green-500 font-semibold">+$850.00</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Netflix Subscription</p>
                                <p className="text-sm text-slate-500">Monthly subscription</p>
                            </div>
                            <p className="text-red-500 font-semibold">-$15.99</p>
                        </div>
                    </div>
                </Card> */}
            <OnRampTxns transactions={transactions} />
        </div>
    )
}

export default RecentTransactions