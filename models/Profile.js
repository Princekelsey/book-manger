const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Profile schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  handle: {
    type: String,
    required: true
  },

  book_record: [
    {
      title: {
        type: String,
        required: true
      },

      author: {
        type: String,
        required: true
      },

      ISBN: {
        type: String,
        required: true
      },

      comment: []
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
