"use server";

import { prisma } from "@repo/db";
import { OnRampTxnSchema, OnRampTxnType } from "@repo/validation-schemas";
import { getUserSession } from "../getUserSession";
import crypto from "crypto";

export async function createOnRampTxn(params: OnRampTxnType) {
    try {
        const session = await getUserSession();

        const userId = Number(session?.user?.id)

        if (!userId) {
            return { message: "Unauthenticated request" }
        }

        // if (!Number.isInteger(userId) || userId <= 0) {
        //   return { message: "Invalid user ID" };
        // }

        const parsedData = OnRampTxnSchema.safeParse(params)
        if (!parsedData.success) {
            return { message: parsedData.error.errors[0]?.message || "Invalid data" };
        }

        const { provider, amount } = parsedData.data

        if (amount <= 0) {
            return { message: "Amount must be greater than zero" };
        }

        const token = crypto.randomUUID(); // Ideally the token should come from the banking provider (hdfc/axis)
    
        await prisma.onRampTransaction.create({
            data: {
                userId,
                amount: Math.round(amount * 100),
                status: "Processing",
                startTime: new Date(),
                provider,
                token
            },
        })

        return { message: "On Ramp transaction created successfully" };
        
    } catch (error) {
        console.error("[createOnRampTxn] Error:", error);
        return { message: "Internal server error" };
    }
}