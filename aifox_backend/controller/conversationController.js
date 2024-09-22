const Chats = require('../models/chatModel');
const { retrieveAnswer } = require('../utils/chatUtils');

const startChat = async (req, res) => {
  const { pdfId, userId, userRole } = req.body;

  if (!pdfId || !userId || !userRole) {
    return res.status(400).send('Missing required fields.');
  }

  try {
    const newChat = new Chats({
      pdf_id: pdfId,
      user_id: userId,
      user_role: userRole,
      chat_history: []
    });

    await newChat.save();

    // res.redirect(`/chat/${newChat._id}`);
  } catch (err) {
    console.error('Error starting chat:', err);
    res.status(500).send('An error occurred while starting the chat.');
  }
};



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
    // let chatHistory = await Chats.findOne({ user_id: userId, pdf_id: pdfId });

    // if (!chatHistory) {
    //   chatHistory = new Chats({ user_id: userId, pdf_id: pdfId, user_role: userRole, chat_history: [] });
    // }

    // const historyContext = chatHistory.chat_history.map(entry => `Human: ${entry.human}\nAI: ${entry.ai}`);

    let historyContext = [];

    const answer = await retrieveAnswer(query, historyContext, pdfId);

    // chatHistory.chat_history.push({ human: query, ai: answer });

    // await chatHistory.save();

    res.json({ answer });
  } catch (error) {
    console.error(`Error during conversation: ${error.message}`);
    res.status(500).send('An error occurred during the conversation.');
  }
};

module.exports = { startChat, conversation };
