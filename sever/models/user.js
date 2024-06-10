const mongoose = require("mongoose");
const schema = mongoose.Schema;
const artist = require("./artist");
const userSchema = new schema({
  displayName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [
    {
      type: schema.Types.ObjectId,
      ref: "artist",
      required: false,
    },
  ],
  likedSongs: [
    {
      type: schema.Types.ObjectId,
      ref: "song",
      required: false,
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;