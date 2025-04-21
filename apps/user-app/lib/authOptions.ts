import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { signInSchema } from "@repo/validation-schemas";
import { Session } from "inspector/promises";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Email or Phone", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) {
                const parsedSignInData = signInSchema.safeParse(credentials);

                if (!parsedSignInData.success) throw new Error('Missing credentials');

                const {credential, password} = parsedSignInData.data;

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credential },
                            { phone: credential }
                        ]
                    }
                });

                if (!user) {
                    throw new Error('User not found');
                } else {
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    
                    if (!isPasswordValid) throw new Error('Invalid password');

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        phone: user.phone,
                        email: user.email
                    };
                }
            },
        })
    ],
    Session: {
        strategy: "jwt"
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
