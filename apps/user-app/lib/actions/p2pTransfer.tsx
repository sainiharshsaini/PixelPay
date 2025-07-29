"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { prisma } from "@repo/db";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);

    const from = session?.user?.email;

    if (!from) {
        return { success: false, message: "Unauthorized request" }
    }

    const toUser = await prisma.user.findFirst({
        where: { phone: to }
    });

    if (!toUser) {
        return { success: false, message: "Recipient not found" };
    }

    try {
        await prisma.$transaction(async (tx) => {
            // Lock sender's balance row
            await tx.$queryRawUnsafe(
                `SELECT * FROM "Balance" WHERE "userId" = $1 FOR UPDATE`,
                Number(from)
            );

            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient balance');
            }

            // Decrement sender's balance
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            // Increment receiver's balance
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            // Log the transfer
            //@ts-ignore
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date(),
                },
            });

            return { success: true, message: "Transfer successful" };
        });
    } catch (error) {
        console.error("P2P Transfer Error:", error);
        return { success: false, message: "Transfer failed: " + (error as Error).message };
    }
}