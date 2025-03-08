const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
  name: [
    {
      type: String,
      required: true
    }
  ],
  bio: [
    {
      type: String,
      default: ["", "", ""]
    }
  ],
  image: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Writer', writerSchema);
