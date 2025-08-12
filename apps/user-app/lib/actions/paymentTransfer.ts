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
    // Server-side logging only
    console.error("[fetchBalance] DB error for userId:", err);
    // Re-throw so caller can decide what to render
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