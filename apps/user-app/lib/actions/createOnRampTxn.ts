"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { OnRampTxnSchema, OnRampTxnType } from "@repo/validation-schemas";

export async function createOnRampTxn(data: OnRampTxnType){
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return {
            message: "Unauthenticated request"
        }
    }

    const parsedData = OnRampTxnSchema.safeParse(data)
    if (!parsedData.success) {
        return {
            message: parsedData.error.errors[0]?.message
        }
    }

    const { provider, amount } = parsedData.data

    const token = Math.floor(Math.random() * 1_000_000).toString(); // Ideally the token should come from the banking provider (hdfc/axis)
    const userId = session?.user?.email;
    console.log(userId);

    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token,
            userId: Number(userId),
            amount: Math.round(amount * 100), // Ensuring it's an integer
        },
    })

    return {
        message: "Done"
    }
}