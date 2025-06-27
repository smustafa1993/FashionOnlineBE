const { Schema } = require('mongoose');

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
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = userSchema;