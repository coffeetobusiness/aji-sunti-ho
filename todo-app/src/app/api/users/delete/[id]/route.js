import { NextResponse } from "next/server";
import { connect } from "@/dbconnection/dbconnection";
import User from "@/models/userModel";

export async function DELETE(request, { params }) {
  console.log("DELETE route handler called");
  console.log("Params received:", params);

  try {
    console.log("Connecting to database...");
    await connect();
    console.log("Connected to database successfully");

    const { id } = params;

    console.log("Attempting to delete user with ID:", id);

    if (!id) {
      console.log("No ID provided in params");
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // First, try to find the user
    console.log("Searching for user in database...");
    const existingUser = await User.findById(id);

    if (!existingUser) {
      console.log("User not found in database. ID:", id);
      return NextResponse.json({ error: "User not found ??" }, { status: 404 });
    }

    console.log("Existing user found:", existingUser);

    // If user exists, proceed with deletion
    console.log("Attempting to delete user...");
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("User deletion failed. ID:", id);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }

    console.log("User deleted successfully:", deletedUser);
    return NextResponse.json(
      { message: "User deleted", user: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in user delete route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
