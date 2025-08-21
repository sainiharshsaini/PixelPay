"use server";

import { prisma } from "@repo/db";
import { getUserSession } from "../getUserSession";

export async function fetchBalance() {
  try {
    const session = await getUserSession();

    const userId = Number(session?.user?.id)

    if (!userId) {
      return { message: "Unauthenticated request" }
    }

    const balance = await prisma.balance.findUnique({
      where: {
        userId: userId
      }
    })

    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
    };

  } catch (err: any) {
    console.error("[fetchBalance] DB error for userId:", err);
    throw err;
  }
}

export async function fetchOnRampTransactions() {
  try {
    const session = await getUserSession();

    const userId = Number(session?.user?.id)

    if (!userId) {
      return { message: "Unauthenticated request" }
    }

    const txns = await prisma.onRampTransaction.findMany({
      where: { userId: userId },
      orderBy: { startTime: "desc" },
      take: 10,
    });

    return txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));

  } catch (err: any) {
    console.error("[fetchOnRampTransactions] DB error for userId:", err);
    throw err;
  }
}

export async function fetchRecentTransactions() {
  const session = await getUserSession();
  const userId = Number(session?.user?.id);

  if (!userId) {
    return { message: "Unauthenticated request" }
  }

  const recentTxns = await prisma.p2PTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    include: {
      fromUser: { select: { name: true, email: true } },
      toUser: { select: { name: true, email: true } },
    },
    orderBy: { timestamp: "desc" },
    take: 10
  });

  return recentTxns.map((txn) => ({
    id: txn.id,
    title:
      txn.fromUserId === userId
        ? `Sent to ${txn.toUser.name || txn.toUser.email}`
        : `Received from ${txn.fromUser.name || txn.fromUser.email}`,
    description: txn.status, // could be "Pending", "Success", "Failed"
    amount: txn.amount,
    type: txn.fromUserId === userId ? "expense" : "income",
    date: txn.timestamp.toISOString(),
  }))
}
