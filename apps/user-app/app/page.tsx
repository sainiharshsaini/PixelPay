import { Button } from "@repo/ui/button";
import { prisma } from "@repo/db";

export default async function Home() {
  const user = await prisma.user.findFirst() 
  return (
    <div>
      <Button>harsh saini</Button>
      {user?.name ?? "No user added yet"}
      <p className="underline text-red-500">harsh saini paragraph</p>
    </div>
  );
} 