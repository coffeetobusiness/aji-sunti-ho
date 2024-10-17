import User from "@/models/userModel";
import { connect } from "@/dbconnection/dbconnection";
import { NextResponse } from "next/server";
import List from "@/models/list";

export async function POST(request) {
  try {
    await connect();

    const reqBody = await request.json();
    const { body } = reqBody;
    console.log("===== Request Accepted ==== ");
    console.log(reqBody);
    // const userId = reqBody.id;

    if (!body) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newList = new List({ body, user: existingUser._id });
    await newList.save();

    existingUser.list.push(newList._id);
    await existingUser.save();

    return NextResponse.json({ list: newList }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connect();
  const list = await List.find();
  return NextResponse.json({ list });
}
