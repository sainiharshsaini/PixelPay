"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export async function createOnRampTransaction(provider: string, amount: number) {

    const session = await getServerSession(authOptions);
    const token = Math.random().toString(); // Ideally the token should come from the banking provider (hdfc/axis)

    const userId = session?.user.id;
    console.log(userId);
    
    if (!userId) {
        return {
            message: 'User not logged in'
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token
        }
    })
}