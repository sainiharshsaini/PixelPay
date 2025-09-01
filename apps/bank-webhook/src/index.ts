import express, { Request, Response } from "express";
import { prisma } from "@repo/db";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json())

type PaymentStatus = "Success" | "Failure" | "Processing";

interface WebhookRequestBody {
    token: string;
    status: PaymentStatus;
    userId: number;
    amount: number;
}

app.post("/bankWebhook", async (req: Request, res: Response) => {
    try {
        // const parsedData = PaymentSchema.safeParse(req.body);
        // const { token, userId, amount } = parsedData.data;

        const { token, status, userId, amount } = req.body as WebhookRequestBody

        if (!token || !status || !userId || !amount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const txn = await prisma.onRampTransaction.findUnique({ where: { token } });
        if (!txn) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Avoid re-processing completed transactions
        if (txn.status === "Success" || txn.status === "Failure") {
            return res.status(200).json({ message: "Transaction already processed" });
        }

        if (status === "Success") {
            await prisma.$transaction(async (tx) => {
                await tx.onRampTransaction.update({
                    where: { token },
                    data: {
                        status: "Success",
                        endTime: new Date(),
                    },
                });

                // Update or create Balance (if user balance does not exist, create it)
                const balance = await tx.balance.findUnique({
                    where: { userId },
                });

                if (balance) {
                    await tx.balance.update({
                        where: { userId },
                        data: { amount: { increment: Number(amount) } },

                    });
                } else {
                    await tx.balance.create({
                        data: {
                            userId,
                            amount,
                            locked: 0,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    });
                }
            });
            return res.status(200).json({ message: "Money added to your wallet successfully." });
        } else {
            await prisma.onRampTransaction.update({
                where: { token },
                data: { status, endTime: new Date() },
            });
            return res.status(200).json({ message: `Transaction status updated to ${status}.` });
        }
    } catch (error) {
        console.error("Webhook processing error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Bank webhook server listening on port ${PORT}`);
});