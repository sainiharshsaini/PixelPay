import React from 'react'
import { Card } from '@/components/ui/card'

const Overview = () => {
  return (
    <div className="w-full">
                <h2 className="text-lg font-semibold mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-6">
                        <p className="text-slate-500">Monthly Income</p>
                        <h3 className="text-xl font-bold">$4,850.00</h3>
                        <p className="text-green-500">+12.5% vs last month</p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-slate-500">Monthly Expenses</p>
                        <h3 className="text-xl font-bold">$3,240.80</h3>
                        <p className="text-red-500">-5.2% vs last month</p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-slate-500">Saved This Month</p>
                        <h3 className="text-xl font-bold">$1,609.20</h3>
                        <p className="text-green-500">+8.1% vs last month</p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-slate-500">Active Contacts</p>
                        <h3 className="text-xl font-bold">127</h3>
                        <p className="text-blue-500">+3 new vs last month</p>
                    </Card>
                </div>
            </div>
  )
}

export default Overview