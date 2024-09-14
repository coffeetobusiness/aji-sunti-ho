import { NextResponse } from "next/server";
import { connect } from "@/dbconnection/dbconnection";
import User from "@/models/userModel";

export async function PUT(request, { params }) {
  try {
    console.log('Connecting to database...');
    await connect();
    console.log('Connected to database successfully');

    const { id } = params;
    const updateData = await request.json();

    console.log('Received update request for user ID:', id);
    console.log('Update data:', updateData);

    // First, try to find the user
    const existingUser = await User.findById(id);
    
    if (!existingUser) {
      console.log('User not found in database. ID:', id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log('Existing user found:', existingUser);

    // If user exists, proceed with update
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      console.log('User update failed. ID:', id);
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }

    console.log('User updated successfully:', updatedUser);
    return NextResponse.json({ message: "User updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error in user update route:', error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}