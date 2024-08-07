import { connect } from "@/dbconnection/dbconnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getdataFromToken";

connect();

export async function GET(request) {
// extract data from token

 const userid = await getDataFromToken(request)
 const user = await User.findOne({_id: userid}).select("-password")

 return NextResponse.json({
  message: "user found ",
  data: user
 })
}
