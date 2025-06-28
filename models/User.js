const { Schema } = require('mongoose');
const { Profiler } = require('react');
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    ProfilePic: { type: String, default:""},
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
)
const User = mongoose.model("User", userSchema);


module.exports = User;