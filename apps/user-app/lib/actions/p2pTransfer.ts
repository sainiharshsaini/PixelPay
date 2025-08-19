"use server"

import { prisma } from "@repo/db";
import { getUserSession } from "../getUserSession";

const MAX_RETRIES = Number(process.env.P2P_MAX_RETRIES ?? 4);

export async function p2pTransfer(toNumber: string, amount: number) {

    if (!/^\d{10}$/.test(toNumber)) {
        return { success: false, message: "Invalid recipient number" };
    }

    const session = await getUserSession();

    const fromUserId = Number(session?.user?.id);

    if (!fromUserId || Number.isNaN(fromUserId)) {
        return { success: false, message: "Unauthorized request" }
    }

    // find recipient
    const toUser = await prisma.user.findFirst({
        where: { phoneNumber: toNumber }
    });

    if (!toUser) {
        return { success: false, message: "Recipient not found" };
    }

    const toUserId = toUser.id;

    // Prevent self-transfer
    if (fromUserId === toUserId) {
        return { success: false, message: "Cannot send money to yourself" };
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const result = await prisma.$transaction(async (tx) => {
                // Acquire row locks in deterministic order (lowest userId first)
                const firstLockId = Math.min(fromUserId, toUserId);
                const secondLockId = Math.max(fromUserId, toUserId);

                // Lock first
                await tx.$queryRawUnsafe(
                    `SELECT "userId", "amount", "locked" FROM "Balance" WHERE "userId" = $1 FOR UPDATE`,
                    firstLockId
                );

                // Lock second (if different)
                if (secondLockId !== firstLockId) {
                    await tx.$queryRawUnsafe(
                        `SELECT "userId", "amount", "locked" FROM "Balance" WHERE "userId" = $1 FOR UPDATE`,
                        secondLockId
                    );
                }

                // fetch balances
                const senderBalance = await tx.balance.findUnique({
                    where: { userId: fromUserId },
                });
                const receiverBalance = await tx.balance.findUnique({
                    where: { userId: toUserId },
                });

                // If your onboarding ensures Balance is always created on signup, these should exist.
                if (!senderBalance) {
                    throw new Error("Sender balance record not found");
                }
                if (!receiverBalance) {
                    // create receiver balance if missing (defensive)
                    await tx.balance.create({
                        data: { userId: toUserId, amount: 0, locked: 0 },
                    });
                }

                const senderAmount = Number((senderBalance?.amount ?? 0));
                if (senderAmount < amount) {
                    throw new Error("Insufficient balance");
                }

                // decrement sender
                await tx.balance.update({
                    where: { userId: fromUserId },
                    data: { amount: { decrement: amount } },
                });

                // increment receiver
                await tx.balance.update({
                    where: { userId: toUserId },
                    data: { amount: { increment: amount } },
                });

                // create p2pTransfer immutable record
                await tx.p2PTransfer.create({
                    data: {
                        amount,
                        timestamp: new Date(),
                        fromUserId,
                        toUserId,
                    },
                });

                return { success: true, message: "Transfer successfully!" };
            });

            // Transaction committed, return success
            return result;

        } catch (err: any) {
            const msg = String(err?.message || err);
            // If transient DB error -> retry
            if (/(could not serialize access|deadlock detected|SQLSTATE 40001)/i.test(msg) && attempt < MAX_RETRIES) {
                // exponential backoff
                const backoff = 30 * Math.pow(2, attempt);
                await new Promise((r) => setTimeout(r, backoff));
                continue;
            }

            // Map expected error messages to friendly responses
            if (msg.includes("Insufficient balance")) {
                return { success: false, message: "Insufficient balance" };
            }
            if (msg.includes("Sender balance record not found")) {
                return { success: false, message: "Sender account balance not initialized" };
            }

            console.error("[p2pTransfer] error:", err);
            return { success: false, message: "Transfer failed: " + msg };
        }
    }

    return { success: false, message: "Transfer failed after retries" };
}