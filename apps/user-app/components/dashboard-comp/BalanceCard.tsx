
export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <div className="p-4 rounded-2xl shadow-sm shadow-gray-300 md:w-4/5">
        <h2 className="text-lg font-semibold pb-4">Balance</h2>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Unlocked balance
            </div>
            <div>
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
                {(locked + amount) / 100} INR
            </div>
        </div>
    </div>
}