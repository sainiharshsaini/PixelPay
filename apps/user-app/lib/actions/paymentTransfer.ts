"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export async function getBalance() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) return { amount: 0, locked: 0 };

    let balance = await prisma.balance.findUnique({
      where: {
        userId: Number(userId)
      },
      select: {
        amount: true,
        locked: true
      }
    })

    console.log("payment trs: ", userId, balance?.amount, balance?.locked);

    // If balance doesn't exist, create it with defaults
    if (!balance) {
      balance = await prisma.balance.create({
        data: {
          userId: Number(userId),
          amount: 0,
          locked: 0,
        },
        select: {
          amount: true,
          locked: true,
        }
      });
    }

    return {
      amount: balance.amount,
      locked: balance.locked,
    };

  } catch (error) {
    console.error("Error fetching or creating balance:", error);
    return { amount: 0, locked: 0 };
  }
}

export async function getOnRampTxns() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return [];
    }

    const transactions = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        startTime: true,
        amount: true,
        status: true,
        provider: true,
      },
      orderBy: {
        startTime: "desc", // newest first
      },
    });

    return transactions.map((txn) => ({
      time: txn.startTime,
      amount: txn.amount,
      status: txn.status,
      provider: txn.provider,
    }));
  } catch (error) {
    console.error("Error fetching on-ramp transactions:", error);
    return [];
  }
}