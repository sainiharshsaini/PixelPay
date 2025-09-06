"use client";

import React, { useState } from "react";
import { AddMoneyForm } from "./transferForm/AddMoneyForm";
import { SendForm } from "./transferForm/P2pSendForm";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Users, Banknote } from "lucide-react";

const quickActions = [
  {
    title: "Add Money",
    desc: "Top up your wallet securely",
    action: "addMoney",
    icon: <PlusCircle className="h-6 w-6 text-white opacity-90" />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "P2P Transfer",
    desc: "Send to PixelPay users",
    action: "p2p",
    icon: <Users className="h-6 w-6 text-white opacity-90" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Send to Bank",
    desc: "Transfer to your bank account",
    action: "sendToBank",
    icon: <Banknote className="h-6 w-6 text-white opacity-90" />,
    color: "from-pink-500 to-rose-500",
  },
];

const QuickActions = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const router = useRouter();

  const handleSuccess = () => {
    setOpenDialog(null);
    router.refresh();
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((item, idx) => (
          <Dialog
            key={idx}
            open={openDialog === item.action}
            onOpenChange={(isOpen) =>
              setOpenDialog(isOpen ? item.action : null)
            }
          >
            <DialogTrigger asChild>
              <Card className="group p-6 flex flex-col items-center justify-center text-center cursor-pointer border border-border/50 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.05]">
                <div
                  className={`w-14 h-14 mt-2 flex items-center justify-center rounded-full bg-gradient-to-r ${item.color} mb-1 shadow-md`}
                >
                  {item.icon}
                </div>

                <p className="font-semibold text-sm sm:text-base text-foreground group-hover:text-indigo-600 transition">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </Card>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg rounded-xl shadow-xl border border-border/40 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {item.action === "addMoney" &&
                    "Add funds to your PixelPay wallet securely."}
                  {item.action === "p2p" &&
                    "Send and receive money instantly with PixelPay users (P2P)."}
                  {item.action === "sendToBank" &&
                    "This feature is under development. Soon you’ll be able to transfer money directly from PixelPay to your bank account."}
                </DialogDescription>
              </DialogHeader>

              {item.action === "addMoney" && (
                <AddMoneyForm onSuccess={handleSuccess} />
              )}
              {item.action === "p2p" && <SendForm onSuccess={handleSuccess} />}
              {item.action === "sendToBank" && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  🚀 Coming Soon: We’re working hard to bring you secure and fast
                  bank transfers. Stay tuned!
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
