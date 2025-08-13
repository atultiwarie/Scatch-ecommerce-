const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    products: {
      type: Array,
      default: [],
    },
    picture: String,
    gstin: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('owner',ownerSchema)