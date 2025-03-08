const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: [
    {
      type: String,
      required: true,
      unique: true
    }
  ],
  description: [{
    type: String,
    default: ""
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

module.exports = mongoose.model('SubCategory', subcategorySchema);
