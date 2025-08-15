import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { SignInSchema } from "@repo/validation-schemas";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                credential: {
                    label: "Email or Phone",
                    type: "text",
                    placeholder: "you@example.com or 1234567890",
                    required: true
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true
                }
            },
            async authorize(credentials){
                const parsedCredentials = SignInSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    if (process.env.NODE_ENV === "development") {
                        console.error("Credential parsing failed:", parsedCredentials.error.flatten());
                    }
                    return null
                };

                const { credential, password } = parsedCredentials.data;

                const existingUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credential },
                            { number: credential }
                        ]
                    }
                });

                if (!existingUser || !existingUser.password) {
                    if (process.env.NODE_ENV === "development") {
                        console.warn("User not found or password not set for:", credential);
                    }
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(password, existingUser.password);

                if (!isPasswordValid) {
                    if (process.env.NODE_ENV === "development") {
                        console.warn("Invalid password for user ID:", existingUser.id);
                    }
                    return null;
                }

                return {
                    id: String(existingUser.id),
                    name: existingUser.name ?? null,
                    email: existingUser.email ?? null,
                    number: existingUser.number ?? null,
                };
            },
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id ?? token.id;
                token.name = (user as any).name ?? token.name;
                token.email = (user as any).email ?? token.email;
                token.number = (user as any).number ?? token.number;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id ?? session.user.id ?? "");
                session.user.name = token.name ?? session.user.name ?? null;
                session.user.email = token.email ?? session.user.email ?? null;
                session.user.number = token.number ?? (session.user as any).number ?? null;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
