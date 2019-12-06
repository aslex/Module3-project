const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  contactedFlats: [{type: Schema.Types.ObjectId, ref: "Flat"}],
  owner: {type: Schema.Types.ObjectId, ref: "User"}
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
