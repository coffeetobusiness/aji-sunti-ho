import { connect } from "@/dbconnection/dbconnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({email});

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 500 }
      );
    }

    console.log("user exist");
    console.log("hii")

    const validatepass = await bcryptjs.compare(password, user.password);

    

    if (!validatepass) {
      return NextResponse.json(
        { error: "check your credentials" },
        { status: 500 }
      );
    }

    const tokenData = {
      id: user._id,
      usename: user.username,
      email: user.email,
    };

    console.log(tokenData)

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "logged in success",
      succuss: true,
    });

    response.cookies.set("token", token, {
      httponly: true,
    });

    console.log(response)

    return response;

    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
