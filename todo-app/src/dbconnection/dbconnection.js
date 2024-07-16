import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONODB_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected");
    });
    connection.on("error", (err) => {
      console.log("mongodb connection error " + err);
      process.exit();
    });
  } catch (error) {
    console.log("somthing went wrong in connection to DB");
    console.log(error);
  }
}
