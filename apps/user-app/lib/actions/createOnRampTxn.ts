"use server";

import { prisma } from "@repo/db";
import { OnRampTxnSchema, OnRampTxnType } from "@repo/validation-schemas";
import { getUserSession } from "../getUserSession";
import crypto from "crypto";
import axios from "axios";

const BANK_API_URL = process.env.BANK_API_URL || "http://localhost:4001/initiatePayment";
const CALLBACK_URL = process.env.BANK_WEBHOOK_URL || "http://localhost:3003/bankWebhook";

export async function createOnRampTxn(params: OnRampTxnType) {
    try {
        const session = await getUserSession();
        const userId = Number(session?.user?.id)

        if (!userId) return { message: "Unauthenticated request" }


        const parsedData = OnRampTxnSchema.safeParse(params);
        if (!parsedData.success) {
            return { message: parsedData.error.errors[0]?.message || "Invalid data" };
        }

        const { provider, amount } = parsedData.data

        if (amount <= 0) return { message: "Amount must be greater than zero" };

        const token = crypto.randomUUID();

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

        // Call Fake Bank API
        await axios.post(BANK_API_URL, {
            token,
            userId,
            amount,
            callbackUrl: CALLBACK_URL,
        });

        return { message: "On Ramp transaction created Successfully", token };

    } catch (error) {
        console.error("[createOnRampTxn] Error:", error);
        return { message: "Internal server error" };
    }
}