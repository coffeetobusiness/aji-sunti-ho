import { connect } from "@/dbconnection/dbconnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { Token } = reqBody;
    console.log(Token);

    const user = await User.findOne({
      verifyToken: Token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid token " }, { status: 400 });
    }
    console.log(user);

    user.isverified = true;
    user.verifyToken = undefined;
    verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { error: "email verified successfully" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
