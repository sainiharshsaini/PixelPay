"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { OnRampTxnSchema, OnRampTxnType } from "@repo/validation-schemas";

export async function createOnRampTxn(params: OnRampTxnType) {
    const session = await getServerSession(authOptions);
    
    const userId = session?.user?.id

    if (!userId) {
        return {
            message: "Unauthenticated request"
        }
    }

    const parsedData = OnRampTxnSchema.safeParse(params)
    if (!parsedData.success) {
        return {
            message: parsedData.error.errors[0]?.message
        }
    }

    const { provider, amount } = parsedData.data

    const token = Math.random().toString(); // Ideally the token should come from the banking provider (hdfc/axis)

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId), // 1
            amount: amount * 100,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        },
    })

    return {
        message: "On Ramp Txn Done"
    }
}