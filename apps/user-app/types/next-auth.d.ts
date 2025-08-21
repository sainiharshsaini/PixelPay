import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      phoneNumber?: string | null;
      image?: string | null;
    } | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
  }
}

export type UnifiedTransaction = {
  id: number;
  type: "OnRamp" | "P2P";
  amount: number;
  status: string;
  provider?: string;
  counterpart?: string; // "Sent to X" / "Received from Y"
  time: Date;
};