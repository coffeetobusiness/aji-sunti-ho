import mongoose from "mongoose";
const listSchema = new mongoose.Schema({
  body: {
    type: String,
    require: true,
  },
  user: [{
    type: mongoose.Types.ObjectId,
    ref: "users"
  }]
});

const list = mongoose.models.list || mongoose.model("List", listSchema);

export default list;
