const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
    {
      note: {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }
    }
  ],
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  }
});

module.exports = mongoose.model("User", userSchema);
