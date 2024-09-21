import mongoose from 'mongoose';


const documentsSchema = new mongoose.Schema({
  access_email: { type: String, required: true },
  document_name: { type: String, required: true },
  department: { type: String, required: true },
  chat_history: [{
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }]
});

module.exports = mongoose.model('Documents', documentsSchema);