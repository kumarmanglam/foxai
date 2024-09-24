
const express = require('express');
const router = express.Router();
const { conversation, showChatHistory, deleteChatHistory } = require('../controller/conversationController');
const { requireSignIn } = require('../Middlewares/authMiddleware.js');

router.post('/conversation', requireSignIn, conversation);
router.post('/chatHistory', requireSignIn, showChatHistory);
router.delete('/chatHistory',requireSignIn, deleteChatHistory);

module.exports = router;
