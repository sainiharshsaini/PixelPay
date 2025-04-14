import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Email or Phone", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here

                const { credential, password } = credentials ?? {};

                if (!credential || !password) {
                    // return null
                    throw new Error('Missing credentials');
                };

                const isUserExist = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credential },
                            { phone: credential }
                        ]
                    }
                });

                // const hashedPassword = await bcrypt.hash(credentials.password, 10);

                if (!isUserExist) {
                    // return null
                    throw new Error('No user found with this credential');
                } else {
                    const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
                    if (!isPasswordValid) {
                        // return null
                        throw new Error('Invalid password');
                    };

                    return {
                        id: isUserExist.id,
                        name: isUserExist.name,
                        phone: isUserExist.phone,
                        email: isUserExist.phone
                    };
                }

                // try {
                //     const user = await prisma.user.create({
                //         data: {
                //             phone: credentials.phone,
                //             password: hashedPassword
                //         }
                //     });

                //     return {
                //         id: user.id.toString(),
                //         name: user.name,
                //         email: user.phone
                //     }
                // } catch (e) {
                //     console.error(e);
                // }
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        async session({ session, token}: any) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
