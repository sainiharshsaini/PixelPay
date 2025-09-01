import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { SignUpSchema } from "@repo/validation-schemas";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();

        const parsed = SignUpSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.errors[0]?.message },
                { status: 400 }
            )
        }

        const { name, email, phoneNumber, password } = parsed.data;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already registered." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    phoneNumber,
                    password: hashedPassword
                }
            })
        })

        if (process.env.NODE_ENV === "development") {
            console.log("New user registered:", email);
        }

        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json(
            { message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}