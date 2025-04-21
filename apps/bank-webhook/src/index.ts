import express from "express";
import { prisma } from "@repo/db";
import { paymentSchema } from "@repo/validation-schemas";

const app = express();
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {

    // if (req.headers["x-bank-secret"] !== process.env.HDFC_WEBHOOK_SECRET) {
    //     return res.status(401).json({ error: "Unauthorized webhook" });
    // }
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them


    const parsedData = paymentSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data!" })
    }

    const { token, user_identifier, amount }: any = parsedData.data;

    try {
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: { userId: Number(user_identifier) },
                data: {
                    // You can also get this from your DB
                    amount: { increment: Number(amount) }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: { token },
                data: { status: "Success" }
            })
        ]);

        res.json({ message: "Webhook processed successfully" });
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).json({ message: "Failed to process webhook" });
    }

})

app.listen(3003);