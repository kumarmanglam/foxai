const Chats = require('../models/chatModel');
const { retrieveAnswer } = require('../utils/chatUtils');



// In Postman:
// {
//   "userId": "user_mongo_id",
//   "pdfId": "pdf_mongo_id",
//   "userRole": "user",
//   "query": "Your question here"
// }
const conversation = async (req, res) => {
  const { userId, pdfId, userRole, query } = req.body;

  if (!userId || !pdfId || !query) {
    return res.status(400).send('User ID, PDF ID, and query are required.');
  }

  try {
    let chatHistory = await Chats.findOne({ user_id: userId, pdf_id: pdfId });

    if (!chatHistory) {
      chatHistory = new Chats({
        user_id: userId,
        pdf_id: pdfId,
        user_role: userRole,
        chat_history: []
      });
    }

    const historyContext = chatHistory.chat_history.map(entry => `Human: ${entry.human}\nAI: ${entry.ai}`).join('\n');

    const answer = await retrieveAnswer(query, [historyContext], pdfId, req.user._id);

    chatHistory.chat_history.push({ human: query, ai: answer });
    await chatHistory.save();

    const resp = {
      answer,
      chatHistory: chatHistory.chat_history
    }

    res.json(resp);
  } catch (error) {
    console.error(`Error during conversation: ${error.message}`);
    res.status(500).send('An error occurred during the conversation.');
  }
};

const showChatHistory = async (req, res) => {
  const { userId, pdfId } = req.body;

  if (!userId || !pdfId) {
    return res.status(400).send('User ID and PDF ID are required.');
  }

  try {
    const chatHistory = await Chats.findOne({ user_id: userId, pdf_id: pdfId });

    if (!chatHistory) {
      return res.status(200).send('No chat history found for the specified user and PDF.');
    }

    res.json(chatHistory.chat_history);
  } catch (error) {
    console.error(`Error retrieving chat history: ${error.message}`);
    res.status(500).send('An error occurred while retrieving the chat history.');
  }
};

const deleteChatHistory = async (req, res) => {
  const { userId, pdfId } = req.body;

  if (!userId || !pdfId) {
    return res.status(400).send('User ID and PDF ID are required.');
  }

  try {
    const result = await Chats.findOneAndDelete({ user_id: userId, pdf_id: pdfId });

    if (!result) {
      return res.status(200).send('No chat history found for the specified user and PDF.');
    }

    res.send('Chat history successfully deleted.');
  } catch (error) {
    console.error(`Error deleting chat history: ${error.message}`);
    res.status(500).send('An error occurred while deleting the chat history.');
  }
};

module.exports = { conversation, showChatHistory, deleteChatHistory };

