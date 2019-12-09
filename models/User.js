const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    preferences: {
      city: String,
      size: Number,
      rooms: Number,
      bathrooms: Number,
      minPrice: Number,
      maxPrice: Number,
      features: Array,
      neighborhoods: Array
    },
    contactedFlats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Flat"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
