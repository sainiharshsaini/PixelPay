import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/getUserSession";

export const GET = async () => {
    const session = await getUserSession();
    
    if (session?.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}