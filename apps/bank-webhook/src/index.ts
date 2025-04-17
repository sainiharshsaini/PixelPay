import express from "express";
// import { prisma } from "@repo/db";

const app = express();
app.use(express.json())

console.log("harsh 20");


// app.post('/hdfcWebhook', async (req, res) => {
//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount
//     }
//     try {
//         await prisma.$transaction([
//             prisma.balance.updateMany({
//                 where: {
//                     userId: paymentInformation.userId
//                 },
//                 data: {
//                     amount: {
//                         increment: Number(paymentInformation.amount)
//                     }
//                 }
//             }),
//             prisma.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token
//                 },
//                 data: {
//                     status: "Success"
//                 }
//             })
//         ])

//         res.status(200).json({ //super imp
//             message: "Captured"
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(411).json({
//             message: "Error while processing webhook"
//         })
//     }
// })

app.listen(3003);