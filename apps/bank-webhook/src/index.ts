import express, { Request, Response } from "express";
import { prisma } from "@repo/db";
import { PaymentSchema, PaymentSchemaType } from "@repo/validation-schemas";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json())

app.post("/hdfcWebhook", async (req: Request, res: Response) => {

    // Webhook authentication
    // const bankSecret = req.headers["x-bank-secret"];
    // if (!bankSecret || bankSecret !== process.env.HDFC_WEBHOOK_SECRET) {
    //     return res.status(401).json({ error: "Unauthorized webhook" });
    // }
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

    const parsedData = PaymentSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.error("Invalid webhook data received:", parsedData.error.format());
        return res.status(400).json({
            error: "Invalid data provided",
            details: parsedData.error.format()
        });
    }

    const { token, userId, amount } = parsedData.data;

    console.log("webhook: ", token, userId, amount);

    try {
        await prisma.$transaction(async (tx) => {
            const transaction = await tx.onRampTransaction.findUnique({
                where: { token }
            })

            if (!transaction) {
                throw new Error("Transaction not found");
            }
            if (transaction.status !== "Processing") { // Pending
                throw new Error("Transaction already processed");
            }

            const userBalance = await tx.balance.findUnique({
                where: { userId: Number(userId) }
            })

            if (!userBalance) {
                throw new Error("User balance record not found");
            }

            await tx.balance.update({
                where: { userId: Number(userId) },
                data: {
                    amount: { increment: Number(amount) }
                }
            })

            await tx.onRampTransaction.update({
                where: { token },
                data: { status: "Success" }
            });
        })

        console.log(`Webhook processed successfully for token: ${token}`);
        return res.json({ message: "Webhook processed successfully" });

    } catch (error: any) {
        console.error("Webhook processing error:", error.message);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }

})

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Webhook server listening on port ${PORT}`);
});