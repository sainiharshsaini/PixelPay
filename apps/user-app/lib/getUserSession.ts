import { getServerSession, Session } from "next-auth";
import { authOptions } from "./authOptions";  

export async function getUserSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return null;
    }

    return session;

  } catch (err) {
    console.error("[getUserSession] Error fetching session:", err);
    return null; // Fail gracefully in production
  }
}