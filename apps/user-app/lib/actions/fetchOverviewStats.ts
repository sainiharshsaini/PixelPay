"use server";

import { prisma } from "@repo/db";
import { getUserSession } from "../getUserSession";

export async function fetchOverviewStats() {
  const session = await getUserSession();
  const userId = Number(session?.user?.id);

  if (!userId) {
    return { message: "Unauthenticated request" };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const contacts = await prisma.p2PTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
      timestamp: { gte: startOfMonth },
    },
    select: {
      fromUserId: true,
      toUserId: true,
    },
  });

  const contactSet = new Set<number>();
  contacts.forEach((c) => {
    if (c.fromUserId !== userId) contactSet.add(c.fromUserId);
    if (c.toUserId !== userId) contactSet.add(c.toUserId);
  });

  return {
    activeContacts: contactSet.size,
  };
}
