import { connect } from "@/dbconnection/dbconnection";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
      succcess: true,
      expires: new Date(0),
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
