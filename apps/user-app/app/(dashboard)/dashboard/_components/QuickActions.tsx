import React from 'react'
import { AddMoneyCard } from './AddMoneyCard';
import { SendCard } from './SendCard';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

const QuickActions = () => {

    const quickActions = [
        { title: "Add Money", desc: "Add money to your wallet", action: "addMoney" },
        { title: "Send", desc: "Transfer money", action: "send" }
    ];

    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((item) => (
                    <Dialog>
                        <DialogTrigger>
                            <Card
                                key={item.title}
                                className="p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition rounded-2xl"
                            >
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </Card>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Transfer Money
                                </DialogTitle>
                                <DialogDescription>
                                    pnpm dlx shadcn@latest add dialog
                                </DialogDescription>
                            </DialogHeader>
                            {item.action === "addMoney" && <AddMoneyCard />}
                            {item.action === "send" && <SendCard />}
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                ))}
            </div>
        </div>
    )
}

export default QuickActions