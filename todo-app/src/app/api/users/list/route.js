import User from "@/models/userModel";
import { connect } from "@/dbconnection/dbconnection";
import { NextResponse } from "next/server";
import List from "@/models/list";

export async function POST(request) {
  try {
    await connect();
 

    const reqBody = await request.json();
   
    const { body, email } = reqBody;

    if (!body || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newList = new List({ body, user: existingUser });
    await newList.save();

    existingUser.list.push(newList);
    await existingUser.save();

    return NextResponse.json({ list: newList }, { status: 201 });
  } catch (error) {
   
    // Send a more detailed error response
    return NextResponse.json({ 
      error: "Internal Server Error", 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}