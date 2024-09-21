const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
  pdf_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Docs',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  user_role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  chat_history: [
    {
      human: { type: String, required: true },
      ai: { type: String, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Chats", chatsSchema);
