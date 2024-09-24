const mongoose = require("mongoose");

const embeddingsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },

  pdf_id: {
    type: String,
    required: true,
    trim: true
  },

  embeddings: {
    type: [Number],
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Embedding", embeddingsSchema);
