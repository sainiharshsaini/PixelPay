import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { SignInSchema } from "@repo/validation-schemas";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface CustomUser {
    id: string;
    name?: string | null;
    email?: string | null;
    number?: string | null;
}

interface CustomJWT extends JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    number?: string | null;
}

interface CustomSession extends Session {
    user?: {
        id: string;
        name?: string | null;
        email?: string | null;
        number?: string | null;
    };
}

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
            async authorize(credentials): Promise<CustomUser | null> {
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
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    email: existingUser.email,
                    number: existingUser.number,
                };
            },
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: CustomUser }): Promise<JWT> {
            if (user) {
                (token as CustomJWT).id = user.id;
                (token as CustomJWT).name = user.name;
                (token as CustomJWT).email = user.email;
                (token as CustomJWT).phone = user.number;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            if (session.user && token) {
                (session as CustomSession).user = {
                    id: (token as CustomJWT).id,
                    name: (token as CustomJWT).name,
                    email: (token as CustomJWT).email,
                    number: (token as CustomJWT).number,
                };
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
