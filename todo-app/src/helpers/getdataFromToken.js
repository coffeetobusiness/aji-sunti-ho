import {  NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import Error from "next/error"




export const getDataFromToken = (request) => {
  try {
   const token = request.cookies.get("token").velue || ''
 const decodedtoken =  jwt.verify(token, process.env.TOKEN_SECRET)
 return decodedtoken.id 
  } catch (error) {
    throw new Error(error.message)
  }
}
