const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flatSchema = new Schema({
  title: String,
  size: String,
  prize: String,
  neighborhood: String,
  image: String,
  listingURL: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Flat = mongoose.model("Project", flatSchema);

module.exports = Flat;