"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export async function getBalance() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return { amount: 0, locked: 0 };

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session.user.id)
    }
  })

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  }
}

export async function getOnRampTxns() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return [];

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id)
    }
  })

  return txns.map(t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }))
}