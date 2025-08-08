import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getUserSession() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    return session;

  } catch (err) {
    console.error("[getUserSession] Error fetching session:", err);
    return null; // Fail gracefully in production
  }
}