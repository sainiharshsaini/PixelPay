import express, { Request, Response } from "express";

import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

type PaymentStatus = "Success" | "Failure";

interface InitiatePaymentRequest {
  token: string;
  userId: number;
  amount: number;
  callbackUrl: string;
}

function getPaymentStatus(): PaymentStatus {
  const statuses: PaymentStatus[] = ["Success", "Failure"];
  const index = Math.floor(Math.random() * statuses.length);
  return statuses[index]!;
}

app.post("/initiatePayment", (req: Request, res: Response) => {
  const { token, userId, amount, callbackUrl } = req.body as InitiatePaymentRequest;
console.log(amount);
  if (!token || !userId || !amount || !callbackUrl) {
    res.status(400).json({ message: "Missing required fields: token, userId, amount, callbackUrl" });
    return;
  }

  res.status(202).json({
    status: "Processing",
    token,
    userId,
    amount,
    message: "Payment processing started",
  });

  // After 3 seconds, simulate payment result and send webhook
  setTimeout(async () => {
    const finalStatus = getPaymentStatus();

    try {
      await axios.post(callbackUrl, {
        token,
        status: finalStatus,
        userId,
        amount
      });
      console.log(`Webhook sent for token=${token}, status=${finalStatus}`);
    } catch (error) {
      console.error("Error sending webhook callback:", error);
    }
  }, 3000);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Fake Bank API running on port ${PORT}`);
});
