import express, { Request, Response } from "express";
import { prisma } from "@repo/db";
import { PaymentSchema, PaymentSchemaType } from "@repo/validation-schemas";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json())

app.post("/hdfcWebhook", async (req: Request, res: Response) => {

    // if (req.headers["x-bank-secret"] !== process.env.HDFC_WEBHOOK_SECRET) {
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

    try {
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: { userId: Number(userId) },
                data: {
                    amount: { increment: Number(amount) }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: { token },
                data: { status: "Success" }
            })
        ]);

        console.log(`Webhook processed successfully for token: ${token}, userId: ${userId}`);
        res.json({ message: "Webhook processed successfully" });
    } catch (error) {
        console.error("Webhook processing error:", error);
        res.status(500).json({ error: "Failed to process webhook due to an internal server error." });
    }

})

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Webhook server listening on port ${PORT}`);
});