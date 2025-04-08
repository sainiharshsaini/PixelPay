import { prisma } from "@repo/db";

export default async function Home() {
  const user = await prisma.user.findFirst();
  return (
    <h1 >
      {user?.name ?? "No user added yet"}
    </h1>
  );
}
