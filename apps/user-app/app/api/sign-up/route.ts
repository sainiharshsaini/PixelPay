import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

interface RegisterRequestBody {
    name: string;
    email: string;
    phone: string;
    password?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body: RegisterRequestBody = await req.json();
        const { name, email, phone, password } = body;

        if (!name || !email || !phone || !password) {
            console.error("Missing required fields for registration:", { name: !!name, email: !!email, phone: !!phone, password: !!password });
            return NextResponse.json({ message: 'All fields (name, email, phone, password) are required.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.warn("Attempted registration with existing email:", email);
            return NextResponse.json({ message: 'Email already registered.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword
            }
        })

        console.log("User created successfully:", email);
        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });

    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json({ message: 'Something went wrong during registration.' }, { status: 500 });
    }
}