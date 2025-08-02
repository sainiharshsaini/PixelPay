import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { SignInSchema } from "@repo/validation-schemas";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

/**
 * Custom User type extending NextAuth's default User.
 * This ensures that properties like 'phone' are recognized when added to the user object.
 */
interface CustomUser {
    id: string;
    name?: string | null;
    email?: string | null;
    number?: string | null; // Custom property
}

/**
 * Custom JWT type extending NextAuth's default JWT.
 * This is crucial for adding custom properties to the JWT token.
 */
interface CustomJWT extends JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    number?: string | null; // Custom property
}

/**
 * Custom Session type extending NextAuth's default Session.
 * This allows the session.user object to include custom properties.
 */
interface CustomSession extends Session {
    user?: {
        id: string;
        name?: string | null;
        email?: string | null;
        number?: string | null; // Custom property
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                credential: { label: "Email or Phone", type: "text", placeholder: "your@email.com or 1234567890", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: Record<string, string | undefined>): Promise<CustomUser | null>{
                const parsedCredentials = SignInSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.error("Credential parsing failed:", parsedCredentials.error.flatten());
                    return null
                };

                const { credential, password } = parsedCredentials.data;

                if (!password) {
                    console.error("Password not provided.");
                    return null;
                }

                const existingUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credential },
                            { number: credential }
                        ]
                    }
                });

                if (!existingUser || !existingUser.password) {
                    console.error("User not found or password not set for:", credential);
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(password, existingUser.password);

                if (!isPasswordValid) {
                    console.error("Invalid password for user ID:", existingUser.id);
                    return null;
                }

                return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    number: existingUser.number,
                    email: existingUser.email
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
                // (token as CustomJWT).name = user.name;
                // (token as CustomJWT).email = user.email;
                // (token as CustomJWT).phone = user.phone;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            if (token && session.user) {
                (session as CustomSession).user!.id = (token as CustomJWT).sub as string;
                // (session as CustomSession).user!.name = (token as CustomJWT).name;
                // (session as CustomSession).user!.email = (token as CustomJWT).email;
                // (session as CustomSession).user!.phone = (token as CustomJWT).phone;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
