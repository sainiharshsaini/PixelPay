import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/authOptions";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    console.log(session?.user?.email);
    
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